/**
 * Account class to manage account activity
 * @class
 **/
var Account = (function () {

  var isEmail = function (value) {
    return Validator.regexCollections.email.test(value);
  }
  var login = function (target) {
    $.ajax({
      type: "POST",
      url: SITE_URL + "/session/new",
      data: {
        usernameOrEmail : $(target).find("input[name='username-or-email']").val(),
        password        : $(target).find("input[name='password']").val(),
        isEmail         : isEmail($(target).find("input[name='username-or-email']").val()),
        view            : "components/header"
      },
      dataType: "html",
      success: function (res) {
        $(".modal").modal("hide"); // Close modal-backdrop
        $("header").html(res); // Get the partial html render in header
      }
    });
  }

  var signUp = function (target) {
    $.ajax({
      type: "POST",
      url: SITE_URL + "/user/create",
      data: {
        displayName     : $(target).find("input[name='display-name']").val(),
        username        : $(target).find("input[name='username']").val(),
        email           : $(target).find("input[name='email']").val(),
        password        : $(target).find("input[name='password']").val(),
        passwordConfirm : $(target).find("input[name='password-confirm']").val(),
        view            : "components/header"
      },
      dataType: "html",
      success: function (res) {
        $(".modal").modal("hide"); // Close modal-backdrop
        $("header").html(res); // Get the partial html render in header
      }
    });
  }

  var logout = function (target) {
    $.ajax({
      type: "POST",
      url: SITE_URL + "/session/destroy",
      data: {
        view  : "components/header"
      },
      dataType: "html",
      success: function (res) {
        $(".modal").modal("hide"); // Close modal-backdrop
        $("header").html(res); // Get the partial html render in header
      }
    });
  }

  return {
    login  : login,
    signUp : signUp,
    logout : logout
  }
})();
