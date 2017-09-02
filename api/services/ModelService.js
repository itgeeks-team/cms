module.exports = {
	findOrCreate: function(model, findCriteria, createCriteria, cb) {
		model.find(findCriteria).exec(function(err, foundModels) {
			// If not found
			if (!foundModels.length) {
				// Create
				model.create(createCriteria).exec(function (err, createdmodels) {
					cb(err, createdmodels, false);
				});
			}
			else {
				cb(err, foundModels, true);
			}
		});
	}
};