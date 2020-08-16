module.exports = (sequelize, Sequelize) => {
	const jabatan = sequelize.define('jabatans', {
		id_jabatan: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nama_jabatan: {
			type: Sequelize.STRING
		},
	});

	return jabatan;
}