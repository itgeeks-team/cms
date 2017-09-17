/**
 * @reference  https://stackoverflow.com/questions/15192722/javascript-extending-class
 **/
var BaseViewModel = require("./BaseViewModel");
function WorkViewModel() {
  BaseViewModel.call(this);
  this.title = "Work - New";
  this.scripts = [
    "codemirror/codemirror",
    "codemirror/mode/xml",
    "codemirror/mode/css",
    "codemirror/mode/javascript",
    "codemirror/mode/htmlmixed",
    "codemirror/addon/active-line",
    "js-beautify/beautify.min",
    "js-beautify/beautify-css.min",
    "js-beautify/beautify-html.min",
    "work"
  ];
  this.header.hide = true;
  this.htmlContent = "";
  this.cssContent  = "";
  this.jsContent   = "";
  this.cmSettings  = {
    tabSize: 3,
    indentUnit: 3,
    indentWithTabs: true,
    lineNumbers: true,
    styleActiveLine: true
  };
  this.tidySettings = {
    indent_size: this.cmSettings.tabSize
  };
}

WorkViewModel.prototype = Object.create(BaseViewModel.prototype);

WorkViewModel.prototype.constructor = WorkViewModel;

module.exports = WorkViewModel;
