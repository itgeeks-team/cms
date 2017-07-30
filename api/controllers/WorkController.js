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
        "work"
    ],

    styles: [
        "codemirror/codemirror"
    ]
}

module.exports = {
    index: function(req, res) {
		return res.view(vm);
	}
};