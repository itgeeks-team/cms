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

    var errorMessages = function (container) {
      var contentElements = container + " .popper-content";
      var popoverElements = container + " .popper";
      var errorElements   = container + " .error";
      var inputElements   = container + " input";

      $(contentElements).html("");
      $(popoverElements).popover("dispose");
      $(popoverElements).removeClass("popper");
      $(errorElements).removeClass("error");
      $(inputElements).val("");
    }

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
      errorMessages : errorMessages,
      popover       : popover,
      validation    : validation
    }
})();
