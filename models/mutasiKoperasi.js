module.exports = (sequelize, Sequelize) => {
	const mutasi_koperasi = sequelize.define('mutasi_koperases', {
		id_mutasi : {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_koperasi: {
			type: Sequelize.STRING
		},
		total: {
			type: Sequelize.INTEGER
		},
		jenis: {
			type: Sequelize.STRING
		},
		tanggal: {
			type: Sequelize.STRING,
		},
		keterangan: {
			type: Sequelize.STRING,
		},
		status: {
			type: Sequelize.STRING,
		},
	});

	return mutasi_koperasi;
}