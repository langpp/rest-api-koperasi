module.exports = (sequelize, Sequelize) => {
	const desa = sequelize.define('desas', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		id_kecamatan : {
			type: Sequelize.STRING
		},
		desa: {
			type: Sequelize.STRING
		},
	});

	return desa;
}