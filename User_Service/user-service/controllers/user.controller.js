const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const crypto =  require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

//Config
const jwtSecret = require('../../config/config');

//Models
const db = require('../../config/db.config');
const User = db.user;
const Op = Sequelize.Op;

// BCRYPT SALT
const BCRYPT_SALT_ROUNDS = 12;

//Helpers
const queryBuilder = require('../query_builders/user.query_builder');
const helper = require('../helpers/user.helper');


exports.signup = (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);
    } else {
      req.logIn(user, (error) => {
        const data = {
          name: req.body.name,
          email: req.body.email,
          depend: req.body.depend,
          description: req.body.description,
          username: user.username,
        };
        //console.log("DATA: ",data);
        User.findOne({
          where: {
            username: data.username,
          },
        }).then(user => {
          //console.log(user);
          user
            .update({
              name: data.name,
              email: data.email,
              depend: data.depend,
              description: data.description
            })
            .then(() => {
              console.log('User created in db');
              res.status(200).send({ message: 'User created' });
            });
        });
      });
    }
  })(req, res, next);
};


exports.signin = (req, res, next) => {
  passport.authenticate('login', (err, users, info) => {
    if (err) {
      console.error(`error ${err}`);
    }
    if (info !== undefined) {
      console.error(info.message);
      if (info.message === 'bad username') {
        res.status(401).send(info.message);
      } else {
        res.status(403).send(info.message);
      }
    } else {
      req.logIn(users, () => {
        User.findOne({
          where: {
            username: req.body.username,
          },
        }).then(user => {
          const token = jwt.sign({ id_user: user.id_user }, jwtSecret.secret, {
              //TODO: Remember to change back to 60 * 60
            expiresIn: 60 * 600,
          });
          res.status(200).send({
            isAuthenticated: true,
            token,
            user: {
              id_user: user.id_user,
              name: user.name,
              username: user.username,
              email: user.email
            },
            message: 'User found & logged in',
          });
        });
      });
    }
  })(req, res, next);
};


exports.loaduser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message);
    } else if (user) {
      User.findOne({
        where: {
          username: user.username,
        },
      }).then((userInfo) => {
        if (userInfo != null) {
          console.log('user found in db from findUsers');
          res.status(200).json({
            isAuthenticated: true,
            user: {
              id_user: user.id_user,
              name: user.name,
              username: user.username,
              email: user.email
            },
            message: 'User found in db',
          });
        } else {
          console.error('no user exists in db with that username');
          res.status(404).send('No user exists.');
        }
      });
    } else {
      console.error('jwt id and username do not match');
      res.status(403).send('Server error, please try again.');
    }
  })(req, res, next);
};


exports.forgotpassword = (req, res, next) => {
  if (req.body.email === '') {
    res.status(400).send('The Email address cannot be empty.');
  }
  console.error(req.body.email);
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user === null) {
      console.error('email not in database');
      res.status(403).send('That email address is not recognized. Please try again or register for a new account.');
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      const mailOptions = {
        from: 'info@blockbyblock.dk',
        to: `${user.email}`,
        subject: 'Link To Reset Password',
        html: '<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
          + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
          + `<a href="${process.env.FORGOT_PASSWORD_LINK}/resetpassword/${token}">${process.env.FORGOT_PASSWORD_LINK}/resetpassword/${token}</a>\n\n`
          + 'If you did not request this, please ignore this email and your password will remain unchanged.</p>\n',

      };

      console.log('sending mail');

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('Password reseted successfully & email sent.');
        }
      });
    }
  });
}


exports.resetpassword = (req, res, next) => {
  User.findOne({
    where: {
      resetPasswordToken: req.params.resetpasswordtoken,
      resetPasswordExpires: {
        [Op.gt]: Date.now(),
      },
    },
  }).then((user) => {
    if (user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(403).send('Password reset link is invalid or has expired.');
    } else {
      res.status(200).send({
        username: user.username,
        message: 'Password reset link a-ok',
      });
    }
  });
};


exports.updatepasswordviaemail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
      resetPasswordToken: req.body.resetpasswordtoken,
      resetPasswordExpires: {
        [Op.gt]: Date.now(),
      },
    },
  }).then(user => {
    if (user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(403).send('Problem resetting password. Please send another reset link.');
    } else if (user != null) {
      console.log('user exists in db');
      bcrypt
        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
          user.update({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
          });
        })
        .then(() => {
          console.log('password updated');
          res.status(200).send('Your password has been successfully reset, please try logging in again.');
        });
    } else {
      console.error('no user exists in db to update');
      res.status(404).json('Server error, please try again to reset.');
    }
  });
};

/** List all owners of a specific broker */
exports.getOwnersOfBroker = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) console.log(err);
      if (info !== undefined) {
          console.log(info.message);
          res.status(401).send(info.message);
      } else if (parseInt(user.id_user,10) === parseInt(req.params.id_user,10)) {
          try {
              
              let queryString;
              let owners;
              const { id_user } = req.params;

              queryString = queryBuilder.BrokerOwners(id_user);
              owners = await db.sequelize.query( queryString, { type: db.sequelize.QueryTypes.SELECT });

              if (owners.length > 0) {
                console.log('OWNER INFO: ', owners);
                res.status(200).json({ owners });
            } else {
                console.log('There is no owners for this broker');
                res.status(404).send('There is no owners for this broker');
            }

          } catch (e) {
              console.error(e);
          }
      } else {
          console.error('jwt id and username do not match');
          res.status(403).send('username and jwt token do not match');
      }
  })(req, res, next);
};

