// This view model should be used by every view
module.exports = function (activePillTitle) {
	return {
		title: "Untitled",
		scripts: [],
		controller: "",
		view: "",
		activePillTitle: activePillTitle,
		response: null,
		header: {
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
		}
	}
};