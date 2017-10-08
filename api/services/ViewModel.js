// This is the base view model that contains common properties
// This view model is to be inherited by other view models
function ViewModel(activePillTitle) {

	this.title = "Untitled";
	this.scripts = [];
	this.controller = "";
	this.view = "";
	this.activePillTitle = activePillTitle;
	this.header = {
		pills: [
			{
				title: "Home",
				url: "/Home",
                children: []
			},
			{
				title: "Forums",
				url: "/Forum",
                children: []
			},
			{
				title: "Works",
				url: "/Work",
				children: [
					{
						title: "New",
                        url: "/Work/editor"
					}
				]
			},
			{
				title: "Others",
                url: "",
				children: [
					{
						title: "Public Holidays",
						url: "https://publicholidays.com.my/"
					}
				]
			}
		]
	};

	// The response (refer to Response.js) to be sent to client
	this.response = null;
};

module.exports = ViewModel;