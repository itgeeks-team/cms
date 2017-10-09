module.exports = function(req, res, vm) {
	return {
		// An item is an object of { type, content }
		// where type is either "success", "info", "warning", or "error"
		// and content is any type to be sent to client
		items: [],

		// To hold caught "err" object
		err: null,

		// Send response to client
		send: function () {
			if (vm) {
				vm.response = this;
				vm.controller = req.options.controller;
				vm.view = req.options.action;
				return res.view({ vm });
			}
			else {
				return res.send(this);
			}
		},

		// Send err to client
		sendErr: function (err) {
			this.err = err;
			return this.send();
		},

		addSuccess: function (content) {
			this.items.push({ type: "success", content: content });
			return this;
		},

		addInfo: function (content) {
			this.items.push({ type: "info", content: content });
			return this;
		},

		addWarning: function (content) {
			this.items.push({ type: "warning", content: content });
			return this;
		},

		addError: function (content) {
			this.items.push({ type: "error", content: content });
			return this;
		}
	};
}