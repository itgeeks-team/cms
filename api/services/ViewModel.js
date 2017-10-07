// This is the base view model that contains common properties
// This view model is to be inherited by other view models
function ViewModel(controllerName) {
	// Browser tab title
	this.title = "Untitled";

	// Client side JS files to load that are not from dependencies folder
	this.scripts = [];

    // Controller name
	this.controller = controllerName;

    // View name
	this.view = "";

	// Header settings
	this.header = {
		pills: [
			{
				title: "Home",
				controller: "Home",
				active: false,
                children: []
			},
			{
				title: "Forums",
				controller: "Forum",
				active: false,
                children: []
			},
			{
				title: "Works",
				controller: "Work",
				active: false,
				children: [
					{
						title: "New",
                        view: "editor"
					}
				]
			}
		]
	};

	// The response (refer to Response.js) to be sent to client
	this.response = null;

	for (var i = 0; i < this.header.pills.length; i++) {
		if (this.header.pills[i].controller === controllerName) {
			this.header.pills[i].active = true;
		}
	}
};

module.exports = ViewModel;