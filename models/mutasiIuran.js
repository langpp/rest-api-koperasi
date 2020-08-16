module.exports = (sequelize, Sequelize) => {
	const mutasi_iuran = sequelize.define('mutasi_iurans', {
		id_mutasi : {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_user: {
			type: Sequelize.STRING
		},
		id_iuran: {
			type: Sequelize.STRING
		},
		keterangan: {
			type: Sequelize.STRING
		},
		total: {
			type: Sequelize.INTEGER,
		},
		tanggal_pembayaran: {
			type: Sequelize.STRING
		},
		jenis: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.STRING
		},
	});

	return mutasi_iuran;
}