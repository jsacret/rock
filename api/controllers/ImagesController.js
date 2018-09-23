/**
 * ImagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const aws = require('aws-sdk');
const fs = require('fs');
const uuid = require('uuid/v1');

module.exports = {
  find: (req, res) =>{
    res.send('test');
  },
  
  create: function(req, res) {
    req.file('image').upload({
      maxBytes: 3000000
    }, async (err, file) => {
      if(err){
        return res.serverError(err);
      }
      try{
        const imageData = await sails.helpers.fileStore.save(file[0]);
        const image = await Images.create(imageData);
        res.send(image);
      }
      catch(err){
        res.serverError(err);
      }
    });
  }
};

