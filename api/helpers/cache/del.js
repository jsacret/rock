module.exports = {


  friendlyName: 'Delete',


  description: 'Delete cache.',


  inputs: {
    key: {
      type: 'string',
      required: true,
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.config.cacheman.cache.del(key, (err) => {
      if(err){
        return exits.error(err);
      }
      return exits.success();
    });
  }


};

