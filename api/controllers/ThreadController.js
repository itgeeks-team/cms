/**
 * ThreadController
 *
 * @description :: Server-side logic for managing threads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var vm = new BaseViewModel();

module.exports = {
  show : function (req, res, next) {
    if (typeof req.param("category") === "undefined" || typeof req.param("page") === "undefined") {
      return res.redirect("/forums/all/1");
    }

    vm.setActivePill("Thread");
    Thread.find()
    .then(function (threads) {
      vm.title = "All Threads";
      if (req.xhr) {
        return res.view(req.viewData.view, { vm, threads, layout : null });
      } else {
        return res.view({ vm, threads });
      }
    })
    .catch(function (err) {
      req.session.flash = {
        err : err
      }
      return res.redirect('/');
    });
  },
	create : function (req, res, next) {
    Thread.create(req.allParams())
    .then(function (thread) {
      return res.json(thread);
    })
    .catch(function (err) {
      req.session.flash = {
        err : err
      }
      return res.redirect('/');
    });
  }
};

