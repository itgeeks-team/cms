/**
 * NavigationController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var vm = new (require("../services/BaseViewModel"))(); // Shorthand class instantiatize

module.exports = {
  /**
   * `NavigationController.home()`
   */
  home: function (req, res) {
    vm.setTitle("Home");
    vm.setActivePill(req.path);
    return res.view({ vm });
  },

  /**
   * `NavigationController.forum()`
   */
  forums: function (req, res) {
    vm.setTitle("Forums");
    vm.setActivePill(req.path);
    return res.view({ vm });
  },

  /**
   * `NavigationController.projects()`
   */
  projects: function (req, res) {
    vm.setTitle("Projects");
    vm.setActivePill(req.path);
    return res.view({ vm });
  }
};

