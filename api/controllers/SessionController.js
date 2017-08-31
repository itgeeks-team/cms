/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `SessionController.new()`
   * @author David Tan
   * @description Create session after authenticated posted values
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   * @returns {HTML} partial view from ejs
   */
  new: function (req, res, next) {
    var bcrypt = require("bcryptjs");
    var userObj = {};

    if (req.param("isEmail") == "true") {
      userObj.email    = req.param("usernameOrEmail");
    } else {
      userObj.username = req.param("usernameOrEmail");
    }

    User.findOne(userObj).exec(function (err, user) {
      if (err) console.log(err);
      bcrypt.compare(req.param("password"), user.encryptedPassword, function (err, valid) {
        if (valid === true) {
          req.session.authenticated = true;
          req.session.User          = user;
          user.layout               = null;
          return res.view(req.viewData.view, user);
        } else {
          return res.view(req.viewData.view);
        }
      });
    });
  },


  /**
   * `SessionController.destroy()`
   * @author David Tan
   * @description Destroy session after logout
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   * @returns {HTML} partial view from ejs
   */
  destroy: function (req, res, next) {
    req.session.authenticated = false;
    req.session.User          = null;
    return res.view(req.viewData.view, {layout : null});
  }
};

