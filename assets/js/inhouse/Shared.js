(function (exports, isServer) {
	// Extension methods
	//
	/**
	  * String format similar to .NET
	  *
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

	exports = (function () {
        
	})();
})(typeof exports !== "undefined" ? module.exports : window.Shared = {});