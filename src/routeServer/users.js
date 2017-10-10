var express = require('express');
var router = express.Router();
var Users = require('../models/user');


router.use(function (req, res, next) {

  if (!req.headers.token == false)
    if ('register' === req.headers.token) {
      if (true) {
        next();
      } else {
        res.json({ 'message': 'not access', 'session': 'destroy' });
      }
    } else {
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

/* GET users listing. */
router.get('/', function (req, res, next) {
  Users.find(function (err, user) {
    if (err) return next(err);
    res.json(user);
  }).sort('id');
});

/* GET Limit skip */
router.get('/:skip/:limit', function (req, res, next) {
  Users.find(function (err, user) {
    if (err) return next(err);
    res.json(user);
  }).sort('id').skip(parseInt(req.params.skip)).limit(parseInt(req.params.limit));
});

/* GET users BY ID */
router.get('/:id', function (req, res, next) {
  Users.findOne({ id: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.json({ ...post, status: true });
  });
});

/* Register users */
router.post('/', function (req, res, next) {
  Users.findOne({ email: req.body.email }, function (err, post) {
    if (err) return next(err);
    if (post.email != req.body.email) {
      let user = new Users(req.body)
      user.save(function (err, data) {
        if (err) return next(err);
        res.json({ ...data, status: true });
      });
    } else {
      res.json({ status: false })
    }
  });
});

/* Forgot Password users */
router.post('/login', function (req, res, next) {
  Users.count({ email: req.body.email, password: req.body.password }, function (err, post) {
    if (err) return next(err);

    if (post) {
      Users.findOne({ email: req.body.email }, function (err, doc) {
        if (err) return next(err);

        res.json({ 'token': req.encryptor.encrypt(doc), status: true });
      }).select('-password');
    } else {
      res.json({ status: false })
    }
  });
});

/* Forgot Password users */
router.put('/forgot_password', function (req, res, next) {
  Users.count({ email: req.body.email }, function (err, post) {
    if (err) return next(err);

    if (post) {
      Users.findOneAndUpdate({ email: req.body.email }, req.body, { upsert: true }, function (err, doc) {
        if (err) return next(err);
        res.json({ ...doc, status: true });
      });
    } else {
      res.json({ status: false })
    }
  });
});

/* UPDATE users */
router.put('/:id', function (req, res, next) {
  Users.findOneAndUpdate({ id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});

/* DELETE users */
router.delete('/:id', function (req, res, next) {
  Users.findOneAndRemove({ email: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
