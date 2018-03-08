/* eslint-disable consistent-return,no-shadow */
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');


const router = express.Router();
const User = require('../models/user');
const tokenUtils = require('../libs/tokenUtils');

const roleAdmin = 'administrateur';
const roleIntervenant = 'intervenant';
const roleEtudiant = 'etudiant';

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {post} signin connection
 * @apiDescription connection à la plateforme linkapp
 * @apiName Signin
 * @apiGroup General
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "success": true,
 *  "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMmJ"
 *  }
 * @apiError (4xx) User not found code
 * @apiError (4xx) Wrong password
 */
router.post('/signin', (req, res) => {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401)
        .send({
          success: false,
          msg: 'Authentication failed. User not found.',
        });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, user.password, (error, isMatch) => {
        if (isMatch && !error) {
          // if user is found and password is right create a token
          const token = jwt.sign({
            username: user.username,
            role: user.role,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
          }, config.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: `JWT ${token}`,
          });
        } else {
          res.status(401)
            .send({
              success: false,
              msg: 'Authentication failed. Wrong password.',
            });
        }
      });
    }
  });
});

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {post} updatePassword updatePassword
 * @apiDescription connection à la plateforme linkapp
 * @apiName updatePassword
 * @apiGroup General
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} password
 * @apiParam {String} newPassword
 * @apiExample Example usage:
 *     body:
 * {
     password: test,
     newPassword: t3st,
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "success": true,
 *  }
 * @apiError (4xx) User not found
 * @apiError (5xx) InternalError
 * @apiError (4xx) Wrong password
 */
router.post('/updatepassword', (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    const decodedToken = tokenUtils.decodeToken(token);
    const userToFind = decodedToken.username;
    User.findOne({
      username: userToFind,
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        res.status(401)
          .send({
            success: false,
            msg: 'User not found.',
          });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, user.password, (error, isMatch) => {
          if (isMatch && !error) {
            user.set({ password: req.body.newPassword });
            user.save((err) => {
              if (err) throw err;
              console.log(err);
              if (!err) {
                return res.status(200).send({
                  success: true,
                });
              }
              return res.status(500)
                .send({
                  success: false,
                  msg: 'server error',
                });
            });
          } else {
            res.status(401)
              .send({
                success: false,
                msg: 'Wrong password.',
              });
          }
        });
      }
    });
  }
});

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {post} signup inscription
 * @apiDescription inscrit un nouvel utilisateur
 * @apiName Signup
 * @apiGroup General
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiPermission 'administrateur'
 * @apiPermission 'intervenant'
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiParam {String="etudiant","intervenant","administrateur"} role
 * @apiParam {String} nom
 * @apiParam {String} prenom
 * @apiParam {Email} email
 *
 * @apiError (11000) UsernameAlreadyExist
 * @apiError WrongRole
 * @apiError WrongEmail
 * @apiError NoPasswordOrUsername
 */
router.post('/signup', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    const decodedToken = tokenUtils.decodeToken(token);
    const userToFind = decodedToken.username;
    return User.findOne({
      username: userToFind,
    }, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.status(401)
          .send({
            success: false,
            msg: 'Wrong user',
          });
      }
      if (!req.body.username || !req.body.password) {
        res.status(401).json({
          success: false,
          msg: 'Please pass username and password.',
        });
      }
      if (
        (
          (
            req.body.role.localeCompare(roleAdmin) === 0
            || req.body.role.localeCompare(roleIntervenant) === 0
          )
          && user.role.localeCompare(roleAdmin) === 0
        )
        || (
          req.body.role.localeCompare(roleEtudiant) === 0
          && (user.role.localeCompare(roleAdmin) === 0
            || user.role.localeCompare(roleIntervenant) === 0
          )
        )
      ) {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
          role: req.body.role,
          nom: req.body.nom,
          prenom: req.body.prenom,
          email: req.body.email,
        });
        // ajout d'un user
        // eslint-disable-next-line no-shadow
        newUser.save((err) => {
          if (err) {
            if (err.errors) {
              // mauvais role
              if (err.errors.role) {
                return res.json({
                  success: false,
                  msg: err.errors.role.message,
                });
              }
              // email invalide
              if (err.errors.email) {
                return res.json({
                  success: false,
                  msg: err.errors.email.message,
                });
              }
            } else {
              switch (err.code) {
                // username deja pris
                case 11000: {
                  return res.json({
                    success: false,
                    msg: 'Username already exists.',
                  });
                }
                default:
                  return res.json({
                    success: false,
                    // error: err ,
                    msg: 'Unknown error',
                  });
              }
            }
          } else {
            return res.json({
              success: true,
              msg: 'Successful created new user.',
            });
          }
          return res.json({
            success: false,
            msg: 'unknown error',
          });
        });
      } else {
        return res.status(403)
          .send({
            success: false,
            msg: 'Unauthorized.',
          });
      }
    });
  }
});


/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} checkandrefreshtoken checkAndRefreshToken
 * @apiDescription vérifie le token d'un utilisateur et renvoie un nouveau token
 * @apiName checkAndRefreshToken
 * @apiGroup General
 * @apiParam {String} Authorization JWT token
 * @apiSuccessExample {json} Success-Response:
 *{
 *   "success": true
 *   "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 *}
 * @apiError (401) UnknownUser
 * @apiError (403) WrongToken
 */
router.get('/checkandrefreshtoken', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    const decodedToken = tokenUtils.decodeToken(token);
    if (token) {
      const userToFind = decodedToken.username;
      return User.findOne({
        username: userToFind,
      }, (err, user) => {
        if (err) throw err;
        if (!user) {
          return res.status(401)
            .send({
              success: false,
              msg: 'Valid token but unknown user',
            });
        }
        // check if password matches
        // return the role of the user
        return res.json({
          success: true,
          newToken: token,
        });
      });
    }
    return res.status(403)
      .send({
        success: false,
        msg: 'Wrong token.',
      });
  }
});


module.exports = router;
