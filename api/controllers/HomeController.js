function HomeViewModel() {
	BaseViewModel.call(this, "Home");
	this.scripts = [
        // We dont have home.js yet
		// "home"
	];
}

module.exports = {
    // View actions
    //
	index: function (req, res) {
		// Init
		var vm = new HomeViewModel();
		vm.title = "CMS - Home";
		return new Response(res).send(vm);
    }


    // AJAX actions
    //
};