module.exports = {
    index: function(req, res) {
        var vm = WorkViewModel.new();
        return res.view({ vm });
    },

    saveTemplate: function(req, res) {
        //Work.find({ isTemplate: true }).exec(function(err, templateWorks) {
        //    if (err) {
        //        return res.serverError(err);
        //    }

        //    // If template not found, create new
        //    if (!templateWorks.length) {
        //        var criteria = req.body;
        //        criteria.isTemplate = true;
        //        Work.create(criteria).exec(function(err, newWorks) {
        //            return res.send(req.body);
        //        });
        //    }
        //    // Update existing
        //    else {
        //        Work.update(
        //    }
        //});

        ModelService.findOrCreate(Work, { isTemplate: true }, null, function(err, createdOrFoundRecords, isFound) {
            sails.log.info(isFound);
        });
    },

    saveWork: function(req, res) {
        Work.find({ id: { ">": 0 } }).exec(function(err, work) {
            sails.log.info(work[0]);
        });
    }
};