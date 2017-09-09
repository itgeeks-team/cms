﻿// This is the base view model that contains common properties
// This view model is to be inherited by other view models

module.exports = function () {
	// Browser tab title
	this.title = "Untitled";

    // Client side JS files to load that are not from dependencies folder
	this.scripts = [];

    // Indicates whether to hide the header or not
	this.hideHeader = false;

    // The response (refer to Response.js) to be sent to client
	this.response = null;
};