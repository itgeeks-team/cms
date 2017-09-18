/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 *
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new : function(req, res) {
    res.view(vm);
  },
  //Brian 20170730 - Start
  //To create new User with parameter
  //Brian - End
  // Ajax call in Account.js signUp
  create : function(req, res, next) {
    User.create(req.allParams())
    .then(function(user){
      req.session.authenticated = true;
      req.session.User = user;
      return res.view(req.viewData.view, { user, layout : null});
    })
    .catch(function(err){
      console.log(err);
    });
  },
  show : function(req, res, next) {
    User.findOne(req.param('id'),function foundUser (err,user) {
      if(err) return next(err);
      if(!user) return next();
      res.view({
          title:"User Input",
          user:user
      });
    });
  },
  index: function(req,res,next){
    User.find(function foundUsers (err, users) {
      if(err) return next(err);
      res.view({
          users:users
      });
    });
  },
  edit : function(req, res, next) {
    User.findOne(req.param('id'),function foundUser(err,user) {
      if(err) return next(err);
      if(!user) return next('User not found');
      res.view({
          user:user
      });
    });
  },
  update : function(req, res, next) {
    User.update(req.param('id'),req.params.all(),function userUpdated(err) {
      if(err){
          return res.redirect('/user/edit/' + req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'));
    });
  },
  destroy : function(req, res, next) {
    User.findOne(req.param('id'),function foundUser(err, user) {
      if(err) return next(err);
      if(!user) return next('User not found');
      User.destroy(req.param('id'), function userDestroyed(err, user) {
          if(err) return next(err);
      });
      res.redirect('/user');
    });
  }
};

