module.exports = function() {
    var BaseViewModel = require("./BaseViewModel");
    BaseViewModel.call(this);

    this.htmlContent = "";

    this.cssContent = "";

    this.jsContent = "";

    this.cmSettings = {};

    this.tidySettings = {};

    this.setting = {
        scripts = []
    };
}