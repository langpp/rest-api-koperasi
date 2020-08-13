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

// CHECK USER REGISTER & LOGIN SEND OTP
exports.checkUser = (req, res) => {
    const otpNumber = Math.floor(1000 + Math.random() * 9000);
    const no_telp = req.body.no_telp;
    const payload = {
        no_telp: no_telp
    };
    var token = jwt.sign(payload, app.get('superSecret'), {
        expiresIn: '720h'
    });
    Users.findOne({
        where: {
            no_telp: no_telp
        }
    })
    .then(users => {
        if (users) {
            Users.update({
                otp: otpNumber,
                otp_valid : validOTP
            }, {
                where: {
                    no_telp: no_telp
                }
            })
            .then(users => res.status(201).json({
                error: false,
                data: [{no_telp : no_telp, otp : otpNumber, token: token, otp_valid : validOTP}],
                response: "OTP Dikirim Ke Nomor Tersebut"
            }))
            .catch(error => res.json({
                error: true,
                data: [],
                response: error
            }));
        } else {
            const {
                no_telp,
            } = req.body;
            Users.create({
                email: '',
                no_telp: no_telp,
                password: '',
                foto: '',
                role: '',
                status: 'Tidak',
                jabatan: '',
                token: '',
                no_va: '0',
                otp: otpNumber,
                otp_valid : validOTP
            })
            .then(data => res.status(201).json({
                error: false,
                data: [{no_telp : no_telp, otp : otpNumber, token: token, otp_valid : validOTP}],
                response: "Registrasi Berhasil. OTP Dikirim Ke Nomor Tersebut"
            }))
            .catch(error => res.status(201).json({
                error: true,
                data: [],
                response: "Gagal Registrasi"
            }));
        }
    })
    .catch(error => {
        res.json({
            error: true,
            data: [],
            response: error
        })
    });
};

// RESEND OTP
exports.resendOTP = (req, res) => {
    const otpNumber = Math.floor(1000 + Math.random() * 9000);
    const no_telp = req.body.no_telp;

    Users.update({
        otp: otpNumber,
    }, {
        where: {
            no_telp: no_telp
        }
    })
    .then(users => res.status(201).json({
        error: false,
        data: [{no_telp : no_telp, otp : otpNumber}],
        response: "OTP Dikirim Ke Nomor Tersebut"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: error
    }));
};

// INSERT NEW PASSWORD AFTER REGISTER
exports.registerPassword = (req, res) => {
    const no_telp = req.body.no_telp;
    var salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    Users.update({
        password: password,
    }, {
        where: {
            no_telp: no_telp
        }
    })
    .then(users => res.status(201).json({
        error: false,
        data: [{password: password}],
        response: "Berhasil"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: error
    }));
};

// LOGIN
exports.loginCheck = (req, res) => {
    const no_telp = req.body.no_telp;
    const password = req.body.password;
    Users.findOne({
        where: {
            no_telp: no_telp
        }
    }).then((users) => {
        if (users) {
            users.comparePassword(password, (error, response) => {
                if (error) return res.status(401).json(handleUnAuthorizedError);
                if (response) {
                    const payload = {
                        no_telp: no_telp
                    };
                    var token = jwt.sign(payload, app.get('superSecret'), {
                        expiresIn: '720h'
                    });
                    res.json({
                        error: false,
                        data: [{no_telp: no_telp, token: token}],
                        response: "Berhasil Login"
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













// Retrieve and return all Users from the database.
// exports.findAll = (req, res) => {
//     Users.findAll({})
//     .then(user => res.json({
//         data: user,
//         message: 'You got the details of All Users'
//     }))
//     .catch(error => res.json({
//         error: true,
//         data: [],
//         error: error
//     }));
// };


// Find a single User with a userId
// exports.findOne = (req, res) => {
//     //Get One User using ID
//     const id_user = req.params.id_user;
//     Users.findOne({
//         where: {
//             id_user: id_user
//         }
//     }, )
//     .then(users => res.status(201).json({
//         data: users,
//         message: 'You Got the User detail with Id:' + id_user
//     }))
//     .catch(error => res.json({
//         error: true,
//         error: error
//     }));
// };

// Update a User identified by the userId in the request
// exports.update = (req, res) => {
//     const id_user = req.params.id_user;
//     const {
//         first_name,
//         last_name,
//         number,
//         email,
//         password
//     } = req.body;
//     Users.update({
//         first_name: first_name,
//         last_name: last_name,
//         email: email,
//         number: number,
//         password: password,
//     }, {
//         where: {
//             id_user: id_user
//         }
//     })
//     .then(users => res.status(201).json({
//         message: 'User has been updated.'
//     }))
//     .catch(error => res.json({
//         error: true,
//         error: error
//     }));
// };

// Delete a user with the specified userId in the request
// exports.delete = (req, res) => {
//     const id_user = req.params.id_user;

//     Users.destroy({
//         where: {
//             id_user: id_user
//         }
//     })
//     .then(status => res.status(201).json({
//         message: 'User has been delete.'
//     }))
//     .catch(error => res.json({
//         error: true,
//         error: error
//     }));
// };

// Retrieve and return all Users above User input Params
// exports.getage = (req, res) => {
//     sequelize.query('SELECT * FROM users WHERE age>' + req.params.age, {
//         type: sequelize.QueryTypes.SELECT
//     })
//     .then(users => {
//         res.json({
//             data: users,
//             message: 'You got the details of All Users'
//         })
//     })
// };


let handleUnAuthorizedError = {
    error: true,
    data: [],
    response:"Token NULL"
}

var newDate = new Date ();
var validOTP = new Date ( newDate );
validOTP.setMinutes ( newDate.getMinutes() + 30 );