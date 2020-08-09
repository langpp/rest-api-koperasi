const bcrypt = require("bcrypt");


module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
		id_user: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: Sequelize.STRING
		},
		no_telp: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.INTEGER
		},
		foto: {
			type: Sequelize.STRING,
		},
		role: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.STRING
		},
		jabatan: {
			type: Sequelize.STRING
		},
		token: {
			type: Sequelize.STRING
		},
		no_va: {
			type: Sequelize.STRING
		},
		otp: {
			type: Sequelize.STRING
		},
	});

	User.beforeCreate((user, options) => {

		return bcrypt.hash(user.password, 10)
			.then(hash => {
				user.password = hash;
			})
			.catch(err => {
				throw new Error();
			});
	})

	User.prototype.comparePassword = function (pw, callback) {
		let err, pass
		if (!this.password) return false;

		bcrypt.compare(pw, this.password, callback);
	}

	return User;
}