window.SITE_URL = location.protocol + "//" + location.host;



// Get server data
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
	if (Shared.regexCollections.alphanumeric.test(value) || Shared.regexCollections.email.test(value)) {
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
     * @param jQuery Validation rules
     * @param jQuery Validation messages
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
					},
					success: function (element) { }
				});
			}
		});
	},

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
window.Client = (function () {

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
	function confirm(cb) {
		if (window.confirm("Are you sure to proceed?")) {
			var args = Array.prototype.slice.call(arguments, 1);
			cb.apply(window, args);
		}
	}

	// TODO: Change this method to show the response using bootstrap brand instead of using alert.
	function showResponse(response) {
		console.log(response);

		if (response.err) {
			alert("Response:\n(err) {0}".format(response.err));
		}
		else {
			var itemsToShow = Enumerable.from(response.items)
				.select(function (x) { return "({0}) {1}".format(x.type, x.content) })
				.toArray();
			alert("Response:\n{0}".format(itemsToShow.join("\n")));
		}
	}

	function showHeader(show) {
		$("#header").toggle(show);
	}

	return {
		confirm: confirm,
		showResponse: showResponse,
		showHeader: showHeader
	};
})();



// Hotkeys
//



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
	// Append csrf to send data before sending
	beforeSend: function (jqXHR, settings) {
		if (typeof settings.data !== "undefined" && !settings.data.contains("_csrf=")) {
			settings.data += "&_csrf={0}".format(window._csrf);
		}
		return true;
	}
});



// Replace svg <img> with <svg>
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