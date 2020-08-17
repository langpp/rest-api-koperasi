module.exports = (sequelize, Sequelize) => {
	const mutasi_wallet = sequelize.define('mutasi_wallets', {
		id_mutasi : {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_user: {
			type: Sequelize.STRING
		},
		keterangan: {
			type: Sequelize.STRING
		},
		total: {
			type: Sequelize.INTEGER,
		},
		tanggal: {
			type: Sequelize.STRING
		},
		jenis: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.STRING
		},
	});

	return mutasi_wallet;
}