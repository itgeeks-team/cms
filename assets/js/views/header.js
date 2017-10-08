(function () {
	var signUpRules = {
		displayName: {
			required: true
		},
		username: {
			required: true
		},
		email: {
			required: true,
			email: true
		},
		password: {
			minlength: 6,
			required: true,
		},
		confirmedPassword: {
			minlength: 6,
			required: true,
			equalTo: "#sign-up input[name='password']"
		}
	};

	var signUpMessages = {
		confirmedPassword: {
			equalTo: "Must be the same password as above."
		}
	};

	var loginRules = {
		"username-or-email": {
			minlength: 6,
			required: true,
			usernameOrEmail: true
		},
		"password": {
			minlength: 6,
			required: true
		}
	};

	var login = function (target) {
		$.ajax({
			type: "POST",
			url: SITE_URL + "/session/new",
			data: {
				usernameOrEmail: $(target).find("input[name='username-or-email']").val(),
				password: $(target).find("input[name='password']").val(),
				isEmail: isEmail($(target).find("input[name='username-or-email']").val()),
				view: "components/header"
			},
			dataType: "html",
			success: function (res) {
				$(".modal").modal("hide"); // Close modal-backdrop
				$("header").html(res); // Get the partial html render in header
			}
		});
	};

	var logout = function (target) {
		$.ajax({
			type: "POST",
			url: SITE_URL + "/session/destroy",
			data: {
				view: "components/header"
			},
			dataType: "html",
			success: function (res) {
				$(".modal").modal("hide"); // Close modal-backdrop
				$("header").html(res); // Get the partial html render in header
			}
		});
	};

	// Events
	//
	// Modal show / hide
	$("#login").on("shown.bs.modal", function (e) {
		$(this).find("form").validateForm(loginRules);
	});
	$("#sign-up").on("shown.bs.modal", function (e) {
		$(this).find("form").validateForm(signUpRules, signUpMessages);
	});
	$("login, #sign-up").on("hidden.bs.modal", function (e) {
		$(this).find("form").resetForm();
	});
	// Form submit
	$("#login form").submit(function (e) {
		e.preventDefault();
		Account.login(this);
	});
	$("#sign-up form").submit(function (e) {
		e.preventDefault();
		$(this).ajaxForm("/user/create", function (res) {

		});
		//$.post("/user/create", $(this).serialize(), function (response) {
		//	$(".modal").modal("hide"); // Close modal-backdrop
		//	$("header").html(res); // Get the partial html render in header
		//});
});
$("button[role='logout-btn']").click(function (e) {
	Account.logout(this);
});
})();