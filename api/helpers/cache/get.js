module.exports = {


  friendlyName: 'Get',


  description: 'Get cache.',


  inputs: {
    key: {
      type: 'string',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.config.cacheman.cache.get(inputs.key, (err, value) => {
      if(err){
        exits.error(err);
      }
      return exits.success(value);
    });
  }


};

