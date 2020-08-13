module.exports = (app) => {

  const users = require('../controllers/userController.js');
  const query = require('../controllers/queryController.js');

  //Users
  app.post('/api/checkUser', users.checkUser);
  app.post('/api/loginCheck', users.loginCheck);
  app.post('/api/resendOTP', tokencheck, users.resendOTP);
  app.post('/api/registerPassword', tokencheck, users.registerPassword);

  // app.get('/api/users', tokencheck, users.findAll);
  // // app.get('/api/users', users.findAll);

  // app.get('/api/users/:user_id', users.findOne);

  // app.put('/api/users/:user_id', users.update);

  // app.delete('/api/users/:user_id', users.delete);

  //query
  app.get('/api/details', query.getborrow);

  app.get('/api/bookdetail', query.getbook);

}

var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var config = require('../config/config.js');
app.set('superSecret', config.secret);

const tokencheck = (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    var header = req.headers.authorization.split(' ');
    var token = header[1];
  if (token) {
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({
          error: true,
          data: [],
          response: 'Failed to authenticate token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      error: true,
      data: [],
      response: 'No token provided'
    });
  }
  }else{
    return res.status(403).send({
      error: true,
      data: [],
      response: 'No token provided'
    });
  }
};