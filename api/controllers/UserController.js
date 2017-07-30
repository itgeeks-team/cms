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
    
    create: function(req,res,next){
        User.create( req.params.all(), function userCreated(err,User){

            if(err){

                console.log(err);
                req.session.flash={
                    err:err
                }

                return res.redirect('/User/new');

            } 

            res.json(User);
            req.session.flash = {};
        })
    } 
};

