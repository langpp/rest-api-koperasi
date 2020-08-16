module.exports = (sequelize, Sequelize) => {
	const kecamatan = sequelize.define('kecamatans', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		id_kabkot : {
			type: Sequelize.STRING
		},
		kecamatan: {
			type: Sequelize.STRING
		},
	});

	return kecamatan;
}