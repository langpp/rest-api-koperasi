module.exports = (sequelize, Sequelize) => {
	const iuran = sequelize.define('iurans', {
		id_iuran: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		nama_iuran: {
			type: Sequelize.STRING
		},
		total: {
			type: Sequelize.INTEGER
		},
	});

	return iuran;
}