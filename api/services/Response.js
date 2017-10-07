function Response(req, res) {
	// An item is an object of { type, content }
	// Where type is the type of content, either "success", "info", "warning", or "error"
	// Where content is of any type that is to be sent to the client
	// This array of items shall be sent back to the client as a response
	this.items = [];

	// err shall hold the "err" object caught during queries
	this.err = null;

	// Do not store res object in order to avoid circular reference
	// error when calling this.res.send(this)
	this.send = function (vm) {
		if (vm) {
			vm.response = this;
			vm.view = req.options.action;
			return res.view({ vm });
		}
		else {
			return res.send(this);
		}
	};
}

Response.prototype.addSuccess = function (content) {
	this.items.push({ type: "success", content: content });
	return this;
};
Response.prototype.addInfo = function (content) {
	this.items.push({ type: "info", content: content });
	return this;
};
Response.prototype.addWarning = function (content) {
	this.items.push({ type: "warning", content: content });
	return this;
};
Response.prototype.addError = function (content) {
	this.items.push({ type: "error", content: content });
	return this;
};
Response.prototype.setErr = function (err) {
	// TODO: Save the error to a log, dont show the technical error message to the client
	this.err = err;
	return this;
};


// Exports
//
module.exports = Response;
