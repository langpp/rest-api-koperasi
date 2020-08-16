const db = require('../models/index.js');
const Provinsi = db.provinses;
const Kabkot = db.kabkots;
const Kecamatan = db.kecamatans;
const Desa = db.desas;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express = require('express');
var app = express();
var config = require('../config/config.js'); // get our config file
app.set('superSecret', config.secret); // secret variable
var Sequelize = require('sequelize');
const sequelize = new Sequelize('koperasi', 'root', null, {
    dialect: 'mysql'
});


// DISPLAY ALL PROVINSI
exports.allprovinsi = (req, res) => {
    Provinsi.findAll({})
    .then(provinses => res.json({
        error: false,
        data: [provinses],
        response: "All Provinsi"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: "Error"
    }));
};

// DISPLAY PROVINSI BY ID
exports.provinsibyid = (req, res) => {
	const id = req.params.id;
    Provinsi.findOne({
    	where: {
	        id: id
	    }
    })
    .then(provinses => res.json({
        error: false,
        data: [provinses],
        response: "Provinsi By ID"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: "Error"
    }));
};

// DISPLAY ALL KABUPATEN KOTA
exports.allkabkot = (req, res) => {
	console.log(db.kabkots);
    Kabkot.findAll({})
    .then(kabkot => res.json({
        error: false,
        data: [kabkot],
        response: "All Kabupaten Kota"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: "Error"
    }));
};

// DISPLAY KABKOT BY ID
exports.kabkotbyid = (req, res) => {
	const id = req.params.id;
    Kabkot.findOne({
    	where: {
	        id: id
	    }
    })
    .then(kabkots => res.json({
        error: false,
        data: [kabkots],
        response: "KABKOT By ID"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: "Error"
    }));
};

// DISPLAY ALL KABUPATEN KOTA BY ID PROVINSI
exports.kabkotbyidprovinsi = (req, res) => {
	const id = req.params.id;
    Kabkot.findAll({
    	where: {
	        id_provinsi: id
	    }
    })
    .then(kabkots => res.json({
        error: false,
        data: [kabkots],
        response: "KABKOT By ID Provinsi"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: "Error"
    }));
};

// DISPLAY ALL KECAMATAN
exports.allkecamatan = (req, res) => {
	console.log(db.kecamatans);
    Kecamatan.findAll({})
    .then(kecamatan => res.json({
        error: false,
        data: [kecamatan],
        response: "All Kecamatan"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: "Error"
    }));
};

// DISPLAY KABKOT BY ID
exports.kecamatanbyid = (req, res) => {
	const id = req.params.id;
    Kecamatan.findOne({
    	where: {
	        id: id
	    }
    })
    .then(kecamatans => res.json({
        error: false,
        data: [kecamatans],
        response: "kecamatan By ID"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: "Error"
    }));
};

// DISPLAY ALL KECAMATAN BY ID KABUPATEN
exports.kecamatanbyidkabkot = (req, res) => {
	const id = req.params.id;
    Kecamatan.findAll({
    	where: {
	        id_kabkot: id
	    }
    })
    .then(kecamatans => res.json({
        error: false,
        data: [kecamatans],
        response: "Kecamatan By ID Provinsi"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: "Error"
    }));
};

// DISPLAY ALL DESA
exports.alldesa = (req, res) => {
	console.log(db.desas);
    Desa.findAll({})
    .then(desa => res.json({
        error: false,
        data: [desa],
        response: "All Desa"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: "Error"
    }));
};

// DISPLAY KABKOT BY ID
exports.desabyid = (req, res) => {
	const id = req.params.id;
    Desa.findOne({
    	where: {
	        id: id
	    }
    })
    .then(desas => res.json({
        error: false,
        data: [desas],
        response: "Desa By ID"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: "Error"
    }));
};

// DISPLAY ALL DESA BY ID KECAMATAN
exports.desabyidkecamatan = (req, res) => {
	const id = req.params.id;
    Desa.findAll({
    	where: {
	        id_kecamatan: id
	    }
    })
    .then(desas => res.json({
        error: false,
        data: [desas],
        response: "Desa By ID Provinsi"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: "Error"
    }));
};