var WorkViewModel = require("../viewmodels/WorkViewModel");

// Business Logic
function initVm() {
    var vm = new WorkViewModel();

    vm.title = "Work";

    vm.scripts = [
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

    vm.hideHeader = true;

    vm.htmlContent =
        "<html>" +
        "<head></head>" +
        "<body>" +
        "<p>Sample HTML</p>\\n" +
        '<input class=\\"btn\\" type=\\"button\\" value=\\"Click Me\\" />\\n' +
        "</body >" +
        "</html>";

    vm.cssContent = "p {background-color: cyan;}";

    vm.jsContent = '$(\\".btn\\").click(function() {alert(\\"Hello!\\");});';

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

    return vm;
}

module.exports = {
    index: function(req, res) {
        var vm = initVm();
        return res.view({ vm });
    }
};