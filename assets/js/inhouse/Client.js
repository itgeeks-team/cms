// Global variables
//
window._vm = JSON.parse($("#hdn-vm").val());
window._csrf = $("#hdn-csrf").val();
$("#hdn-vm, #hdn-csrf").remove();



// Validator methods
//
/**
  * Return true if the field value matches the given format RegExp
  * @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
  * @result true
  * @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
  * @result false
  * @name $.validator.methods.pattern
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
$.validator.addMethod("pattern", function (value, element, param) {
	if (this.optional(element)) {
		return true;
	}
	if (typeof param === "string") {
		param = new RegExp("^(?:" + param + ")$");
	}
	return param.test(value);
}, "Invalid format.");

$.validator.addMethod("usernameOrEmail", function (value, element) {
	if (this.optional(element)) {
		return true;
	}
	if (Shared.regexCollection.alphanumeric.test(value) || Shared.regexCollection.email.test(value)) {
		return true;
	}
}, "Please enter a valid username/email.");



// jQuery methods
//
$.fn.extend({
    /**
    * Shortcut to .popover("show")
    * @example $("#my-textbox").popoverShow("Popover message", "top");
    */
	popoverShow: function (html = null, placement = "right") {
		if (html) {
			this.popover({
				animation: false,
				html: true,
                container: "body",
				trigger: "manual",
				placement: placement
			});
			this.attr("data-content", html);
			this.data("bs.popover").setContent();
		}
		else {
			this.popover({
				placement: placement
			});
		}
		return this.popover("show");
	},

    /**
     * Reset form fields and remove validation
     * @example $("#my-form").resetForm();
     **/
	resetForm: function() {
		this.each(function () {
			if (this.tagName === "FORM") {
				this.reset();
				$(this).find("input")
					.removeClass("error")
					.removeClass("valid")
					.popover("dispose");
			}
		});
	},

    /**
     * Validate form
     * @example $("#my-form").validateForm(rules, messages);
     * @param jQueryValidation rules
     * @param jQueryValidation messages
     **/
	validateForm: function (rules, messages) {
		this.each(function () {
			if (this.tagName === "FORM") {
				$(this).validate({
					rules: rules,
					messages: messages,
					focusInvalid: false,
					highlight: function (element, errorClass, validClass) {
						$(element)
							.removeClass(validClass)
							.addClass(errorClass);
					},
					unhighlight: function (element, errorClass, validClass) {
						$(element)
							.removeClass(errorClass)
							.addClass(validClass)
							.popover("dispose");
					},
					errorPlacement: function (error, element) {
						element.popoverShow(error.text());
					}
				});
			}
		});
	},

    /**
     * Post form data through AJAX
     * @example
     * $("#my-form").ajaxForm("/controller/action", function(response) {
     *    // Handle response
     * });
     * @param url
     * @param callback
     **/
	ajaxForm: function (url, cb) {
		this.each(function () {
			if (this.tagName === "FORM") {
				$.post(url, $(this).serialize(), cb);
			}
		});
	}
});



// Client methods
//
window.Client = {

    /**
     * Prompt confirm() before calling a function.
     * Indefinite parameters can be passed to the callback.
     * @example
     * function myFunction(param1, param2) {
     *    if (param1) {
     *        if (param2) { }
     *    }
     * };
     * $("#my-button").click(function() {
     *     Client.confirm(myFunction, true, false);
     * });
     * @param callback
     * @param variadic arguments of the callback
     **/
	confirm: function(cb) {
		if (window.confirm("Are you sure to proceed?")) {
			var args = Array.prototype.slice.call(arguments, 1);
			cb.apply(window, args);
		}
	},

	// TODO: Change this method to show the response using bootstrap brand instead of using alert.
	showResponse: function(response) {
		console.log(response);

		if (response.err) {
			if (response.err.raw) {
				alert("(err) {0}".format(response.err.raw));
			}
			else {
				alert("An unexpected error has occured.");
			}
		}
		else {
			var itemsToShow = Enumerable.from(response.items)
				.select(function (x) { return "({0}) {1}".format(x.type, x.content) })
				.toArray();
			alert(itemsToShow.join("\n"));
		}
	},

	showHeader: function(show) {
		$("#header").toggle(show);
	}
};



// Events
//
// Make all form submission to append csrf token automatically
$("form").submit(function (e) {
	if (!$(this).find("input[name='_csrf']").length) {
		$(this).append("<input type='hidden' name='_csrf' value='{0}' />".format(_csrf));
	}
	return true;
});



// Ajax setup
//
$.ajaxSetup({
	// Append csrf to data before sending
	beforeSend: function (jqXHR, settings) {
		if (typeof settings.data !== "undefined" && !settings.data.contains("_csrf=")) {
			settings.data += "&_csrf={0}".format(window._csrf);
		}
		return true;
	}
});



// Replace all svg <img> with <svg> (Reason: can change svg fill color anytime)
//
$("img[src$='.svg'").each(function () {
	var $img = $(this);
	var imgId = $img.attr("id");
	var imgClass = $img.attr("class");

	$.get($img.attr("src"), function (data) {
		var $svg = $(data).find("svg");

		if (typeof imgId !== "undefined") {
			$svg = $svg.attr("id", imgId);
		}
		if (typeof imgClass !== "undefined") {
			$svg = $svg.attr("class", imgClass);
		}

		$img.replaceWith($svg);

	}, "xml");
});
