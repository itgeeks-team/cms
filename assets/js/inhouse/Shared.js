var SITE_URL    = location.protocol + "//" + location.host;
Shared = (function() {
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] !== "undefined"
                    ? args[number]
                    : match;
            });
        };
    }

    /**
     * Clear the error display and message for our site
     * @example Shared.clearError("#login");
     * @param {string} selector of the container that has validation
     * @returns {void}
     **/
    var clearError = function (container) {
      var contentElements = container + " .popper-content"; // popover content comes from here
      var popoverElements = container + " .popper"; // element that will trigger the popover ui
      var errorElements   = container + " .error"; // error decoration
      var inputElements   = container + " input"; // get all input fields

      $(contentElements).html("");
      $(popoverElements).popover("dispose");
      $(popoverElements).removeClass("popper");
      $(errorElements).removeClass("error");
      $(inputElements).val("");
    }

    /**
     * Initialize bootstrap 4 popover based on container
     * @example Shared.popover("#login");
     * @param {string} selector of the container that has validation
     * @returns {void}
     **/
    var popover = function (popoverContainer) {
      $(popoverContainer + " .popper").popover({
        "container": "body",
        "html": true,
        "animation": false,
        "content": function () {
          return $(this).next(".popper-content").html();
        }
      });
    }

    /**
     * Initialize bootstrap 4 popover based on container
     * @example Shared.validation("#login form", loginRules);
     * @param {string} selector of the form container that need to validate
     * @param {object} validate rules object
     * @returns {void}
     **/
    var validation = function (form, validateRules) {
      if ($("body .modal-backdrop").length > 1) {
        $("body .modal-backdrop").not(":first").remove();
      }
      popover(form);
      $(form).validate({
        rules       : validateRules,
        focusInvalid: false,
        unhighlight : function (element, errorClass, validClass) {
          $(element).removeClass(errorClass).addClass(validClass).next().html("");
          $(element).popover("dispose");
        },
        errorPlacement: function (error, element) {
          $(element).addClass("popper").next().html($(error).text());
          popover(form);
        },
        success:function(element) { }
      });
    }

    return {
      clearError : clearError,
      popover    : popover,
      validation : validation
    }
})();
