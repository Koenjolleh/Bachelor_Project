const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const jwtSecret = require('./config');

const BCRYPT_SALT_ROUNDS = 12;
const Op = Sequelize.Op;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  'jwt',
  new JWTstrategy(opts, async (jwt_payload, done) => {
    try {

      const id_user = jwt_payload.id_user;
      
      await axios.get(`http://localhost:3001/api/user_service/getusers/${id_user}`).then( user => {
        if (user) {
          console.log('user found in db in passport');
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, user);
        }
      })
    
    } catch (err) {
      done(err);
    }
  }),
);