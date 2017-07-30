/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * 
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function(req,res){
        res.view();
     },

    //Brian 20170730 - Start
    //To create new User with parameter
    //Brian - End
    create: function(req,res,next){
        User.create( req.params.all(), function userCreated(err,user){

            if(err){

                console.log(err);
                //Brian 20170730 - Start
                //If encounter error, store Error Message into Session Flash
                //Brian - End
                req.session.flash={
                    err:err
                }

                return res.redirect('/User/new');

            } 
            //Brian 20170730 - Start
            //If no error, return Json Object to Client Browswer
            // & Empty Session Flash.
            //Brian - End
            res.json(user);
            req.session.flash = {};
        })
    } 
};

