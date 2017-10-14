var vm = ViewModel("Home");

module.exports = {
    // Views
    //
	index: function (req, res) {
		var response = Response(req, res, vm);
		vm.title = "CMS - Home";
		return response.send();
    }
};
