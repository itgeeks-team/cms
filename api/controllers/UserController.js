/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * 
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var vm = {
    title : "User",
        scripts: [
        
    ]
};
module.exports = {
	'new':function(req,res){
        res.view(vm);
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
    },
    show: function(req,res,next){
        User.findOne(req.param('id'),function foundUser (err,user){
            if(err) return next(err);
            if(!user) return next();
            res.view({
                title:"User Input", 
                user:user
            });    
        });
        
    },
    index: function(req,res,next){
        User.find(function foundUser (err, users){
            if(err) return next(err);
            res.view({
                users:users
            });
        });
    },
    edit : function(req,res,next){
        User.findOne(req.param('id'),function foundUser(err,user){
            if(err) return next(err);
            if(!user) return next();
            res.view({
                user:user
            });
        });
    },
    update: function(req,res,next){
        User.update(req.param('id'),req.params.all(),function userUpdated(err){
            if(err){
                return res.redirect('/user/edit/' + req.param('id'));
            }

            res.redirect('/user/show/' + req.param('id'));
        });
    }
};

