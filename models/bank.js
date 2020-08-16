module.exports = (sequelize, Sequelize) => {
	const bank = sequelize.define('banks', {
		id_bank: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		kode_bank: {
			type: Sequelize.STRING
		},
		nama_bank: {
			type: Sequelize.STRING
		},
	});

	return bank;
}