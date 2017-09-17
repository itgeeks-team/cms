var vm = new ViewModel("Work");
vm.scripts = [
	"codemirror/codemirror",
	"codemirror/mode/xml",
	"codemirror/mode/css",
	"codemirror/mode/javascript",
	"codemirror/mode/htmlmixed",
	"codemirror/addon/active-line",
	"js-beautify/beautify.min",
	"js-beautify/beautify-css.min",
	"js-beautify/beautify-html.min",
	"work"
];

module.exports = {
    // View actions
    //
	index: function (req, res) {
		var response = new Response(res);
		vm.title = "Works";
		return response.send(vm);
	},

	editor: function (req, res) {
		var response = new Response(res);

		// Init
		vm.title = "New work";
		vm.cmSettings = {
			tabSize: 3,
			indentUnit: 3,
			indentWithTabs: true,
			lineNumbers: true,
			styleActiveLine: true
		};
		vm.tidySettings = {
			indent_size: vm.cmSettings.tabSize
		};

		// Get template
		Work.findOne({ isTemplate: true })
			.then(function (result) {
				// If found, put predefined content
				if (result) {
					vm.htmlContent = result.htmlContent;
					vm.cssContent = result.cssContent;
					vm.jsContent = result.jsContent;
				}
				return response.send(vm);
			})
			.catch(function (err) {
				return response.setErr(err).send(vm);
			});
    },


    // AJAX actions
    //
    // Save template
	saveTemplate: function (req, res) {
		var response = new Response(res);

        // Find criteria
		var findCriteria = { isTemplate: true };

        // Create criteria
        var createCriteria = req.body;
        createCriteria.isTemplate = true;

        // Find all templates
		Work.find(findCriteria)
			.then(function (found) {
                // If not found
				if (!found.length) {
					return [Work.create(createCriteria), false];
				}
				// If found more than one, destroy excess (keep only the first one) and update the first one
				else if (found.length > 1) {
					var destroyCriteria = findCriteria;
					destroyCriteria.id = { "!": found[0].id };
					return [Work.update(found[0], createCriteria), Work.destroy(toDestroy)];
				}
                // Found one, update
				else {
					return [Work.update(found[0], createCriteria), false];
				}
			})
			.spread(function (updated, destroyed) {
                // If nothing is updated
				if (!updated) {
					return response.addError("Error saving template.").send();
				}
				else {
					return response.addSuccess("The template has been saved successfully.").send();
				}
			})
			.catch(function (err) {
				return response.setErr(err).send();
			});
    },

    saveWork: function (req, res) {
        Work.find({ id: { ">": 0 } }).exec(function (err, work) {
            sails.log.info(work[0]);
        });
    }
};