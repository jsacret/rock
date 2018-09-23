'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const expires = 60*24;
const secret = "23k4jlj234lkj234ds09f2j323d3j93";
const algorithm = "HS256";
const issuer = "localhost";
const audience = "localhost";

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({where: { id: id }}).then(user => {
    done(null, user);
  }).catch( err => done(err, null));
});

const verifyHandler = function(req, username, password, done){
  process.nextTick(async function() {
    const user = await User.findOne({where: {username: username}});
    const plainUser = user.get({plain: true});
    var match = bcrypt.compareSync(password, plainUser.password);

    if(!match){
      return done(null, false, {message:'Invalid Password'});
    } else {
      req.logIn(plainUser, async function(err){
        if(err){
          return done(null, false, {message: err});
        }
        plainUser.token = await sails.helpers.token(plainUser);
        return done(null, plainUser, {message: 'Logged in successfully'});
      });
    }
  });
}

const jwtHandler = function (payload, next){
  var user = payload.user;
  return next(null, user, {});
}

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}, verifyHandler));

const jwtStrategyConfig = {
  secretOrKey: secret,
  issuer: issuer,
  audience: audience,
  passReqToCallback: false,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
};

passport.use(new JwtStrategy(
  jwtStrategyConfig, 
  jwtHandler,
  ));

  module.exports.jwtSettings = {
    expiresInMinutes: expires,
    secret: secret,
    algorithm : algorithm,
    issuer : issuer,
    audience : audience
  };