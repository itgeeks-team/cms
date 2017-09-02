window.Work = (function() {
    // Init code mirrors
    var htmlCm = CodeMirror($(".work-html")[0], {
        value: _vm.htmlContent,
        mode: "htmlmixed",
    });
    var cssCm = CodeMirror($(".work-css")[0], {
        value: _vm.cssContent,
        mode: "css",
    });
    var jsCm = CodeMirror($(".work-js")[0], {
        value: _vm.jsContent,
        mode: "javascript",
    });
    $.each(_vm.cmSettings, function(key, val) {
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
    function tidy() {
        var beautifiedHtml = html_beautify(htmlCm.getValue(), _vm.tidySettings);
        htmlCm.setValue(beautifiedHtml);

        var beautifiedCss = css_beautify(cssCm.getValue(), _vm.tidySettings);
        cssCm.setValue(beautifiedCss);

        var beautifiedJs = js_beautify(jsCm.getValue(), _vm.tidySettings);
        jsCm.setValue(beautifiedJs);
    }

    // Save this work
    function saveWork() {
        var data = {
            htmlContent: htmlCm.getValue(),
            cssContent: cssCm.getValue(),
            jsContent: jsCm.getValue()
        };
        $.post("work/save", { data: "HIIII" }, function(res) {
            console.log(res);
        });
    }

    return {
        run: run,
        tidy: tidy,
        saveWork: saveWork
    };

})();

// Events
//
$(".work-menu-run").click(Work.run);
$(".work-menu-tidy").click(Work.tidy);
$(".work-settings-modal-save-work").click(function() {
    Shared.confirm(Work.saveWork);
});

// Run
//
Work.tidy();
Work.run();