module.exports = (sequelize, Sequelize) => {
	const users_identitas = sequelize.define('users_identitas', {
		id_identitas : {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_user: {
			type: Sequelize.STRING
		},
		nama_lengkap: {
			type: Sequelize.STRING
		},
		no_ktp: {
			type: Sequelize.INTEGER
		},
		provinsi: {
			type: Sequelize.INTEGER,
		},
		kabkot: {
			type: Sequelize.INTEGER
		},
		kecamatan: {
			type: Sequelize.INTEGER
		},
		desa: {
			type: Sequelize.INTEGER
		},
		alamat: {
			type: Sequelize.STRING
		},
	});

	return users_identitas;
}