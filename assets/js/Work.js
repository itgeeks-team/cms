if (_vm.view === "index") {

}
else if (_vm.view === "editor") {
	// Hide header
	Client.showHeader(false);

	// Init code mirrors
	var htmlCm = CodeMirror($("#work-html")[0], {
		value: _vm.htmlContent,
		mode: "htmlmixed",
	});
	var cssCm = CodeMirror($("#work-css")[0], {
		value: _vm.cssContent,
		mode: "css",
	});
	var jsCm = CodeMirror($("#work-js")[0], {
		value: _vm.jsContent,
		mode: "javascript",
	});
	$.each(_vm.cmSettings, function (key, val) {
		htmlCm.setOption(key, val);
		cssCm.setOption(key, val);
		jsCm.setOption(key, val);
	});

	// Render output based on editors' content
	function run() {
		var outputDoc = $("#work-output").contents()[0];
		outputDoc.open();

		// Insert html
		outputDoc.write(htmlCm.getValue());

		// TODO: Allow user to select script files to load


		// Insert css
		$("<style>").html(cssCm.getValue()).appendTo($(outputDoc).find("head"));

		// Insert javascript
		$("<script>").html(jsCm.getValue()).appendTo($(outputDoc).find("body"));

		outputDoc.close();
	}

	// Tidy up all 3 editors
	function tidy() {
		var beautifiedHtml = html_beautify(htmlCm.getValue(), _vm.tidySettings);
		htmlCm.setValue(beautifiedHtml);

		var beautifiedCss = css_beautify(cssCm.getValue(), _vm.tidySettings);
		cssCm.setValue(beautifiedCss);

		var beautifiedJs = js_beautify(jsCm.getValue(), _vm.tidySettings);
		jsCm.setValue(beautifiedJs);
	}

	// Save this work
	function saveWork(asTemplate) {
		var data = {
			htmlContent: htmlCm.getValue(),
			cssContent: cssCm.getValue(),
			jsContent: jsCm.getValue()
		};

		var url = (asTemplate) ? "/Work/saveTemplate" : "/Work/saveWork";

		$.post(url, data, function (response) {
			Client.showResponse(response);
		});
	}

	// Events
	//
	$("#work-run").click(run);

	$("#work-tidy").click(tidy);

	$("#work-save-template").click(function () {
		Client.confirm(saveWork, true);
	});

	$("#work-save-work").click(function () {
		Client.confirm(saveWork, false);
	});

	// Run
	//
	tidy();
	run();
}