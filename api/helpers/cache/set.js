module.exports = {


  friendlyName: 'Set',


  description: 'Set cache.',


  inputs: {
    key: {
      type: 'string',
      required: true,
    },
    obj: {
      type: 'ref'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.config.cacheman.cache.set(inputs.key, inputs.obj, (err) => {
      if(err){
        return exit.error(err);
      }
      return exits.success();
    });
  }


};

