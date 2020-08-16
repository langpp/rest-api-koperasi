const db = require('../models/index.js');
const Users = db.users;
const Koperasi = db.koperases;
const Anggota = db.anggota_koperases;
const Kantor = db.kantors;
const Jabatan = db.jabatans;
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

// ALL Anggota Koperasi BY ID Koperasi
exports.allanggotakoperasibyid = (req, res) => {
    sequelize.query('SELECT a.id_user, b.nama_lengkap, c.nama_jabatan, d.nama_koperasi FROM anggota_koperases AS a JOIN users_identitas AS b ON a.id_user = b.id_user JOIN jabatans AS c ON c.id_jabatan = a.id_jabatan JOIN koperases AS d ON d.id_koperasi = a.id_koperasi WHERE a.id_koperasi = "'+req.params.id_koperasi+'" AND a.status="Diterima" ORDER BY b.nama_lengkap ASC', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(query => {
        res.json({
            error: false,
            data: query,
            response: 'All User Koperasi By ID Koperasi'
        })
    })
};

// ALL Pengurus Koperasi BY ID Koperasi
exports.allpenguruskoperasibyid = (req, res) => {
    sequelize.query('SELECT a.id_user, b.nama_lengkap, c.nama_jabatan, d.nama_koperasi FROM anggota_koperases AS a JOIN users_identitas AS b ON a.id_user = b.id_user JOIN jabatans AS c ON c.id_jabatan = a.id_jabatan JOIN koperases AS d ON d.id_koperasi = a.id_koperasi WHERE a.id_koperasi = "'+req.params.id_koperasi+'" AND a.status="Diterima" AND a.id_jabatan!="9" ORDER BY b.nama_lengkap ASC', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(query => {
        res.json({
            error: false,
            data: query,
            response: 'All Pengurus Koperasi By ID Koperasi'
        })
    })
};

// ALL Anggota Koperasi Pending BY ID Koperasi
exports.allanggotakoperasipendingbyid = (req, res) => {
    sequelize.query('SELECT a.id_user, b.nama_lengkap, c.nama_jabatan, d.nama_koperasi FROM anggota_koperases AS a JOIN users_identitas AS b ON a.id_user = b.id_user JOIN jabatans AS c ON c.id_jabatan = a.id_jabatan JOIN koperases AS d ON d.id_koperasi = a.id_koperasi WHERE a.id_koperasi = "'+req.params.id_koperasi+'" AND a.status="Proses" ORDER BY b.nama_lengkap ASC', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(query => {
        res.json({
            error: false,
            data: query,
            response: 'Pending User Koperasi By ID Koperasi'
        })
    })
};

// List Join Ketua BY ID Koperasi
exports.listjoinketuakoperasibyid = (req, res) => {
    sequelize.query('SELECT a.id_user, b.nama_lengkap, c.nama_jabatan, d.nama_koperasi FROM anggota_koperases AS a JOIN users_identitas AS b ON a.id_user = b.id_user JOIN jabatans AS c ON c.id_jabatan = a.id_jabatan JOIN koperases AS d ON d.id_koperasi = a.id_koperasi WHERE a.id_koperasi = "'+req.params.id_koperasi+'" AND a.status="Proses" AND a.id_jabatan="1" ORDER BY b.nama_lengkap ASC', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(query => {
        res.json({
            error: false,
            data: query,
            response: 'List Join Ketua Koperasi By ID Koperasi'
        })
    })
};

// Riwayat Anggota Koperasi
exports.riwayatanggotakoperasibyid = (req, res) => {
    sequelize.query('SELECT a.id_user, b.nama_lengkap, c.nama_jabatan, d.nama_koperasi, a.status FROM anggota_koperases AS a JOIN users_identitas AS b ON a.id_user = b.id_user JOIN jabatans AS c ON c.id_jabatan = a.id_jabatan JOIN koperases AS d ON d.id_koperasi = a.id_koperasi WHERE a.id_koperasi = "'+req.params.id_koperasi+'" AND a.status!="Proses" ORDER BY b.nama_lengkap ASC', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(query => {
        res.json({
            error: false,
            data: query,
            response: 'Riwayat User Koperasi By ID Koperasi'
        })
    })
};

// TOTAL ANGGOTA KOPERASI
exports.totalanggotakoperasibyid = (req, res) => {
    sequelize.query('SELECT COUNT(a.id_user) as total FROM anggota_koperases AS a JOIN users_identitas AS b ON a.id_user = b.id_user JOIN jabatans AS c ON c.id_jabatan = a.id_jabatan JOIN koperases AS d ON d.id_koperasi = a.id_koperasi WHERE a.id_koperasi = "'+req.params.id_koperasi+'" AND a.status="Diterima"', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(query => {
        res.json({
            error: false,
            data: query,
            response: 'Total Anggota Koperasi By ID Koperasi'
        })
    })
};

// TOTAL PENGURUS KOPERASI
exports.totalpenguruskoperasibyid = (req, res) => {
    sequelize.query('SELECT COUNT(a.id_user) as total FROM anggota_koperases AS a JOIN users_identitas AS b ON a.id_user = b.id_user JOIN jabatans AS c ON c.id_jabatan = a.id_jabatan JOIN koperases AS d ON d.id_koperasi = a.id_koperasi WHERE a.id_koperasi = "'+req.params.id_koperasi+'" AND a.status="Diterima" AND a.id_jabatan!="9"', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(query => {
        res.json({
            error: false,
            data: query,
            response: 'Total Pengurus Koperasi By ID Koperasi'
        })
    })
};

// TOTAL LIST JOIN KETUA KOPERASI
exports.totaljoinketuakoperasibyid = (req, res) => {
    sequelize.query('SELECT COUNT(a.id_user) as total FROM anggota_koperases AS a JOIN users_identitas AS b ON a.id_user = b.id_user JOIN jabatans AS c ON c.id_jabatan = a.id_jabatan JOIN koperases AS d ON d.id_koperasi = a.id_koperasi WHERE a.id_koperasi = "'+req.params.id_koperasi+'" AND a.status="Proses" AND a.id_jabatan="1"', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(query => {
        res.json({
            error: false,
            data: query,
            response: 'List Join Ketua Koperasi By ID Koperasi'
        })
    })
};

// TOTAL LIST JOIN PENGURUS KOPERASI
exports.totaljoinpenguruskoperasibyid = (req, res) => {
    sequelize.query('SELECT COUNT(a.id_user) as total FROM anggota_koperases AS a JOIN users_identitas AS b ON a.id_user = b.id_user JOIN jabatans AS c ON c.id_jabatan = a.id_jabatan JOIN koperases AS d ON d.id_koperasi = a.id_koperasi WHERE a.id_koperasi = "'+req.params.id_koperasi+'" AND a.status="Proses" AND a.id_jabatan!="9"', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(query => {
        res.json({
            error: false,
            data: query,
            response: 'List Join Ketua Koperasi By ID Koperasi'
        })
    })
};

// TOTAL KAS KOPERASI
exports.kaskoperasibyid = (req, res) => {
    sequelize.query('SELECT wallet as total FROM koperases WHERE id_koperasi = "'+req.params.id_koperasi+'"', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(query => {
        res.json({
            error: false,
            data: query,
            response: 'Total Kas Koperasi'
        })
    })
};


// ACC ATAU TOLAK PENGURUS
exports.acctolakpengurus = (req, res) => {
    const status = req.body.status;
    const id_pengajuan = req.body.id_pengajuan;
    Anggota.update({
        status: status,
    }, {
        where: {
            id_pengajuan: id_pengajuan
        }
    })
    .then(anggota_koperases => {
        var message = "Anggota Berhasil " + status;
            // sendSMS(no_telp, message);
            res.status(201).json({
                error: false,
                data: [],
                response: message
            });

        })
    .catch(error => res.json({
        error: true,
        data: [],
        response: error
    }));
};

// ACC ATAU TOLAK PENGURUS
exports.joinanggota = (req, res) => {
    const id_user = req.body.id_user;
    const id_koperasi = req.body.id_koperasi;
    const deskripsi = req.body.deskripsi;
    const id_jabatan = req.body.id_jabatan;
    Anggota.create({
        id_user: id_user,
        id_koperasi: id_koperasi,
        deskripsi: deskripsi,
        status: 'Proses',
        id_jabatan: id_jabatan,
    })
    .then(query => { 
        res.status(201).json({
            error: false,
            data: [{
                status: 'Proses',
            }],
            response: "Berhasil Mengirim Pengajuan Menjadi Anggota"
        });
    })
    .catch(error => res.status(201).json({
        error: true,
        data: [],
        response: "Gagal"
    }));
};

// EDIT ANGGOTA
exports.editanggota = (req, res) => {
    const id_user = req.body.id_user;
    const id_koperasi = req.body.id_koperasi;
    const deskripsi = req.body.deskripsi;
    const id_jabatan = req.body.id_jabatan;
    const id_pengajuan = req.body.id_pengajuan;
    const status = req.body.status;
    Anggota.update({
        id_user: id_user,
        id_koperasi: id_koperasi,
        deskripsi: deskripsi,
        id_jabatan: id_jabatan,
        status: status,
    }, {
        where: {
            id_pengajuan: id_pengajuan
        }
    })
    .then(query => { 
        res.status(201).json({
            error: false,
            data: [{
                status: 'Success',
            }],
            response: "Berhasil Mengedit Anggota"
        });
    })
    .catch(error => res.status(201).json({
        error: true,
        data: [],
        response: "Gagal"
    }));
};

// HAPUS ANGGOTA
exports.deleteanggota = (req, res) => {
    const id_pengajuan = req.params.id_pengajuan;

    Anggota.destroy({
        where: {
            id_pengajuan: id_pengajuan
        }
    })
    .then(status =>  res.status(201).json({
        error: false,
        data: [{
            status: 'Success',
        }],
        response: "Berhasil Menghapus Anggota"
    }))
    .catch(error => res.status(201).json({
        error: true,
        data: [],
        response: "Gagal"
    }));
};

// Kantor BY ID Koperasi
exports.kantorbyidkoperasi = (req, res) => {
    sequelize.query('SELECT a.nama_kantor, a.alamat, b.provinsi, c.kabkot, d.kecamatan, e.desa FROM kantors AS a JOIN provinses AS b ON a.provinsi = b.id JOIN kabkots AS c ON a.kabkot = c.id JOIN kecamatans AS d ON a.kecamatan = d.id JOIN desas AS e ON a.desa = e.id WHERE a.id_koperasi = "'+req.params.id_koperasi+'" ORDER BY a.nama_kantor ASC', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(query => {
        res.json({
            error: false,
            data: query,
            response: 'All Kantor By ID Koperasi'
        })
    })
};

// Tambah Kantor
exports.tambahkantor = (req, res) => {
    const id_koperasi = req.body.id_koperasi;
    const nama_kantor = req.body.nama_kantor;
    const alamat = req.body.alamat;
    const provinsi = req.body.provinsi;
    const kabkot = req.body.kabkot;
    const kecamatan = req.body.kecamatan;
    const desa = req.body.desa;
    Kantor.create({
        id_koperasi: id_koperasi,
        nama_kantor: nama_kantor,
        alamat: alamat,
        provinsi: provinsi,
        kabkot: kabkot,
        kecamatan: kecamatan,
        desa: desa,
    })
    .then(query => { 
        res.status(201).json({
            error: false,
            data: [{
                status: 'Proses',
            }],
            response: "Berhasil Menambah Kantor"
        });
    })
    .catch(error => res.status(201).json({
        error: true,
        data: [],
        response: "Gagal"
    }));
};

// EDIT KANTOR
exports.editkantor = (req, res) => {
    const id_kantor = req.body.id_kantor;
    const id_koperasi = req.body.id_koperasi;
    const nama_kantor = req.body.nama_kantor;
    const alamat = req.body.alamat;
    const provinsi = req.body.provinsi;
    const kabkot = req.body.kabkot;
    const kecamatan = req.body.kecamatan;
    const desa = req.body.desa;
    Kantor.update({
        id_koperasi: id_koperasi,
        nama_kantor: nama_kantor,
        alamat: alamat,
        provinsi: provinsi,
        kabkot: kabkot,
        kecamatan: kecamatan,
        desa: desa,
    }, {
        where: {
            id_kantor: id_kantor
        }
    })
    .then(query => { 
        res.status(201).json({
            error: false,
            data: [{
                status: 'Success',
            }],
            response: "Berhasil Mengedit Kantor"
        });
    })
    .catch(error => res.status(201).json({
        error: true,
        data: [],
        response: "Gagal"
    }));
};

// HAPUS KANTOR
exports.deletekantor = (req, res) => {
    const id_kantor = req.params.id_kantor;

    Kantor.destroy({
        where: {
            id_kantor: id_kantor
        }
    })
    .then(status =>  res.status(201).json({
        error: false,
        data: [{
            status: 'Success',
        }],
        response: "Berhasil Menghapus Kantor"
    }))
    .catch(error => res.status(201).json({
        error: true,
        data: [],
        response: "Gagal"
    }));
};

// KOPERASI BY TINGKAT
exports.koperasibytingkat = (req, res) => {
    const tingkat = req.params.tingkat;
    Koperasi.findAll({
        where: {
            tingkat: tingkat
        }
    })
    .then(koperasi => res.json({
        error: false,
        data: [koperasi],
        response: "Koperasi By Tingkat"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: error
    }));
};

// Semua Jabatan
exports.alljabatan = (req, res) => {
    Jabatan.findAll({})
    .then(jabatan => res.json({
        error: false,
        data: [jabatan],
        response: "Semua Jabatan"
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        response: error
    }));
};