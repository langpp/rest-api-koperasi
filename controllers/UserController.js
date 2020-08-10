const db = require('../models/index.js');
const Users = db.users;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express = require('express');
var app = express();
var config = require('../config/config.js'); // get our config file
app.set('superSecret', config.secret); // secret variable
var Sequelize = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = new Sequelize('koperasi', 'root', null, {
    dialect: 'mysql'
});
//const Book = db.book;

exports.create = (req, res) => {
    const {
        email,
        no_telp,
        password: password,
    } = req.body;
    Users.create({
            email: email,
            no_telp: no_telp,
            password: password,
            foto: '',
            role: '',
            status: '',
            jabatan: '',
            token: '',
            no_va: '',
            otp: '',
        })
        .then(data => res.status(201).json({
            success: true
        }))
        .catch(error => res.json({
            success: false,
        }));
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    Users.findAll({})
        .then(user => res.json({
            data: user,
            message: 'You got the details of All Users'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};


// Find a single User with a userId
exports.findOne = (req, res) => {
    //Get One User using ID
    const id_user = req.params.id_user;
    Users.findOne({
            where: {
                id_user: id_user
            }
        }, )
        .then(users => res.status(201).json({
            data: users,
            message: 'You Got the User detail with Id:' + id_user
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
    const id_user = req.params.id_user;
    const {
        first_name,
        last_name,
        number,
        email,
        password
    } = req.body;
    Users.update({
            first_name: first_name,
            last_name: last_name,
            email: email,
            number: number,
            password: password,
        }, {
            where: {
                id_user: id_user
            }
        })
        .then(users => res.status(201).json({
            message: 'User has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    const id_user = req.params.id_user;

    Users.destroy({
            where: {
                id_user: id_user
            }
        })
        .then(status => res.status(201).json({
            message: 'User has been delete.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};

// Retrieve and return all Users above User input Params
exports.getage = (req, res) => {
    sequelize.query('SELECT * FROM users WHERE age>' + req.params.age, {
            type: sequelize.QueryTypes.SELECT
        })
        .then(users => {
            res.json({
                data: users,
                message: 'You got the details of All Users'
            })
        })
};

// Find a single User with a userId
exports.logincheck = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        where: {
            email: email
        }
    }).then((users) => {

        if (users) {

            users.comparePassword(password, (error, response) => {
                if (error) return res.status(401).json(handleUnAuthorizedError);

                if (response) {
                    const payload = {
                        email: email
                    };
                    var token = jwt.sign(payload, app.get('superSecret'), {
                        expiresIn: '48h'
                    });

                    res.json({
                        success: true,
                        token: token
                    });
                } else {
                    return res.status(401).json(handleUnAuthorizedError);
                }

            });
        } else {
            res.status(401).json(handleUnAuthorizedError);
        };
    }).catch((error) => res.status(401).json(handleUnAuthorizedError));
};

let handleUnAuthorizedError = {
    success: false,
    token: null
}