/**
 * Event binding separated by component
 * @class
 **/
var EventBinder = (function () {
  var components = {
    header : "header"
  }
  var header = function () {
    $(components.header).on("shown.bs.modal", "#login", function (e) {
      Client.validation("#login form", Validator.loginRules)
    });
    $(components.header).on("shown.bs.modal", "#sign-up", function (e) {
      Client.validation("#sign-up form", Validator.signUpRules)
    });
    $(components.header).on("hidden.bs.modal", "#login", function (e) {
      Client.clearError("#login");
    });
    $(components.header).on("hidden.bs.modal", "#sign-up", function (e) {
      Client.clearError("#sign-up");
    });
    $(components.header).on("submit", "#login form", function (e) {
      e.preventDefault();
      Account.login(this);
    });
    $(components.header).on("submit", "#sign-up form", function (e) {
      e.preventDefault();
      Account.signUp(this);
    });
    $(components.header).on("click", "button[role='logout-btn']", function (e) {
      Account.logout(this);
    });
  }

  return {
    header : header
  }
})();

EventBinder.header();
