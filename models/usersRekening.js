module.exports = (sequelize, Sequelize) => {
	const users_rekening = sequelize.define('users_rekenings', {
		id_rekening : {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_user: {
			type: Sequelize.STRING
		},
		id_bank: {
			type: Sequelize.STRING
		},
		no_rekening: {
			type: Sequelize.INTEGER
		},
	});

	return users_rekening;
}