/** Move this shit to user service? */
exports.getOwnersDependentOnBroker = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) console.log(err);
      if (info !== undefined) {
          console.log(info.message);
          res.status(401).send(info.message);
      } else if (parseInt(user.id_user,10) === req.body.id_user) {
          if(await isRole('admin', req.body.id_user) === true && await isRole('broker', req.body.id_broker) === true){
              try {
                  let queryString, ownerList = '';
                  const id_broker = req.body.id_broker;

                  
                  queryString = queryBuilder.GetOwnersDependentOnBroker(id_broker);
                  ownerList = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                  
                  console.log('OWNERS DEPENDET ON BROKER: ', ownerList);
                  res.status(200).json({ ownerList });
      
              } catch (e) {
                  console.error(e);
              }
          }
          else{
              console.error('User not allowed to perform this action');
              res.status(403).send('User not allowed to perform this action');
          }
      } else {
          console.error('jwt id and username do not match');
          res.status(403).send('username and jwt token do not match');
      }
  })(req, res, next);
};

exports.removeOwnerDependentOnBroker = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) console.log(err);
      if (info !== undefined) {
          console.log(info.message);
          res.status(401).send(info.message);
      } else if (parseInt(user.id_user,10) === req.body.id_user) {
          if(await isRole('admin', req.body.id_user) === true && await isRole('broker', req.body.id_broker) === true && await isRole('shop_owner', req.body.id_owner) === true){
              try {
                  let queryString, deleteConfirmation = '';
                  const id_broker = req.body.id_broker;
                  const id_owner = req.body.id_owner;

                  
                  queryString = queryBuilder.RemoveOwnerDependentOnBroker(id_broker, id_owner);
                  deleteConfirmation = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.DELETE });
                  
                  console.log('REMOVED IN USERS TABLE: ', deleteConfirmation);
                  res.status(200).json({ deleteConfirmation });
      
              } catch (e) {
                  console.error(e);
              }
          }
          else{
              console.error('User not allowed to perform this action');
              res.status(403).send('User not allowed to perform this action');
          }
      } else {
          console.error('jwt id and username do not match');
          res.status(403).send('username and jwt token do not match');
      }
  })(req, res, next);
};



exports.updateOwnerDependentOnBroker = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) console.log(err);
      if (info !== undefined) {
          console.log(info.message);
          res.status(401).send(info.message);
      } else if (parseInt(user.id_user,10) === req.body.id_user) {
          if(await isRole('admin', req.body.id_user) === true && await isRole('broker', req.body.id_broker) === true && await isRole('shop_owner', req.body.id_owner) === true){
              try {
                  let queryString, updateConfirmation = '';
                  const id_broker = req.body.id_broker;
                  const id_owner = req.body.id_owner;
                  const name = req.body.name;
                  const username = req.body.username;
                  const email = req.body.email;
                  const depend = req.body.depend;
                  const description = req.body.description;

                  
                  queryString = queryBuilder.UpdateOwnerDependentOnBroker(id_broker, id_owner, name, username, email, depend, description);
                  updateConfirmation = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.UPDATE });
                  
                  console.log('UPDATED IN USERS TABLE: ', updateConfirmation);
                  res.status(200).json({ updateConfirmation });
      
              } catch (e) {
                  console.error(e);
              }
          }
          else{
              console.error('User not allowed to perform this action');
              res.status(403).send('User not allowed to perform this action');
          }
      } else {
          console.error('jwt id and username do not match');
          res.status(403).send('username and jwt token do not match');
      }
  })(req, res, next);
};

/** This call is to confirm if the JWT token match the user */
exports.getUsers = async (req, res, next) => {
  try {

    const { id_user } = req.params;
    
    await User.findOne({
      where: {
        id_user: id_user
      },
    }).then(user => {

      res.status(200).json({ user });

    }).catch(err => {

      console.log('ERROR WHILE RETREIVING USER: ', err);
      res.status(400).send('ERROR WHILE RETREIVING USER', err);

    });

  } catch (e) {
      console.error(e);
  }

};
exports.checkUserRole = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === req.body.id_user) {
            try {
                const { id_user, user_role} = req.body;
                let user_role_confirmation;

                user_role_confirmation = await isRole(user_role, id_user);

                console.error('user role confirmed: ' + user_role_confirmation);
                res.status(200).send(user_role_confirmation);

            } catch (error) {
                console.error('Problem while confirming user role');
                res.status(403).send('Problem while confirming user role');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
/** Used to check the roles of the user that send the request and the role of 
*  the user with the id the action is being performed on */
isRole = async (role, id_user) => {
  if (id_user!== undefined) {
      try {
          let queryRole = '';
          let userRole = {};
          // Gets user role info
          queryRole = queryBuilder.GetUserRole(id_user);
          userRole = await db.sequelize.query(queryRole, {type: db.sequelize.QueryTypes.SELECT});
          // Check if user is the required role
          return userRole[0].name === role.toUpperCase();
      } catch (e) {
          console.error(e);
      }
  }
  else {
      console.error('Unable to check user role');
  }
}