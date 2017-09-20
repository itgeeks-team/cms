// Init
var vm = new BaseViewModel();

module.exports = {
    // View actions
    //
	index: function (req, res) {
    vm.title = "CMS - Home";
    vm.setActivePill("Home");
		return new Response(res).send(vm);
  }


    // AJAX actions
    //
};
