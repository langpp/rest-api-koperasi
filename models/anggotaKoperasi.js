module.exports = (sequelize, Sequelize) => {
	const anggota_koperasi = sequelize.define('anggota_koperases', {
		id_pengajuan: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_user: {
			type: Sequelize.STRING
		},
		id_koperasi: {
			type: Sequelize.STRING
		},
		tanggal: {
			type: Sequelize.STRING
		},
		deskripsi: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.STRING
		},
		id_jabatan: {
			type: Sequelize.INTEGER
		},
	});

	return anggota_koperasi;
}