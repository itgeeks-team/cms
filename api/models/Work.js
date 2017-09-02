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
        isTemplate: {
            type: "boolean"
        }
    }
};

