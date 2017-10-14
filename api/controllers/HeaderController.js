var bcrypt = require("bcryptjs");

module.exports = {
	// AJAX
	//
	signUp: function (req, res) {
		var response = Response(req, res);

		User.create(req.body)
			.then(function (created) {
				return response.addSuccess("The user has been created successfully.").send();
			})
			.catch(function (err) {
				return response.sendErr(err);
			});
	},

	login: function (req, res) {
		var response = Response(req, res);

		User.findOne({
			or: [
				{ username: req.body.usernameOrEmail },
				{ email: req.body.usernameOrEmail }
			]
		})
			.then(function (found) {
			    // Found username / email
			    if (found) {
				    return bcrypt.compare(req.body.password, found.password);
			    }
				return false;
			})
			.then(function (found) {
                // Found username / email and password
				if (found) {
                    req.session.user = found;
					return response.addSuccess("Login success.").send();
				}
				return response.addError("Login fail.").send();
			})
		    .catch(function (err) {
			    return response.sendErr(err);
		    });
	}
};

