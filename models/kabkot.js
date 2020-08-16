module.exports = (sequelize, Sequelize) => {
	const kabkot = sequelize.define('kabkots', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		id_provinsi : {
			type: Sequelize.STRING
		},
		kabkot: {
			type: Sequelize.STRING
		},
	});

	return kabkot;
}