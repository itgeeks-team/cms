Shared = (function() {
    // "I am {0}. {1} years old".format("John", 20);
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
})();