const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const jwtSecret = require('./config');

const BCRYPT_SALT_ROUNDS = 12;
const Op = Sequelize.Op;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const axios = require('axios');

//Models
const db = require('../config/db.config');
const User = db.user;
const Role = db.role;

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, username, password, done) => {
      try {
        User.findOne({
          where: {
            [Op.or]: [
              {
                username,
              },
              { email: req.body.email },
            ],
          },
        }).then(user => {
          if (user != null) {
            console.log('username or email already taken');
            return done(null, false, {
              message: 'Username or email already taken',
            });
          }
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
            User.create({
              name: req.body.name,
              username,
              password: hashedPassword,
              email: req.body.email,
              depend: req.body.depend,
              description: req.body.description
            }).then(user => {
              /////
              Role.findAll({
                where: {
                    name: req.body.roles.toUpperCase()
                }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        console.log('user created');
                        return done(null, user);
                    });
                }).catch(err => {
                    res.status(500).send("Error -> " + err);
                });
              /////
            });
          });
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);


passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            username,
          },
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad username' });
          }
          bcrypt.compare(password, user.password).then(response => {
            if (response !== true) {
              console.log('passwords do not match');
              return done(null, false, { message: 'Passwords do not match' });
            }
            console.log('User found & authenticated');
            return done(null, user);
          });
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          id_user: jwt_payload.id_user,
        },
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);


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