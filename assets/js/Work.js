var Work = (function() {

    // Default settings
    var defaultHtml = "<html><head></head><body><p>Sample HTML</p><input class=\"btn\" type=\"button\" value=\"Click Me\" /></body></html>";
    var defaultCss = "p {background-color: teal;}";
    var defaultJs = "$(\".btn\").click(function() {alert(\"Hello!\");});";
    var sharedSettings = {
        tabSize: 3,
        indentUnit: 3,
        indentWithTabs: true,
        lineNumbers: true,
        styleActiveLine: true
    };

    // Init code mirrors
    var htmlCm = CodeMirror($(".work-html")[0], {
        value: defaultHtml,
        mode: "htmlmixed",
    });
    var cssCm = CodeMirror($(".work-css")[0], {
        value: defaultCss,
        mode: "css",
    });
    var jsCm = CodeMirror($(".work-js")[0], {
        value: defaultJs,
        mode: "javascript",
    });
    $.each(sharedSettings, function(key, val) {
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
        // js-beautify settings
        var settings = {
            indent_size: sharedSettings.tabSize
        };

        var beautifiedHtml = html_beautify(htmlCm.getValue(), settings);
        htmlCm.setValue(beautifiedHtml);

        var beautifiedCss = css_beautify(cssCm.getValue(), settings);
        cssCm.setValue(beautifiedCss);

        var beautifiedJs = js_beautify(jsCm.getValue(), settings);
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
//Work.tidy();
//Work.run();