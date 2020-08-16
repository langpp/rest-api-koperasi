module.exports = (sequelize, Sequelize) => {
	const role = sequelize.define('roles', {
		id_role : {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nama_role: {
			type: Sequelize.STRING
		},
	});

	return role;
}