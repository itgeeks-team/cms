var vm = new ViewModel("Home");

module.exports = {
    // Views
    //
	index: function (req, res) {
		var response = new Response(req, res);
		vm.title = "CMS - Home";
		return response.send(vm);
    }


    // AJAX
    //
};
