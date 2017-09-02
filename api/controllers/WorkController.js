module.exports = {
    index: function(req, res) {
        var vm = WorkViewModel.getDefault();
        return res.view({ vm });
    },

    save: function(req, res) {
        sails.log.info(req.url);
        return res.send(200);
    }
};