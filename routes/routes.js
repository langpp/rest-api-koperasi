module.exports = (app) => {

  const auth = require('../controllers/authController.js');
  const dashboard = require('../controllers/dashboardController.js');
  const dirgantara = require('../controllers/dirgantaraController.js');
  const iuran = require('../controllers/iuranController.js');
  const koperasi = require('../controllers/koperasiController.js');
  const wallet = require('../controllers/walletController.js');
  const wilayah = require('../controllers/wilayahController.js');

  //Users Authentification
  app.post('/auth/checkuser', auth.checkuser);
  app.post('/auth/logincheck', auth.logincheck);
  app.post('/auth/resendsmsotp', tokencheck, auth.resendsmsotp);
  app.post('/auth/registerpassword', tokencheck, auth.registerpassword);
  app.post('/auth/validatesmsotp', tokencheck, auth.validatesmsotp);
  app.post('/auth/sendotpmail', tokencheck, auth.sendotpmail);
  app.post('/auth/validateemailotp', tokencheck, auth.validateemailotp);

  // Wilayah Function
  app.get('/provinsi', wilayah.allprovinsi);
  app.get('/kabkot', wilayah.allkabkot);
  app.get('/kecamatan', wilayah.allkecamatan);
  app.get('/desa', wilayah.alldesa);
  app.get('/provinsibyid/:id', wilayah.provinsibyid);
  app.get('/kabkotbyid/:id', wilayah.kabkotbyid);
  app.get('/kecamatanbyid/:id', wilayah.kecamatanbyid);
  app.get('/desabyid/:id', wilayah.desabyid);
  app.get('/kabkotbyidprovinsi/:id', wilayah.kabkotbyidprovinsi);
  app.get('/kecamatanbyidkabkot/:id', wilayah.kecamatanbyidkabkot);
  app.get('/desabyidkecamatan/:id', wilayah.desabyidkecamatan);

  // Koperasi Function
  app.get('/allanggotakoperasibyid/:id_koperasi', tokencheck,  koperasi.allanggotakoperasibyid);
  app.get('/allpenguruskoperasibyid/:id_koperasi', tokencheck,  koperasi.allpenguruskoperasibyid);
  app.get('/allanggotakoperasipendingbyid/:id_koperasi', tokencheck, koperasi.allanggotakoperasipendingbyid);
  app.get('/riwayatanggotakoperasibyid/:id_koperasi', tokencheck, koperasi.riwayatanggotakoperasibyid);
  app.get('/listjoinketuakoperasibyid/:id_koperasi', tokencheck, koperasi.listjoinketuakoperasibyid);
  app.post('/acctolakpengurus', tokencheck, koperasi.acctolakpengurus);
  app.post('/joinanggota', tokencheck, koperasi.joinanggota);
  app.post('/editanggota', tokencheck, koperasi.editanggota);
  app.delete('/deleteanggota/:id_pengajuan', tokencheck, koperasi.deleteanggota);
  app.post('/tambahkantor', tokencheck, koperasi.tambahkantor);
  app.post('/editkantor', tokencheck, koperasi.editkantor);
  app.delete('/deletekantor/:id_kantor', tokencheck, koperasi.deletekantor);
  app.get('/totalanggotakoperasibyid/:id_koperasi', tokencheck, koperasi.totalanggotakoperasibyid);
  app.get('/totalpenguruskoperasibyid/:id_koperasi', tokencheck, koperasi.totalpenguruskoperasibyid);
  app.get('/totaljoinketuakoperasibyid/:id_koperasi', tokencheck, koperasi.totaljoinketuakoperasibyid);
  app.get('/totaljoinpenguruskoperasibyid/:id_koperasi', tokencheck, koperasi.totaljoinpenguruskoperasibyid);
  app.get('/kaskoperasibyid/:id_koperasi', tokencheck, koperasi.kaskoperasibyid);
  app.get('/kantorbyidkoperasi/:id_koperasi', tokencheck, koperasi.kantorbyidkoperasi);
  app.get('/koperasibytingkat/:tingkat', tokencheck, koperasi.koperasibytingkat);
  app.get('/alljabatan', tokencheck, koperasi.alljabatan);
  
  // Dashboard Function
  app.get('/allbank', tokencheck, dashboard.allbank);
  app.get('/allrekening/:id_user', tokencheck, dashboard.allrekening);
  app.post('/tambahrekening', tokencheck, dashboard.tambahrekening);
  app.post('/editrekening', tokencheck, dashboard.editrekening);
  app.delete('/deleterekening/:id_rekening', tokencheck, dashboard.deleterekening);
  app.post('/complateidentity', tokencheck, dashboard.complateidentity);
  app.post('/editidentity', tokencheck, dashboard.editidentity);
  app.post('/changeimageprofile', tokencheck, dashboard.changeimageprofile);
  app.get('/userbyid/:id_user', tokencheck, dashboard.userbyid);
  
  // Iuran Function
  app.post('/mutasiiuranwajib', tokencheck, iuran.mutasiIuranWajib);
  app.get('/mutasiiuransukarela/:id_user', tokencheck, iuran.mutasiIuranSukarela);
  app.get('/riwayatiuran/:id_user', tokencheck, iuran.riwayatIuran);
  app.post('/totaliuran', tokencheck, iuran.TotalIuran);
  app.post('/bayariuran', tokencheck, iuran.bayariuran);

  //Wallet
  app.get('/walletbyuserid/:no_telp', tokencheck, wallet.walletbyuserid);
  app.get('/mutasiwallet/:id_user', tokencheck, wallet.mutasiwallet);
  app.post('/addmutasiwallet', tokencheck, wallet.addmutasiwallet);
   
  // Dirgantara Function
  app.get('/totalwalletkoperasi/:id_koperasi', tokencheck, dirgantara.totalwalletkoperasi);
  app.post('/totalwalletkoperasitingkat', tokencheck, dirgantara.totalwalletkoperasitingkat);
  app.get('/mutasikoperasi/:id_koperasi', tokencheck, dirgantara.mutasikoperasi);
  app.post('/addmutasikoperasi', tokencheck, dirgantara.addmutasikoperasi);
  app.post('/acctolakwallet', tokencheck, dirgantara.acctolakwallet);
  app.post('/acctolakwalletkoperasi', tokencheck, dirgantara.acctolakwalletkoperasi);
  

  // app.get('/api/users', tokencheck, users.findAll);
  // app.get('/api/users', users.findAll);
  // app.get('/api/users/:user_id', users.findOne);
  // app.put('/api/users/:user_id', users.update);
  // app.delete('/api/users/:user_id', users.delete);
}

var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var config = require('../config/config.js');
app.set('superSecret', config.secret);

const tokencheck = (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    var header = req.headers.authorization.split(' ');
    var token = header[1];
    if (token) {
      jwt.verify(token, app.get('superSecret'), (err, decoded) => {
        if (err) {
          return res.json({
            error: true,
            data: [],
            response: 'Failed to authenticate token'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        error: true,
        data: [],
        response: 'No token provided'
      });
    }
  }else{
    return res.status(403).send({
      error: true,
      data: [],
      response: 'No token provided'
    });
  }
};