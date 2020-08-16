const db = require('../models/index.js');
const Users = db.users;
const Bank = db.banks;
const Userrekening = db.users_rekenings;
const Useridentitas = db.users_identitas;
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


// Semua Bank
exports.allbank = (req, res) => {
	Bank.findAll({})
	.then(bank => res.json({
		error: false,
		data: [bank],
		response: "Semua bank"
	}))
	.catch(error => res.json({
		error: true,
		data: [],
		response: error
	}));
};

// Semua Rekening User
exports.allrekening = (req, res) => {
	sequelize.query('SELECT a.id_rekening, b.kode_bank, a.no_rekening, b.nama_bank FROM users_rekenings AS a JOIN banks AS b ON a.id_bank = b.kode_bank WHERE a.id_user = "'+req.params.id_user+'" ORDER BY b.nama_bank ASC', {
		type: sequelize.QueryTypes.SELECT
	})
	.then(query => {
		res.json({
			error: false,
			data: query,
			response: 'All User Rekening'
		})
	})
};

// Tambah Rekening
exports.tambahrekening = (req, res) => {
	const id_user = req.body.id_user;
	const id_bank = req.body.id_bank;
	const no_rekening = req.body.no_rekening;
	Userrekening.create({
		id_user: id_user,
		id_bank: id_bank,
		no_rekening: no_rekening,
	})
	.then(query => { 
		res.status(201).json({
			error: false,
			data: [{
				status: 'Proses',
			}],
			response: "Berhasil Menambah Rekening"
		});
	})
	.catch(error => res.status(201).json({
		error: true,
		data: [],
		response: "Gagal"
	}));
};

// EDIT Rekening
exports.editrekening = (req, res) => {
	const id_user = req.body.id_user;
	const id_bank = req.body.id_bank;
	const no_rekening = req.body.no_rekening;
	const id_rekening = req.body.id_rekening;
	Userrekening.update({
		id_user: id_user,
		id_bank: id_bank,
		no_rekening: no_rekening,
	}, {
		where: {
			id_rekening: id_rekening
		}
	})
	.then(query => { 
		res.status(201).json({
			error: false,
			data: [{
				status: 'Success',
			}],
			response: "Berhasil Mengedit Rekening"
		});
	})
	.catch(error => res.status(201).json({
		error: true,
		data: [],
		response: "Gagal"
	}));
};

// HAPUS Rekening
exports.deleterekening = (req, res) => {
	const id_rekening = req.params.id_rekening;

	Userrekening.destroy({
		where: {
			id_rekening: id_rekening
		}
	})
	.then(status =>  res.status(201).json({
		error: false,
		data: [{
			status: 'Success',
		}],
		response: "Berhasil Menghapus Rekening"
	}))
	.catch(error => res.status(201).json({
		error: true,
		data: [],
		response: "Gagal"
	}));
};

// Lengkapi Identitas
exports.complateidentity = (req, res) => {
	const id_user = req.body.id_user;
	const nama_lengkap = req.body.nama_lengkap;
	const no_ktp = req.body.no_ktp;
	const provinsi = req.body.provinsi;
	const kabkot = req.body.kabkot;
	const kecamatan = req.body.kecamatan;
	const desa = req.body.desa;
	const alamat = req.body.alamat;
	const no_telp = req.body.no_telp;
	const email = req.body.email;
	var salt = bcrypt.genSaltSync(10);
	const password = bcrypt.hashSync(req.body.password, salt);
	Useridentitas.create({
		id_user: id_user,
		nama_lengkap: nama_lengkap,
		no_ktp: no_ktp,
		provinsi: provinsi,
		kabkot: kabkot,
		kecamatan: kecamatan,
		desa: desa,
		alamat: alamat,
	})
	.then(query => { 
		Users.update({
			password: password,
			no_telp: no_telp,
			email: email,
		}, {
			where: {
				id_user: id_user
			}
		})
		.then(users => res.status(201).json({
			error: false,
			data: [],
			response: "Berhasil Melengkapi Identitas"
		}))
		.catch(error => res.json({
			error: true,
			data: [],
			response: error
		}));
	})
	.catch(error => res.status(201).json({
		error: true,
		data: [],
		response: "Gagal"
	}));
};

// Lengkapi Identitas
exports.editidentity = (req, res) => {
	const id_user = req.body.id_user;
	const nama_lengkap = req.body.nama_lengkap;
	const no_ktp = req.body.no_ktp;
	const provinsi = req.body.provinsi;
	const kabkot = req.body.kabkot;
	const kecamatan = req.body.kecamatan;
	const desa = req.body.desa;
	const alamat = req.body.alamat;
	const no_telp = req.body.no_telp;
	const email = req.body.email;
	var salt = bcrypt.genSaltSync(10);
	const password = bcrypt.hashSync(req.body.password, salt);
	Useridentitas.update({
		id_user: id_user,
		nama_lengkap: nama_lengkap,
		no_ktp: no_ktp,
		provinsi: provinsi,
		kabkot: kabkot,
		kecamatan: kecamatan,
		desa: desa,
		alamat: alamat,
	}, {
		where: {
			id_user: id_user
		}
	})
	.then(query => { 
		Users.update({
			password: password,
			no_telp: no_telp,
			email: email,
		}, {
			where: {
				id_user: id_user
			}
		})
		.then(users => res.status(201).json({
			error: false,
			data: [],
			response: "Berhasil Mengubah Identitas"
		}))
		.catch(error => res.json({
			error: true,
			data: [],
			response: error
		}));
	})
	.catch(error => res.status(201).json({
		error: true,
		data: [],
		response: "Gagal"
	}));
};

// User BY ID 
exports.userbyid = (req, res) => {
	sequelize.query('SELECT a.id_user, a.email, a.no_telp, a.foto, a.status, a.no_va, b.nama_lengkap, b.no_ktp, b.alamat, c.provinsi, d.kabkot, e.kecamatan, f.desa FROM users AS a JOIN users_identitas AS b ON a.id_user = b.id_user JOIN provinses AS c ON b.provinsi = c.id JOIN kabkots AS d ON b.kabkot = d.id JOIN kecamatans AS e ON b.kecamatan = e.id JOIN desas AS f ON b.desa = f.id WHERE a.id_user = "'+req.params.id_user+'" ORDER BY a.id_user ASC LIMIT 1', {
		type: sequelize.QueryTypes.SELECT
	})
	.then(query => {
		res.json({
			error: false,
			data: query,
			response: 'All User Information'
		})
	})
};

// Change Image Profile
exports.changeimageprofile = (req, res) => {
	const id_user = req.body.id_user;	
	try {
        if(!req.files.avatar) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let avatar = req.files.avatar;
            avatar.mv('./www/user_profile/' + avatar.name);
            Users.update({
				foto: avatar.name,
			}, {
				where: {
					id_user: id_user
				}
			})
			.then(query => res.status(201).json({
				error: false,
				data: [{name: avatar.name, mimetype: avatar.mimetype, size: avatar.size}],
				response: "Berhasil Mengupload Foto"
			}))
			.catch(error => res.status(201).json({
				error: true,
				data: [],
				response: error
			}));
        }
    } catch (err) {
        res.json({
			error: true,
			data: [],
			response: err
		})
    }
};