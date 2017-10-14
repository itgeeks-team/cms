var vm = ViewModel("Works");
vm.scripts = [
	"vendor/codemirror/codemirror",
	"vendor/codemirror/mode/xml",
	"vendor/codemirror/mode/css",
	"vendor/codemirror/mode/javascript",
	"vendor/codemirror/mode/htmlmixed",
	"vendor/codemirror/addon/active-line",
	"vendor/js-beautify/beautify.min",
	"vendor/js-beautify/beautify-css.min",
	"vendor/js-beautify/beautify-html.min",
	"views/work"
];

module.exports = {
    // Views
    //
	index: function (req, res) {
		var response = Response(req, res, vm);
		vm.title = "Works";
		return response.send();
	},

	editor: function (req, res) {
		var response = Response(req, res, vm);
		vm.title = "Work - New";
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
					vm.cssContent  = result.cssContent;
					vm.jsContent   = result.jsContent;
                }
				return response.send();
			})
			.catch(function (err) {
				return response.sendErr(err);
			});
    },


    // AJAX
    //
    // Save template
	saveTemplate: function (req, res) {
		var response = Response(req, res);

        // Create criteria
		var create = req.body;
        create.isTemplate = true;

        // Find all templates
		Work.find({ isTemplate: true })
			.then(function (found) {
                // If not found
				if (!found.length) {
					return [Work.create(create), false];
				}
				// If found more than one, destroy excess (keep only the first one) and update the first one
				else if (found.length > 1) {
					var destroyCriteria = find;
					destroyCriteria.id = { "!": found[0].id };
					return [Work.update(found[0], create), Work.destroy(destroyCriteria)];
				}
                // Found one, update
				else {
					return [Work.update(found[0], create), false];
				}
			})
			.spread(function (updated, destroyed) {
			    return response.addSuccess("The template has been saved successfully.").send();
			})
			.catch(function (err) {
				return response.sendErr(err);
			});
    },

    saveWork: function (req, res) {
        Work.find({ id: { ">": 0 } }).exec(function (err, work) {
            sails.log.info(work[0]);
        });
    }
};
