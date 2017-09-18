var Thread = (function () {
  var elements = {
    threadId : "#threads"
  }

  var switchThreadTab = function () {
    var $this = $(this);
    if (!$this.hasClass("active")) {
      $this.parent(".nav-item").siblings().find(".nav-link").removeClass("active");
      $this.addClass("active");
    }
  }

  var loadThreads = function () {
    if ($(elements.threadId).length > 0) {
      $.ajax({
        type: "GET",
        url: SITE_URL + "/thread/show",
        data: {
          view: "components/thread-summary"
        },
        dataType: "html"
      })
      .always(function () {
        $(elements.threadId + " .loader").remove(); // Close modal-backdrop
      })
      .done(function (res) {
        $(elements.threadId + " .card-block[role='container']").html(res); // Get the partial html render in header
      })
      .fail(function () {
        $(elements.threadId + " .card-block[role='container']").html("Data not found");
      });
    }
  }

  return {
    switchThreadTab : switchThreadTab,
    loadThreads     : loadThreads
  }
})();

$("#threads div.nav-link").on("click", Thread.switchThreadTab);
Thread.loadThreads();
