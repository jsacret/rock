/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');

module.exports = {
  register:  async function (req, res){
    var params = {username: req.body.username, password: req.body.password};

    const user = await User.create(params);
    return res.send(user);
  },
  
  login: function (req, res, next){
    passport.authenticate('local', function(err, user, response){
      if(err){
        return next(err);
      }
      if(user){
        return res.json(user);
      }
      return res.json({message: 'Bad username / password combination'});
    })(req, res, next);
  },

  logout: function (req, res){
    delete req.logout();
    res.json({success: true});
  }

};

