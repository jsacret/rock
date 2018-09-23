/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find: async (req, res) => {
    const users = await User.findAll();
    res.send(users);
  },

  findOne: async (req, res) => {
    const id = req.param('id') ? parseInt(req.param('id')) : null;
    if(!id){
      res.badRequest();
    }
    try{
      let user = await sails.helpers.cache.get(`findOne${id}`);
      if(user){
        return res.send(user);
      }
      if(!user){
         user = await User.findOne({
          where: {
            id
          }
        });
        await sails.helpers.cache.set(`findOne${id}`, user);
        return res.send(user);
      }
    } catch(err) {
      res.serverError(err);
    }
    return res.send(user);
  },

  userRocks: async (req, res) => {
    const id = req.param('id') ? parseInt(req.param('id')) : null;
    if(null) {
      res.badRequest();
    }
    let user = await sails.helpers.cache.get(`userRocks${id}`);
    if(user){
      return res.send(user);
    }
    user = await User.findOne({
      where: {
        id
      },
      include: {
        model: Rock
      }
    });
    await sails.helpers.cache.set(`userRocks${id}`, user);
    return res.send(user);
  }
};

