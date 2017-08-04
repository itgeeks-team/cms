
//Brian 20170730 - Start
//Jquery Validation predefine for Form (Class="signup")
//Brian 20170730 - End

var validation = (function (){

    var validate = function (form_1){
         $(form_1).validate({

        rules: {
            name:{
                required: true
            },
            email: {
                required: true,
                email:true
            },
            password:{
                minlength:6,
                required:true
            },
            confirmation:{
                minlength:6,
                equalTo:"#password"
            }
        },
        //Brian 20170730 - Start
        //When condition is met, validation message will change to ok.
        //Brian 20170730 - End
        success:function(element){
            element
            .text('OK!').addClass('valid')
        }
    });
    }
    return{
            validate:validate
    }
})();
$(document).ready(function(){
   validation.validate(".signup");
});