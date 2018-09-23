/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt');
const user = {

  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  options: {
    hooks: {
      beforeCreate: function(instance, options){
        instance.password = bcrypt.hashSync(instance.password, 5);
      },
    },
  },
  associations: function() {
    User.hasMany(Rock, {
      foreignKey: 'creatorId'
    });
  },
  // defaultScope: function(){
  //   return {
  //     attributes: { exclude: ['password'] }
  //   }
  // },
  comparePassword: async function (opts) {
    bcrypt.compareSync(opts.password, this.password);
  },
};


module.exports = user;