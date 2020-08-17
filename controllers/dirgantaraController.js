const db = require('../models/index.js');
const Users = db.users;
const Koperasi = db.koperases;
const MutasiKoperasi = db.mutasi_koperases;
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


exports.totalwalletkoperasi = (req, res) => {
	const id_koperasi = req.params.id_koperasi;
	Koperasi.findOne({
		where: {
			id_koperasi: id_koperasi,
		}
	})
	.then(koperasi => {
		if (koperasi) {
			res.status(201).json({
				error: false,
				data: [{
					id_koperasi: id_koperasi,
					wallet: koperasi.wallet
				}],
				response: "Wallet Koperasi"
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

exports.totalwalletkoperasitingkat = (req, res) => {
	const id_koperasi = req.body.id_koperasi;
	const tingkat = req.body.tingkat;

	if (tingkat == 1) {
		Koperasi.findAll({
			where: {
				tingkat: tingkat,
			}
		})
		.then(koperasi => {
			if (koperasi) {
				res.status(201).json({
					error: false,
					data: [koperasi],
					response: "Wallet Koperasi"
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
	}else if(tingkat == 2) {
		Koperasi.findAll({
			where: {
				tingkat: tingkat,
				koperasi_nasional: id_koperasi,
			}
		})
		.then(koperasi => {
			if (koperasi) {
				res.status(201).json({
					error: false,
					data: [koperasi],
					response: "Wallet Koperasi"
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
	}else if(tingkat == 3) {
		Koperasi.findAll({
			where: {
				tingkat: tingkat,
				koperasi_provinsi: id_koperasi,
			}
		})
		.then(koperasi => {
			if (koperasi) {
				res.status(201).json({
					error: false,
					data: [koperasi],
					response: "Wallet Koperasi"
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
	}else if(tingkat == 4) {
		Koperasi.findAll({
			where: {
				id_koperasi: id_koperasi,
				koperasi_kabkot: id_koperasi,
			}
		})
		.then(koperasi => {
			if (koperasi) {
				res.status(201).json({
					error: false,
					data: [koperasi],
					response: "Wallet Koperasi"
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
	}
};

exports.mutasikoperasi = (req, res) => {
	const id_koperasi = req.params.id_koperasi;
	MutasiKoperasi.findAll({
		where: {
			id_koperasi: id_koperasi,
		}
	})
	.then(koperasi => {
		if (koperasi) {
			res.status(201).json({
				error: false,
				data: [koperasi],
				response: "Mutasi Koperasi"
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

exports.addmutasikoperasi = (req, res) => {
	const id_koperasi = req.body.id_koperasi;
	const keterangan = req.body.keterangan;
	const total = req.body.total;
	const tanggal = req.body.tanggal;
	const jenis = req.body.jenis;
	MutasiKoperasi.create({
		id_koperasi: id_koperasi,
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

exports.acctolakwallet = (req, res) => {
	const id_mutasi = req.body.id_mutasi;
	const status = req.body.status;
	MutasiWallet.update({
		status: status,
	}, {
        where: {
            id_mutasi: id_mutasi
        }
    })
	.then(query => { 
		res.status(201).json({
			error: false,
			data: [{
				status: 'Ok',
			}],
			response: "Berhasil"
		});
	})
	.catch(error => res.status(201).json({
		error: true,
		data: [],
		response: error
	}));
};

exports.acctolakwalletkoperasi = (req, res) => {
	const id_mutasi = req.body.id_mutasi;
	const status = req.body.status;
	MutasiKoperasi.update({
		status: status,
	}, {
        where: {
            id_mutasi: id_mutasi
        }
    })
	.then(query => { 
		res.status(201).json({
			error: false,
			data: [{
				status: 'Ok',
			}],
			response: "Berhasil"
		});
	})
	.catch(error => res.status(201).json({
		error: true,
		data: [],
		response: error
	}));
};