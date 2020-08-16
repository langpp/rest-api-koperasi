const db = require('../models/index.js');
const Users = db.users;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express = require('express');
var moment = require('moment');
var app = express();
var config = require('../config/config.js'); // get our config file
app.set('superSecret', config.secret); // secret variable
var Sequelize = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = new Sequelize('koperasi', 'root', null, {
    dialect: 'mysql'
});
var nodemailer = require('nodemailer');
var request = require('request');

// CHECK USER REGISTER & LOGIN SEND OTP
exports.checkuser = (req, res) => {
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
                res.json({
                    error: false,
                    data: [{
                        no_telp: no_telp,
                        token: token
                    }],
                    response: "Silahkan Masukan Password!"
                });
            } else {
                const {
                    no_telp,
                } = req.body;
                var date = new Date();
                var dateparse = Date.parse(date) / 1000;
                var id_user = "USR-" + no_telp.substr(no_telp.length - 6) + "" + makeid();
                var no_va = "USR" + no_telp;
                var salt = bcrypt.genSaltSync(10);
                const password = bcrypt.hashSync("Default", salt);
                // sendSMS(no_telp, otpNumber);
                Users.create({
                    id_user: id_user,
                    email: '',
                    no_telp: no_telp,
                    password: '',
                    foto: '',
                    role: '2',
                    status: 'Aktif',
                    wallet: '',
                    no_va: no_va,
                    otp: otpNumber,
                    otp_valid: validOTP
                })
                .then(data => res.status(201).json({
                    error: false,
                    data: [{
                        id_user: id_user,
                        no_telp: no_telp,
                        otp: otpNumber,
                        token: token,
                        otp_valid: validOTP,
                        no_va: no_va
                    }],
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

// RESEND OTP SMS
exports.resendsmsotp = (req, res) => {
    const otpNumber = Math.floor(1000 + Math.random() * 9000);
    const no_telp = req.body.no_telp;
    var valid = validOTP;
    Users.update({
            otp: otpNumber,
            otp_valid: valid
        }, {
            where: {
                no_telp: no_telp
            }
        })
        .then(users => {
            var message = "Your OTP Number " + otpNumber;
            // sendSMS(no_telp, message);
            res.status(201).json({
                error: false,
                data: [{
                    no_telp: no_telp,
                    otp: otpNumber,
                    otp_valid: valid
                }],
                response: "OTP Dikirim Ke Nomor Tersebut"
            });

            })
        .catch(error => res.json({
            error: true,
            data: [],
            response: error
        }));
};

// INSERT NEW PASSWORD AFTER REGISTER
exports.registerpassword = (req, res) => {
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
        data: [{
            password: password
        }],
        response: "Berhasil Mengubah Password"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: error
    }));
};

// LOGIN NO TELP DAN PASSWORD
exports.logincheck = (req, res) => {
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
                        data: [{
                            no_telp: no_telp,
                            token: token
                        }],
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

// SEND OTP TO EMAIL
exports.sendotpmail = (req, res) => {
    const otpNumber = Math.floor(1000 + Math.random() * 9000);
    const no_telp = req.body.no_telp;
    const payload = {
        no_telp: no_telp
    };
    var valid = validOTP;
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
                var mail = users.email;
                Users.update({
                        otp: otpNumber,
                        otp_valid: valid
                    }, {
                        where: {
                            no_telp: no_telp
                        }
                    })
                    .then((users) => {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'koperasidev123@gmail.com',
                                pass: 'koperasi123'
                            }
                        });

                        var mailOptions = {
                            from: 'koperasidev123@gmail.com',
                            to: mail,
                            subject: 'Verifikasi OTP',
                            text: 'Your OTP Number ' + otpNumber,
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                res.json({
                                    error: true,
                                    data: [],
                                    response: error
                                })
                            } else {
                                res.json({
                                    error: false,
                                    data: [{
                                        no_telp: no_telp,
                                        otp: otpNumber,
                                        otp_valid: valid,
                                        email: mail
                                    }],
                                    response: "OTP Dikirim Ke Email Tersebut"
                                });
                            }
                        });

                    })
                    .catch(error => res.json({
                        error: true,
                        data: [],
                        response: error
                    }));
            } else {
                res.json({
                    error: false,
                    data: [],
                    response: "User Belum Memasukan Email"
                });
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

// VALIDATE OTP SMS
exports.validatesmsotp = (req, res) => {
    const no_telp = req.body.no_telp;
    const otp = req.body.otp;

    Users.findOne({
            where: {
                no_telp: no_telp,
                otp: otp
            }
        })
        .then(users => {
            if (users) {
                const t1 = new Date(dateNow);
                const t2 = new Date(users.otp_valid);
                var delta = Math.abs(t2 - t1) / 1000;
                var days = Math.floor(delta / 86400);
                delta -= days * 86400;
                var hours = Math.floor(delta / 3600) % 24;
                delta -= hours * 3600;
                var minutes = Math.floor(delta / 60) % 60;

                if (minutes >= 0) {
                    res.status(201).json({
                        error: false,
                        data: [{
                            otp: users.otp_valid,
                            no_telp: no_telp
                        }],
                        response: "Validasi OTP Berhasil"
                    });
                } else {
                    res.status(201).json({
                        error: true,
                        data: [],
                        response: "Validasi Gagal"
                    });
                }

            } else {
                res.status(201).json({
                    error: true,
                    data: [],
                    response: "Validasi Gagal"
                });
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

// VALIDATE OTP EMAIL
exports.validateemailotp = (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    Users.findOne({
            where: {
                email: email,
                otp: otp
            }
        })
        .then(users => {
            if (users) {
                const t1 = new Date(dateNow);
                const t2 = new Date(users.otp_valid);
                var delta = Math.abs(t2 - t1) / 1000;
                var days = Math.floor(delta / 86400);
                delta -= days * 86400;
                var hours = Math.floor(delta / 3600) % 24;
                delta -= hours * 3600;
                var minutes = Math.floor(delta / 60) % 60;

                if (minutes >= 0) {
                    res.status(201).json({
                        error: false,
                        data: [{
                            otp: users.otp_valid,
                            email: email
                        }],
                        response: "Validasi OTP Berhasil"
                    });
                } else {
                    res.status(201).json({
                        error: true,
                        data: [],
                        response: "Validasi Gagal"
                    });
                }

            } else {
                res.status(201).json({
                    error: true,
                    data: [],
                    response: "Validasi Gagal"
                });
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

let handleUnAuthorizedError = {
    error: true,
    data: [],
    response: "Token NULL"
}

var date = new Date();
var dateNow = moment.tz(date, "Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
var validOTP = moment.tz(date, "Asia/Jakarta").add(1, 'Hours').format("YYYY-MM-DD HH:mm:ss");

function makeid(){
    var d = new Date();
    var twoDigitMonth = (d.getMonth()+1)+"";if(twoDigitMonth.length==1) twoDigitMonth="0" +twoDigitMonth;
    var twoDigitDate = d.getDate()+"";if(twoDigitDate.length==1)    twoDigitDate="0" +twoDigitDate;
    var twoDigitHours = d.getHours()+"";if(twoDigitHours.length==1) twoDigitHours="0" +twoDigitHours;
    var twoDigitMinutes = d.getMinutes()+"";if(twoDigitMinutes.length==1)   twoDigitMinutes="0" +twoDigitMinutes;
    var twoDigitSeconds = d.getSeconds()+"";if(twoDigitSeconds.length==1)   twoDigitSeconds="0" +twoDigitSeconds;
    randomID= d.getFullYear()+""+twoDigitMonth+""+twoDigitDate+""+twoDigitHours+""+twoDigitMinutes+""+twoDigitSeconds;
    
    return randomID;
}

function sendSMS(to, message){
    var sahridayaUsername = "sahridaya";
    var sahridayaPassword = "nc8sFPSN";
    var sender = "IDSM";
    var chanel = '1';
    var url = "https://sms.sahridaya.id/api/apisms";

    var send = {
        "username":sahridayaUsername,
        "password":sahridayaPassword,
        "msisdn":to,
        "message":message,
        "sender":sender,
        "channel":chanel
    }

    var options = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        json: send
    };
    function callback(error, response, body) {
        if (!error) {
            var info = JSON.parse(JSON.stringify(body));
            console.log(info);
        }
        else {
            console.log('Error happened: '+ error);
        }
    }

    //send request
    var result = request(options, callback);
    return result;
}