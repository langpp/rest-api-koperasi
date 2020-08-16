module.exports = (sequelize, Sequelize) => {
	const koperasi = sequelize.define('koperases', {
		id_koperasi : {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		nama_koperasi: {
			type: Sequelize.STRING
		},
		alamat: {
			type: Sequelize.STRING
		},
		wallet: {
			type: Sequelize.INTEGER
		},
		koperasi_nasional: {
			type: Sequelize.STRING
		},
		koperasi_provinsi: {
			type: Sequelize.STRING
		},
		koperasi_kabkot: {
			type: Sequelize.STRING
		},
		tingkat: {
			type: Sequelize.INTEGER
		},
	});

	return koperasi;
}