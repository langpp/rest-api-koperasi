const db = require('../models/index.js');
const Users = db.users;
const MutasiWallet = db.mutasi_wallets;
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


exports.walletbyuserid = (req, res) => {
	const no_telp = req.params.no_telp;
	Users.findOne({
		where: {
			no_telp: no_telp,
		}
	})
	.then(users => {
		if (users) {
			res.status(201).json({
				error: false,
				data: [{
					no_telp: no_telp,
					wallet: users.wallet
				}],
				response: "Wallet User"
			});

		} else {
			res.status(201).json({
				error: true,
				data: [],
				response: "Gagal"
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

exports.mutasiwallet = (req, res) => {
	const id_user = req.params.id_user;
	MutasiWallet.findAll({
		where: {
			id_user: id_user,
		}
	})
	.then(wallet => {
		if (wallet) {
			res.status(201).json({
				error: false,
				data: [wallet],
				response: "Mutasi Wallet User"
			});

		} else {
			res.status(201).json({
				error: true,
				data: [],
				response: "Gagal"
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

exports.addmutasiwallet = (req, res) => {
	const id_user = req.body.id_user;
	const keterangan = req.body.keterangan;
	const total = req.body.total;
	const tanggal = req.body.tanggal;
	const jenis = req.body.jenis;
	MutasiWallet.create({
		id_user: id_user,
		keterangan: keterangan,
		total: total,
		status: 'Proses',
		tanggal: tanggal,
		jenis: jenis,
	})
	.then(query => { 
		res.status(201).json({
			error: false,
			data: [{
				status: 'Proses',
			}],
			response: "Berhasil Mengajukan Dana"
		});
	})
	.catch(error => res.status(201).json({
		error: true,
		data: [],
		response: "Gagal"
	}));
};

let handleUnAuthorizedError = {
	error: true,
	data: [],
	response: "Token NULL"
}
