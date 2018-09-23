/**
 * Images.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const images = {

  attributes: {
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    bucket: {
      type: Sequelize.STRING,
      required: true,
    }
  },
  options: {
    getterMethods: {
      url(){
        return `https://${this.bucket}.s3.amazonaws.com/${this.name}`;
      }
    }
  },

};

module.exports = images;