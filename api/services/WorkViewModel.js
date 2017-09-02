var BaseViewModel = require("./BaseViewModel");

// Classes
//
function ScriptChoice(scriptName = "", scriptPath = "", selected = false) {
    this.scriptName = scriptName;
    this.scriptPath = scriptPath;
    this.selected = selected;
}

function WorkViewModel() {
    BaseViewModel.call(this);

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

    this.hideHeader = true;

    this.htmlContent = "";

    this.cssContent = "";

    this.jsContent = "";

    this.cmSettings = {};

    this.tidySettings = {};

    this.settings = {
        scriptChoices: []
    };
}

// Static methods
//
WorkViewModel.new = function() {
    var vm = new WorkViewModel();

    // Get 

    vm.title = "Work - New";

    vm.htmlContent = 
        "<html>" +
        "<head></head>" +
        "<body>" +
        "<p>Sample HTML</p>\n" +
        "<input class=\"btn\" type=\"button\" value=\"Click Me\" />\n" +
        "</body >" +
        "</html>";

    vm.cssContent = "p {background-color: cyan;}";

    vm.jsContent = "$('.btn').click(function() {alert(\"He\\l\t'l''o!\");});";

    vm.cmSettings = {
        tabSize: 3,
        indentUnit: 3,
        indentWithTabs: true,
        lineNumbers: true,
        styleActiveLine: true
    };

    vm.tidySettings = {
        indent_size: vm.cmSettings.tabSize
    };
    
    var scJquery = new ScriptChoice(
      "jQuery 3.2.1",
      "dependencies/jquery-3.2.1.min.js");
    
    vm.settings.scriptChoices.push(scJquery);

    return vm;
};

// Exports
//
module.exports = WorkViewModel;