window.SITE_URL = location.protocol + "//" + location.host;

// Get server data
//
if ($("#hdn-vm").length) {
	window._vm = JSON.parse($("#hdn-vm").val());
}
window._csrf = $("#hdn-csrf").val();
$("#hdn-vm, #hdn-csrf").remove();

// Static methods
//
window.Client = (function () {
    /**
     * Clear the error display and message for our site
     * @example Client.clearError("#login");
     * @param {string} selector of the container that has validation
     * @returns {void}
     **/
	var clearError = function (container) {
		var contentElements = container + " .popper-content"; // popover content comes from here
		var popoverElements = container + " .popper"; // element that will trigger the popover ui
		var errorElements = container + " .error"; // error decoration
		var inputElements = container + " input"; // get all input fields

		$(contentElements).html("");
		$(popoverElements).popover("dispose");
		$(popoverElements).removeClass("popper");
		$(errorElements).removeClass("error");
		$(inputElements).val("");
	};

    /**
     * Initialize bootstrap 4 popover based on container
     * @example Client.popover("#login");
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
	};

    /**
     * Initialize bootstrap 4 popover based on container
     * @example Client.validation("#login form", loginRules);
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
			rules: validateRules,
			focusInvalid: false,
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass(errorClass).addClass(validClass).next().html("");
				$(element).popover("dispose");
			},
			errorPlacement: function (error, element) {
				$(element).addClass("popper").next().html($(error).text());
				popover(form);
			},
			success: function (element) { }
		});
	};

    /**
     * Prompt user's confirmation before calling a specified callback.
     * Indefinite parameters can be passed to this function that
     * will eventually be passed to the said callback.
     *
     * @example
     * var doSomething = function(param1, param2) {
     *    if (param1) {
     *        if (param2) {
     *        }
     *    }
     * };
     * $("#btn-save-work").click(function() {
     *     Client.confirm(doSomething, true, false);
     * });
     *
     * @param {function} the callback to call if the user confirms to proceed
     * @param {variadic} variable number of arguments to be passed into the callback
     * @returns {void}
     **/
	function confirm(cb) {
		if (window.confirm("Are you sure to proceed?")) {
			var args = Array.prototype.slice.call(arguments, 1);
			cb.apply(this, args);
		}
	};

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
	};

	return {
		clearError: clearError,
		popover: popover,
		validation: validation,
		confirm: confirm,
		showResponse: showResponse
	};
})();

// Events
//
// Make all form submission to append csrf token automatically
$("form").submit(function (e) {
	$(this).append("<input type='hidden' name='_csrf' value='{0}' />".format(_csrf));
	return true;
});

// Ajax setup
//
$.ajaxSetup({
	// Append csrf to send data before sending
	beforeSend: function (jqXHR, settings) {
		settings.data += "&_csrf={0}".format(window._csrf);
		return true;
	}
});