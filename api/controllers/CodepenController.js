module.exports = {
	index: function (req, res) {
		return res.view({
			title: "Pen Editor"
		});
	}
};