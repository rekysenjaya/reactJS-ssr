import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import escape from 'jsesc';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const app = express();
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))
app.use('/public', express.static(path.join(__dirname, '../public')))

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

const renderFullPage = html => {
	return `
	<!doctype html>
	<html lang="utf-8">
		<head>
		</head>
		<body>
			<section id="appBody" class="appBody">${html}</section>
			<script src="/static/bundle.js"></script>
		</body>
	</html>
	`
};



// mongoose
mongoose.connect('mongodb://localhost:27017/traveldb');

var key = 'ReactJS developer [reky senjaya]';

// Create an encryptor: 
var encryptor = require('simple-encryptor')(key);

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
	req.encryptor = encryptor;
	next();
});

let pageArr = ['/', 'register', 'forgot_password', 'airplanes', 'profiles']

let page = renderFullPage('');


var airplane = require('./routeServer/airplane');
var user = require('./routeServer/users');


pageArr.forEach(function (element) {
	app.get(`/${element}`, function (req, res) {
		res.status(200).send(page);
	});
}, this);

app.use('/airplane', airplane);
app.use('/user', user);


app.get('*', function (req, res) {
	res.status(404).send('Server.js > 404 - Page Not Found');
});

app.use((err, req, res, next) => {
	console.error("Error on request %s %s", req.method, req.url);
	console.error(err.stack);
	res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
	console.log('uncaughtException: ', evt);
});

app.listen(3000, function () {
	console.log('Listening on port 3000');
});
