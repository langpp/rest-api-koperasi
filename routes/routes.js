module.exports = (app) => {

  const users = require('../controllers/userController.js');
  const query = require('../controllers/queryController.js');

  //Users
  app.post('/api/users', users.create);

  app.post('/api/login', users.logincheck);

  app.get('/api/users', tokencheck, users.findAll);
  // app.get('/api/users', users.findAll);

  app.get('/api/users/:user_id', users.findOne);

  app.put('/api/users/:user_id', users.update);

  app.delete('/api/users/:user_id', users.delete);

  //query
  app.get('/api/details', query.getborrow);

  app.get('/api/bookdetail', query.getbook);

}

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express = require('express');
var app = express();
var config = require('../config/config.js'); // get our config file
app.set('superSecret', config.secret); // secret variable

const tokencheck = (req, res, next) => {

 var header = req.headers.authorization.split(' ');
  var token = header[1];
  // var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log(token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({
          res: 'failed',
          message: 'Failed to authenticate token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({
      res: 'failed',
      message: 'No token provided'
    });

  }
};