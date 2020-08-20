const db = require('../models/index.js');
const Users = db.users;
const Mutasiiuran = db.mutasi_iurans;
const MutasiKoperasi = db.mutasi_koperases;
const Koperasi = db.koperases;
const Anggota = db.anggota_koperases;
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

// ALL Mutasi Yang Belum Dibayar
exports.mutasiIuranWajib = (req, res) => {
	const id_user = req.body.id_user;
	dt1 = new Date();
	dt2 = new Date("January 01, 2020 00:00:00");
	var dif = diff_months(dt1, dt2);

	var list = listmonthyear(dif);
	var split = list.split(',');
	var quotedAndCommaSeparated = "'" + split.join("','") + "'";
	var quotedAndCommaSeparated2 = split.join(",'");

	sequelize.query('SELECT a.* FROM mutasi_iurans as a WHERE a.id_user="'+id_user+'" AND a.id_iuran="2" AND DATE_FORMAT(a.tanggal_pembayaran, "%Y-%m") IN('+quotedAndCommaSeparated+') AND a.status="Berhasil";', {
		type: sequelize.QueryTypes.SELECT
	})
	.then(query => {
		var tanggal = [];
		for (i = 0; i < query.length; i++) {
			tanggal +=  moment.tz(query[i].tanggal_pembayaran, "Asia/Jakarta").format("YYYY-MM") + ",";
		}
		var splittanggal = tanggal.split(',');
		const [, ...rest] = split.reverse();
		const lasttanggal = rest.reverse();

		const [, ...rest2] = splittanggal.reverse();
		const lastquery = rest2.reverse();
		var tanggalbayar = [];
		for (i = 0; i < split.length; i++) {
			if(splittanggal.indexOf(split[i]) == -1){
				tanggalbayar += moment.tz(split[i], "Asia/Jakarta").format("MMMM YYYY") + ",";
			}
		}
		var splittanggalbayar = tanggalbayar.split(',');
		const [, ...rest3] = splittanggalbayar.reverse();
		const lasttanggalbayar = rest3.reverse();
		
		res.json({
			error: false,
			data: lasttanggalbayar,
			response: 'Iuran Yang Belum Dibayarkan'
		})
	})
};

// ALL Mutasi Yang Belum Dibayar
exports.mutasiIuranSukarela = (req, res) => {
	sequelize.query('SELECT a.* FROM mutasi_iurans as a WHERE a.id_user="'+req.params.id_user+'" AND a.id_iuran="1" AND a.status="Berhasil" ORDER BY a.tanggal_pembayaran DESC;', {
		type: sequelize.QueryTypes.SELECT
	})
	.then(query => {
		if (query == "" || query == null) {
			res.json({
				error: false,
				data: ["User Belum Membayar Iuran"],
				response: 'Iuran Sukarela'
			});
		}else{
			res.json({
				error: false,
				data: ["User Sudah Membayar Iuran"],
				response: 'Iuran Sukarela'
			});
		}
	})
};

// ALL Mutasi Yang Belum Dibayar
exports.riwayatIuran = (req, res) => {
	sequelize.query('SELECT a.* FROM mutasi_iurans as a WHERE a.id_user="'+req.params.id_user+'" AND a.status="Berhasil" ORDER BY a.tanggal_pembayaran DESC;', {
		type: sequelize.QueryTypes.SELECT
	})
	.then(query => {
		res.json({
			error: false,
			data: query,
			response: 'Riwayat Iuran'
		})
	})
};

// Total Iuran
exports.TotalIuran = (req, res) => {
	const id_user = req.body.id_user;
	dt1 = new Date();
	dt2 = new Date("January 01, 2020 00:00:00");
	var dif = diff_months(dt1, dt2);

	var list = listmonthyear(dif);
	var split = list.split(',');
	var quotedAndCommaSeparated = "'" + split.join("','") + "'";
	var quotedAndCommaSeparated2 = split.join(",'");

	sequelize.query('SELECT a.* FROM mutasi_iurans as a WHERE a.id_user="'+id_user+'" AND a.id_iuran="2" AND DATE_FORMAT(a.tanggal_pembayaran, "%Y-%m") IN('+quotedAndCommaSeparated+') AND a.status="Berhasil";', {
		type: sequelize.QueryTypes.SELECT
	})
	.then(query => {
		var tanggal = [];
		for (i = 0; i < query.length; i++) {
			tanggal +=  moment.tz(query[i].tanggal_pembayaran, "Asia/Jakarta").format("YYYY-MM") + ",";
		}
		var splittanggal = tanggal.split(',');
		const [, ...rest] = split.reverse();
		const lasttanggal = rest.reverse();

		const [, ...rest2] = splittanggal.reverse();
		const lastquery = rest2.reverse();
		var tanggalbayar = [];
		for (i = 0; i < split.length; i++) {
			if(splittanggal.indexOf(split[i]) == -1){
				tanggalbayar += moment.tz(split[i], "Asia/Jakarta").format("MMMM YYYY") + ",";
			}
		}
		var splittanggalbayar = tanggalbayar.split(',');
		const [, ...rest3] = splittanggalbayar.reverse();
		const lasttanggalbayar = rest3.reverse();
		var totaliuranwajib = lasttanggalbayar.length*10000;

		sequelize.query('SELECT a.* FROM mutasi_iurans as a WHERE a.id_user="'+req.params.id_user+'" AND a.id_iuran="1" AND a.status="Berhasil" ORDER BY a.tanggal_pembayaran DESC;', {
			type: sequelize.QueryTypes.SELECT
		})
		.then(query2 => {
			if (query2 == "" || query2 == null) {
				res.json({
					error: false,
					data: [50000+totaliuranwajib],
					response: 'Total Iuran'
				});
			}else{
				res.json({
					error: false,
					data: [totaliuranwajib],
					response: 'Total Iuran'
				});
			}
		})
	})
};

