const bcrypt = require("bcrypt");


module.exports = (sequelize, Sequelize) => {
	const Users = sequelize.define('users', {
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

	Users.beforeCreate((users, options) => {
		return bcrypt.hash(users.password, 12)
			.then(hash => {
				users.password = hash;
			})
			.catch(err => {
				throw new Error();
			});
	})

	Users.prototype.comparePassword = function (pw, callback) {
		let err, pass
		if (!this.password) return false;

		bcrypt.compare(pw, this.password, callback);
		console.log(this.password);
		console.log(pw);
		console.log(bcrypt.compare(pw, this.password));
	}

	return Users;
}