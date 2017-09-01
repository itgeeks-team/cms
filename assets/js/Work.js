var Work = (function() {
    // Init code mirrors
    var htmlCm = CodeMirror($(".work-html")[0], {
        value: vm.htmlContent,
        mode: "htmlmixed",
    });
    var cssCm = CodeMirror($(".work-css")[0], {
        value: vm.cssContent,
        mode: "css",
    });
    var jsCm = CodeMirror($(".work-js")[0], {
        value: vm.jsContent,
        mode: "javascript",
    });
    $.each(vm.cmSettings, function(key, val) {
        htmlCm.setOption(key, val);
        cssCm.setOption(key, val);
        jsCm.setOption(key, val);
    });

    // Render output based on editors' content
    function run() {
        var outputDoc = $(".work-output").contents()[0];
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
    var tidy = function() {
        var beautifiedHtml = html_beautify(htmlCm.getValue(), vm.tidySettings);
        htmlCm.setValue(beautifiedHtml);

        var beautifiedCss = css_beautify(cssCm.getValue(), vm.tidySettings);
        cssCm.setValue(beautifiedCss);

        var beautifiedJs = js_beautify(jsCm.getValue(), vm.tidySettings);
        jsCm.setValue(beautifiedJs);
    }

    return {
        htmlCm: htmlCm,
        cssCm: cssCm,
        jsCm: jsCm,
        run: run,
        tidy: tidy
    };

})();

// Event handlers
$(".work-menu-run").click(Work.run);
$(".work-menu-tidy").click(Work.tidy);

// Run
Work.tidy();
Work.run();