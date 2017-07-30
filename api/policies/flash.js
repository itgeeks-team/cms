
//Brian 20170730 - Start
//Flash Message https://www.npmjs.com/package/sails-hook-flash
//This method is to store Session Flash Message to Local Flash
//Reason: display Flash Message on pages that redirected to.
//Brian 20170730 - End 
module.exports = function(req,res,next){
    res.locals.flash={};
    //To check if session contain Flash Message.
    if(!req.session.flash) return next();
    //If Yes, copy Session Flash Message to Local
    res.locals.flash = _.clone(req.session.flash);

    //Empty Session Flash
    req.session.flash = {};
    
    next();
};