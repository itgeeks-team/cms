// This is the base view model that contains common properties
// This view model is to be inherited by other view models

module.exports = function() {
    this.title = "";

    this.scripts = [];

    this.styles = [];

    this.hideHeader = false;
};