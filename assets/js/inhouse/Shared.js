(function (exports) {
	// Extension methods
	//
	/**
	  * String format similar to .NET string.Format()
	  * @example
	  * var str = "http://{0}/{1}";
	  * location.href = str.format("google.com", "blabla");
	  * @returns {string}
	  **/
	if (!String.prototype.format) {
		String.prototype.format = function () {
			var args = arguments;
			return this.replace(/{(\d+)}/g, function (match, number) {
				return typeof args[number] !== "undefined"
					? args[number]
					: match;
			});
		};
	}

	if (!String.prototype.contains) {
		String.prototype.contains = function () {
			for (var i = 0; i < arguments.length; i++) {
				if (this.indexOf(arguments[i]) >= 0) {
					return true;
				}
			}
			return false;
		};
	}

    // Class
    //
	exports = (function () {
		var regexCollection = {
			alphanumeric: /^\w+$/i,
			email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
		};

		return {
			regexCollection: regexCollection
		};
	})();
})(typeof exports !== "undefined" ? module.exports : window.Shared = {});