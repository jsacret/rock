const aws = require('aws-sdk');
const fs = require('fs');
const uuid = require('uuid/v1');

module.exports = {


  friendlyName: 'Save',


  description: 'Save file store.',


  inputs: {
    file: {
      type: 'ref',
      required: true,
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const s3 = new aws.S3();
    const fileData = fs.readFileSync(inputs.file.fd);
    const Key = uuid() + '-' + inputs.file.filename;
    s3.putObject({
      Bucket: 'rocksimages',
      Key,
      ContentType: inputs.file.type,
      Body: fileData,
      ACL: 'public-read', 
    }).promise().then(data => {
      const imageDetails = {
        bucket: 'rocksimages',
        name: Key,
      }
      exits.success(imageDetails);
    }); 
  }


};

