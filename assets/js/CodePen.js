var CodePen = (function () {
    $outputContainer = $(".output-container");

    var fullScreen = function (isFullScreen) {
        if (isFullScreen) {
            $outputContainer.addClass("fullScreen");
        }
        else {
            $outputContainer.removeClass("fullScreen");
        }
    };

    return {
        fullScreen: fullScreen
    };
})();