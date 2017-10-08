/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema:true,

  attributes: {
    displayName : {
      type     : 'string',
      required : true
    },
    username : {
      type     : 'string',
      required : true,
      unique   : true
    },
    email : {
      type     : 'string',
      email    : true,
      required : true,
      unique   : true
    },
    encryptedPassword : {
      type : 'string'
    },
    thread : {
      collection : "thread",
      via : "owner"
    }
  },

  beforeCreate : function (values, next) {
    var bcrypt = require("bcryptjs");
    if (!values.password || values.password != values.passwordConfirm) {
      return next({err : "Password doesn't match password confirmation."});
    }

    bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return next(err);
      values.encryptedPassword = hash;
      next();
    });
  }
};

