// This is the base view model that contains common properties
// This view model is to be inherited by other view models
function BaseViewModel() {
  // Browser tab title
	this.title = "Untitled";

  // Client side JS files to load that are not from dependencies folder
  this.scripts = [];

  // Header settings
  this.header = {
    pills: [
      {
        controller: "Home",
        title: "Home",
        href: "/",
        active : false
      },
      {
        controller: "Thread",
        title: "Forums",
        href: "/forums/all/1",
        active : false
      },
      {
        controller: "Projects",
        title: "Projects",
        href: "/projects",
        active : false
      }
    ],

    hide: false // Indicates whether to hide header or not
  };

  // The response (refer to Response.js) to be sent to client
  this.response = null;
}

/**
 * Set header navigation active state based on current url path
 * baseUrl = http://www.example.com urlPath is the url comes after the baseUrl
 * @param {string} urlPath e.g. /forums pass as req.path will be preferable
 * @return {void}
 **/
BaseViewModel.prototype.setActivePill = function (controller) {
  for (var i = 0; i < this.header.pills.length; i++) {
    this.header.pills[i].active = false; // Reset value for other actions
    if (this.header.pills[i].controller === controller) {
      this.header.pills[i].active = true;
    }
  }
}

module.exports = BaseViewModel;
