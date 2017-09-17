var vm = new ViewModel("Home");

module.exports = {
    // View actions
    //
	index: function (req, res) {
		// Init
		vm.title = "CMS - Home";
		return new Response(res).send(vm);
    }


    // AJAX actions
    //
};