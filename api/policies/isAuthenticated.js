const passport = require('passport');

module.exports = function(req, res, next) {
  passport.authenticate('jwt', function(err, user, info){
    if(err){
      return res.serverError(err);
    }
    if(!user){
      return res.forbidden();
    }
    
    req.user = user;
    next();
  })(req, res);
}