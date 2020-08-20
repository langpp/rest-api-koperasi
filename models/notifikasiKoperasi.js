module.exports = (sequelize, Sequelize) => {
	const notifikasi_koperasi = sequelize.define('notifikasi_koperases', {
		id_notifikasi : {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		notifikasi: {
			type: Sequelize.STRING
		},
		deskripsi: {
			type: Sequelize.STRING
		},
		tanggal: {
			type: Sequelize.STRING
		},
		id_koperasi: {
			type: Sequelize.STRING,
		},
		status: {
			type: Sequelize.STRING,
		},
	});

	return notifikasi_koperasi;
}