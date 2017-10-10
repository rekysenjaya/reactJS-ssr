var express = require('express');
var router = express.Router();
var Airplane = require('../models/airplane');
var Users = require('../models/user');


router.use(function (req, res, next) {
  var db = req.con;

  if (!req.headers.token == false) {
    // check token
    const token = req.headers.token;
    var decrypted = req.encryptor.decrypt(token);

    Users.count({ email: decrypted.email }, function (err, post) {
      if (err) return next(err);

      if (post) {
        next();
      } else {
        res.json({ message: 'not access', status: false });
      }
    });
  }
  else
    res.json({ message: 'not access token', status: false });
});

/* GET airplane listing. */
router.get('/', function (req, res, next) {
  Airplane.find(function (err, user) {
    if (err) return next(err);
    res.json(user);
  }).sort('id');
});

/* GET Limit skip */
router.get('/:skip/:limit', function (req, res, next) {
  Airplane.find(function (err, user) {
    if (err) return next(err);
    res.json(user);
  }).sort('id').skip(parseInt(req.params.skip)).limit(parseInt(req.params.limit));
});

/* GET airplane BY ID */
router.get('/:id', function (req, res, next) {
  Airplane.findOne({ id: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE airplane */
router.post('/', function (req, res, next) {
  let user = new Airplane(req.body)
  user.save(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* UPDATE airplane */
router.put('/:id', function (req, res, next) {
  Airplane.findOneAndUpdate({ id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});

/* DELETE airplane */
router.delete('/:id', function (req, res, next) {
  Airplane.findOneAndRemove({ id: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
