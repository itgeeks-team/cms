module.exports = {
  schema: true,

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    scripts: {
      type: 'array'
    },
    styles: {
      type: 'array'
    }
    //date: {
    //    type: 'datetime'
    //}
  }
};

