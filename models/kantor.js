module.exports = (sequelize, Sequelize) => {
	const Kantor = sequelize.define('kantors', {
		id_kantor: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_koperasi: {
			type: Sequelize.STRING
		},
		nama_kantor: {
			type: Sequelize.STRING
		},
		alamat: {
			type: Sequelize.STRING
		},
		provinsi: {
			type: Sequelize.STRING
		},
		kabkot: {
			type: Sequelize.STRING
		},
		kecamatan: {
			type: Sequelize.STRING
		},
		desa: {
			type: Sequelize.STRING
		},
	});

	return Kantor;
}