/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  //Brian 20170730 - Start
  //Schema set to True: Map defined attribute to DB.
  //Brian 20170730 - End
  schema:true,

  attributes: {
    name:{
      type:'string',
      required:true
    },
    title:{
      type:'string'
    },
    email:{
      type:'string',
      email:true,
      required:true,
      unique:true
    },
    encryptedPassword:{
      type:'string'
    }
    ,
    //Brian 20170730 - Start
    //This method is to delete object which is returned to the client.
    //By default, if without toJson method and schema: true. 
    //Client can use /user/create?.... to create anything they want.
    //To see different, comment toJson method and schema: true
    //and proceed with localhost:1337/User/new
    //Brian 20170730 - End
    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
  }
};

