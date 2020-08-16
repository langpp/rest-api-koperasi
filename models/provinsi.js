module.exports = (sequelize, Sequelize) => {
	const provinsi = sequelize.define('provinses', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		provinsi: {
			type: Sequelize.STRING
		},
	});

	return provinsi;
}