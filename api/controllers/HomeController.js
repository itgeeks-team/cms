var vm = ViewModel("Home");

module.exports = {
    // Views
    //
	index: function (req, res) {
		var response = Response(req, res, vm);
		vm.title = "CMS - Home";
		return response.send();
    }
<<<<<<< HEAD


    // AJAX
    //
};
=======
};
>>>>>>> db64e587d82dd1a6bb7f9b3b89f259ee43bbccf8
