const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Create Token',


  description: 'Create a new token.',


  inputs: {
    user: {
      type: 'ref',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const user = _.omit(inputs.user, ['password', 'token']);
    const token = jwt.sign({user}, sails.config.jwtSettings.secret, {
      algorithm: sails.config.jwtSettings.algorithm,
      expiresIn: sails.config.jwtSettings.expiresInMinutes,
      issuer: sails.config.jwtSettings.issuer,
      audience: sails.config.jwtSettings.audience,
    });
    return exits.success(token);

  }


};

