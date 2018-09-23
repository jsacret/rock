/**
 * RockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
console.log('loading rock');
module.exports = {
  find: async function(req, res) {
    const page = req.param('page') ? parseInt(req.param('page')) : 1;
    const pageSize = req.param('pageSize') ? parseInt(req.param('pageSize')) : 10;
    const paging = await sails.helpers.paging.get(page, pageSize);

    const rocks = await Rock.findAll(paging);
    res.send(rocks);
  },

  findOne: async function(req, res) {
    const id = req.param('id') ? parseInt(req.param('id')) : null;

    if(!id){
      return res.badRequest();
    }
    const rock = await Rock.findOne({
      where: {
        id: id
      }
    });
    res.send(rock);
  },

  create: async function(req, res) {
    const rock = await Rock.create({...req.body, creatorId: req.user.id});
    res.send(rock);
  },

};

