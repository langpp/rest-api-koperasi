module.exports = (sequelize, Sequelize) => {
	const notifikasi_user = sequelize.define('notifikasi_users', {
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
		id_user: {
			type: Sequelize.STRING,
		},
		status: {
			type: Sequelize.STRING,
		},
	});

	return notifikasi_user;
}