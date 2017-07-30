var Work = (function() {

    // Default settings
    var defaultHtml = "<html>\n\t<head>\n\t</head>\n\t<body>\n\t\tSample HTML\n\t</body>\n</html>";
    var defaultCss = "";
    var defaultJs = "";
    var lineNumbers = true;
    var tabSize = 3;

    // Init code mirror
    var htmlCm = CodeMirror(
        $(".html-editor")[0],
        {
            value: defaultHtml,
            mode: "htmlmixed",
            tabSize: tabSize,
            lineNumbers: lineNumbers
        });

    var cssCm = CodeMirror(
        $(".css-editor")[0],
        {
            value: "function myScript(){return 100;}\n",
            mode: "css",
            tabSize: tabSize,
            lineNumbers: lineNumbers
        });

    var jsCm = CodeMirror(
        $(".js-editor")[0],
        {
            value: "function myScript(){return 100;}\n",
            mode: "javascript",
            tabSize: tabSize,
            lineNumbers: lineNumbers
        });

    // Render output based on the editors' content'
    function renderOutput() {
        var outputDoc = $(".output").contents()[0];
        outputDoc.open();

        // Insert html
        outputDoc.write(htmlCm.getValue());

        // Insert css
        $("<style>").html(cssCm.getValue()).appendTo($(outputDoc).find("head"));

        // Insert javascript
        $("<script>").html(jsCm.getValue()).appendTo($(outputDoc).find("body"));

        outputDoc.close();
    }

    return {
        renderOutput: renderOutput
    };

})();