// ALL Mutasi Yang Belum Dibayar
exports.bayariuran = (req, res) => {
	const id_user = req.body.id_user;
	const id_iuran = req.body.id_iuran;
	const keterangan = req.body.keterangan;
	const total = req.body.total;
	const tanggal = req.body.tanggal;

	var kopkec = (total * 50) / 100;
	var kopkab = (total * 30) / 100;
	var kopprov = (total * 15) / 100;
	var kopnas = (total * 5) / 100;

	const tingkat = req.params.tingkat;
	Anggota.findOne({
		where: {
			id_user: id_user
		}
	})
	.then(anggota => { 
		var id_koperasi_user = anggota.id_koperasi;
		Koperasi.findOne({
			where: {
				id_koperasi: id_koperasi_user
			}
		})
		.then(datakoperases => { 
			var datkopkec = id_koperasi_user;
			var datkopkab = datakoperases.koperasi_kabkot;
			var datkopprov = datakoperases.koperasi_provinsi;
			var datkopnas = datakoperases.koperasi_nasional;

		    	addmutasi(datkopkec, "Bagi Hasil Koperasi Kecamatan", kopkec, tanggal, "Debit");
		    	addmutasi(datkopkab, "Bagi Hasil Koperasi Kabupaten", kopkab, tanggal, "Debit");
		    	addmutasi(datkopprov, "Bagi Hasil Koperasi Provinsi", kopprov, tanggal, "Debit");
		    	addmutasi(datkopnas, "Bagi Hasil Koperasi Nasional", kopnas, tanggal, "Debit");
		    	addwallet(datkopkec, kopkec);
		    	addwallet(datkopkab, kopkab);
		    	addwallet(datkopprov, kopprov);
		    	addwallet(datkopnas, kopnas);

		    	 Mutasiiuran.create({
			        id_user: id_user,
			        id_iuran: id_iuran,
			        keterangan: keterangan,
			        status: 'Proses',
			        total: total,
			        tanggal_pembayaran: tanggal,
			    })
			    .then(query => { 
			        res.status(201).json({
			            error: false,
			            data: [{
			                status: 'Proses',
			            }],
			            response: "Berhasil Membayar Iuran"
			        });
			    })
			    .catch(error => res.status(201).json({
			        error: true,
			        data: [],
			        response: error
			    }));
			})
		.catch(error => res.json({
			error: true,
			data: [],
			response: error
		}));
	})
	.catch(error => res.json({
		error: true,
		data: [],
		response: error
	}));
};

function listmonthyear(total){
	var array = [];
	var monthName = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
	var d = new Date();
	d.setDate(1);
	for (i=0; i<=total; i++) {
		array += d.getFullYear() + '-' + monthName[d.getMonth()] + ',';
		d.setMonth(d.getMonth() - 1);
	}
	return array;
}

function dateRange(startDate, endDate) {
	var start      = startDate.split('-');
	var end        = endDate.split('-');
	var startYear  = parseInt(start[0]);
	var endYear    = parseInt(end[0]);
	var dates      = [];

	for(var i = startYear; i <= endYear; i++) {
		var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
		var startMon = i === startYear ? parseInt(start[1])-1 : 0;
		for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
			var month = j+1;
			var displayMonth = month < 10 ? '0'+month : month;
			dates.push([i, displayMonth, '01'].join('-'));
		}
	}
	return dates;
}

function diff_months(dt2, dt1) 
{

	var diff =(dt2.getTime() - dt1.getTime()) / 1000;
	diff /= (60 * 60 * 24 * 7 * 4);
	return Math.abs(Math.round(diff));

}

function addmutasi(id_koperasi, keterangan, total, tanggal, jenis){
	MutasiKoperasi.create({
		id_koperasi: id_koperasi,
		keterangan: keterangan,
		total: total,
		status: 'Proses',
		tanggal: tanggal,
		jenis: jenis,
	})
}

function addwallet(id_koperasi, total){
	Koperasi.findOne({
		where: {
			id_koperasi: id_koperasi
		}
	})
	.then(koperasibyid => {
		Koperasi.update({
			wallet: koperasibyid.wallet + total,
		}, {
			where: {
				id_koperasi: id_koperasi
			}
		})
	});
}