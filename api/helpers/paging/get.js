module.exports = {


  friendlyName: 'Get',


  description: 'Get paging.',


  inputs: {
    page: {
      type: 'number',
      required: true,
    },
    pageSize: {
      type: 'number',
      required: true,
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const offset = (inputs.page - 1) * inputs.pageSize;
    const limit = inputs.pageSize;
    return exits.success({offset, limit});
  }


};

