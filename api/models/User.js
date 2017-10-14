var bcrypt = require("bcryptjs");

module.exports = {
	schema: true,

	attributes: {
		displayName: {
			type: "string",
			required: true
		},
		username: {
			type: "string",
			required: true,
			unique: true
		},
		email: {
			type: "string",
			email: true,
			required: true,
			unique: true
		},
		password: {
			type: "string"
		},
		thread: {
			collection: "thread",
			via: "owner"
		}
	},

	beforeCreate: function (create, cb) {
		if (create.password !== create.confirmedPassword) {
			return cb("Password does not match confirmed password.");
		}

		bcrypt.hash(create.password, 10)
			.then(function (hash) {
				create.password = hash;
				return cb();
			})
			.catch(function (err) {
				return cb(err);
			});
	}
};

