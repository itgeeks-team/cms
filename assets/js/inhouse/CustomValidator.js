
//Brian 20170730 - Start
//Jquery Validation predefine for Form (Class="signup")
//Brian 20170730 - End

var Validator = (function (){
  var regexCollections = {
    alphanumeric: /^\w+$/i,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
  };
  var signUpRules = {
    "display-name": {
      required: true
    },
    "username":{
      required: true
    },
    "email": {
      required: true,
      email:true
    },
    "password":{
      minlength : 6,
      required  : true,
      equalTo   : "#password-confirm"
    },
    "password-confirm":{
      minlength : 6,
      required  : true,
      equalTo   : "#password"
    }
  };
  var loginRules = {
    "username-or-email": {
      minlength: 6,
      required: true,
      usernameOrEmail: true
    },
    "password": {
      minlength:6,
      required:true
    }
  };

  /**
  * Return true if the field value matches the given format RegExp
  *
  * @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
  * @result true
  *
  * @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
  * @result false
  *
  * @name $.validator.methods.pattern
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
  $.validator.addMethod( "pattern", function( value, element, param ) {
    if ( this.optional( element ) ) {
      return true;
    }
    if ( typeof param === "string" ) {
      param = new RegExp( "^(?:" + param + ")$" );
    }
    return param.test( value );
  }, "Invalid format." );

  $.validator.addMethod("usernameOrEmail", function (value, element) {
    if ( this.optional( element ) ) {
      return true;
    }
    if (regexCollections.alphanumeric.test( value ) || regexCollections.email.test( value )) {
      return true
    }
  }, "Please enter a valid username/email.");

  return {
    signUpRules : signUpRules,
    loginRules  : loginRules,
    regexCollections : regexCollections
  }
})();
