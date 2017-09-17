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
        urlPath: "/",
        title: "Home",
        active : false
      },
      {
        urlPath: "/forums",
        title: "Forums",
        active : false
      },
      {
        urlPath: "/projects",
        title: "Projects",
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
BaseViewModel.prototype.setActivePill = function (urlPath) {
  for (var i = 0; i < this.header.pills.length; i++) {
    this.header.pills[i].active = false; // Reset value for other actions
    if (this.header.pills[i].urlPath === urlPath) {
      this.header.pills[i].active = true;
    }
  }
}

/**
 * Set title for page
 * @param {string} title title for the page
 * @return {void}
 **/
BaseViewModel.prototype.setTitle = function (title) {
  this.title = title;
}

/**
 * Set scripts that needed for page
 * @param {array} title array of javascripts
 * @return {void}
 **/
BaseViewModel.prototype.setScripts = function (scripts) {
  this.scripts = scripts;
}

/**
 * hide or show header
 * @param {boolean} hide show or hide
 * @return {void}
 **/
BaseViewModel.prototype.hideHeader = function (hide) {
  this.header.hide = hide;
}

/**
 * controller response
 * @param {object} hide response to client
 * @return {void}
 **/
BaseViewModel.prototype.setResponse = function (response) {
  this.response = response;
}

module.exports = BaseViewModel;
