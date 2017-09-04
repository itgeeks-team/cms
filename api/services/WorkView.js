// Private
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

// Public
//
var WorkView = {};
WorkView.index = function (res) {
	// Init
	var vm = new WorkViewModel();
	vm.title = "Work - New";
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

	// Get template
	var response = new Response();
	Work.findOne({ isTemplate: true })
		.then(function (result) {
			// If not found
			if (!result) {
				response.addError("Template not found.");
			}
			else {
				vm.htmlContent = result.htmlContent;
				vm.cssContent = result.cssContent;
				vm.jsContent = result.jsContent;
			}
			return res.view({ vm });
		})
		.catch(function (err) {
			response.addFatal(err);
			return res.view({ vm });
		});
};

// Exports
//
module.exports = WorkView;