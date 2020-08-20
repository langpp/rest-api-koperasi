const db = require('../models/index.js');
const NotifikasiKoperasi = db.notifikasi_koperases;
const NotifikasiUser = db.notifikasi_users;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express = require('express');
var moment = require('moment');
var app = express();
var config = require('../config/config.js'); // get our config file
app.set('superSecret', config.secret); // secret variable
var Sequelize = require('sequelize');
const bcrypt = require("bcrypt");
var moment = require('moment');
const sequelize = new Sequelize('koperasi', 'root', null, {
	dialect: 'mysql'
});

// CREATE NOTIFIKASI KOPERASI
exports.createnotifikasikoperasi = (req, res) => {
    const notifikasi = req.body.notifikasi;
    const deskripsi = req.body.deskripsi;
    const id_koperasi = req.body.id_koperasi;
	var date = new Date();
	var dateNow = moment.tz(date, "Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
    NotifikasiKoperasi.create({
        notifikasi: notifikasi,
        deskripsi: deskripsi,
        tanggal: dateNow,
        status: 'unread',
        id_koperasi: id_koperasi,
    })
    .then(query => { 
        res.status(201).json({
            error: false,
            data: [{
                status: 'Berhasil',
            }],
            response: "Berhasil Menambah Notifikasi"
        });
    })
    .catch(error => res.status(201).json({
        error: true,
        data: [],
        response: error
    }));
};

// CREATE NOTIFIKASI USER
exports.createnotifikasiuser = (req, res) => {
    const notifikasi = req.body.notifikasi;
    const deskripsi = req.body.deskripsi;
    const id_user = req.body.id_user;
	var date = new Date();
	var dateNow = moment.tz(date, "Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
    NotifikasiUser.create({
        notifikasi: notifikasi,
        deskripsi: deskripsi,
        tanggal: dateNow,
        status: 'unread',
        id_user: id_user,
    })
    .then(query => { 
        res.status(201).json({
            error: false,
            data: [{
                status: 'Berhasil',
            }],
            response: "Berhasil Menambah Notifikasi"
        });
    })
    .catch(error => res.status(201).json({
        error: true,
        data: [],
        response: error
    }));
};

// Read notifikasi koperasi
exports.readnotifikasikoperasi = (req, res) => {
    NotifikasiKoperasi.update({
            status: "read",
        }, {
            where: {
                id_notifikasi: req.params.id_notifikasi
            }
        })
        .then(notif => {
            res.status(201).json({
                error: false,
                data: ["Success"],
                response: "Read Berhasil"
            });

            })
        .catch(error => res.json({
            error: true,
            data: [],
            response: error
        }));
};

// Read notifikasi user
exports.readnotifikasiuser = (req, res) => {
    NotifikasiUser.update({
            status: "read",
        }, {
            where: {
                id_notifikasi: req.params.id_notifikasi
            }
        })
        .then(notif => {
            res.status(201).json({
                error: false,
                data: ["Success"],
                response: "Read Berhasil"
            });

            })
        .catch(error => res.json({
            error: true,
            data: [],
            response: error
        }));
};

// ALL NOTIFIKASI KOPERASI
exports.allnotifkoperasi = (req, res) => {
    const id_koperasi = req.params.id_koperasi;
    NotifikasiKoperasi.findAll({
        where: {
            id_koperasi: id_koperasi
        }
    })
    .then(koperasi => res.json({
        error: false,
        data: [koperasi],
        response: "Notifikasi Koperasi"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: error
    }));
};

// ALL NOTIFIKASI USER
exports.allnotifuser = (req, res) => {
    const id_user = req.params.id_user;
    NotifikasiUser.findAll({
        where: {
            id_user: id_user
        }
    })
    .then(user => res.json({
        error: false,
        data: [user],
        response: "Notifikasi User"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: error
    }));
};