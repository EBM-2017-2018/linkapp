const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/user');

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {post} /signup inscription
 * @apiDescription inscrit un nouvel utilisateur
 * @apiName Signup
 * @apiGroup General
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
router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      msg: 'Please pass username and password.',
    });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
    });
    // ajout d'un user
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
  }
});


/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {post} /signin connection
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
      user.comparePassword(req.body.password, (isMatch) => {
        if (isMatch && !err) {
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

module.exports = router;
