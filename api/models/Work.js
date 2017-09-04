// This model represents individual work that belongs to a user

module.exports = {
    schema: true,

    attributes: {
        htmlContent: {
            type: 'string'
        },
        cssContent: {
            type: 'string'
        },
        jsContent: {
            type: 'string'
        },
        scriptChoices: {
            type: 'json'
		},

        // A template contains the default content and settings when a user creates a new work.
        // There is only 1 template in this model.
        isTemplate: {
            type: "boolean"
        }
    }
};

