// This is the base view model that contains common properties
// This view model is to be inherited by other view models

module.exports = function (controllerName) {
	// Browser tab title
	this.title = "Untitled";

    // Client side JS files to load that are not from dependencies folder
	this.scripts = [];

    // Header settings
	this.header = {
		pills: [
			{
				controller: "Home",
				action: "",
				title: "Home"
			},
			{
				controller: "Forum",
				action: "",
				title: "Forums"
			},
			{
				controller: "Work",
				action: "",
				title: "Projects"
			}
		],

		hide: false // Indicates whether to hide header or not
	};

    // The response (refer to Response.js) to be sent to client
	this.response = null;

	for (var i = 0; i < this.header.pills.length; i++) {
		if (this.header.pills[i].controller === controllerName) {
			this.header.pills[i].active = true;
		}
	}
};