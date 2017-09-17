/**
 * ThreadController
 *
 * @description :: Server-side logic for managing threads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  show : function (req, res, next) {
    Thread.find({ limit : 20})
    .then(function (threads) {
      return res.view(req.viewData.view, { threads, layout: null });
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

