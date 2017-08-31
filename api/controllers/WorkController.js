// scripts:     List of js files to load that is relevant to this module
// styles:      List of css files to load that is relevant to this module
// title:       title of the window tab

var vm = {
    title: "Work",

    scripts: [
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
    ]
};

module.exports = {
    work: function(req, res) {
		return res.view(vm);
	}
};