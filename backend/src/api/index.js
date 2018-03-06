/* eslint-disable consistent-return */
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');


const router = express.Router();
const User = require('../models/user');
const ProfilePic = require('../models/profilePic');
const tokenUtils = require('../libs/tokenUtils');

const upload = multer({ dest: 'uploads/' }).single('testProfilePic');

const roleAdmin = 'administrateur';
const roleIntervenant = 'intervenant';
const roleEtudiant = 'etudiant';
/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {post} api/signin connection
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
 * @api {post} api/signup inscription
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
        res.json({
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


router.post('/profilepic', (req, res) => {
  console.log(req.headers);
  upload(req, res, (err) => {
    console.log(req.file);
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send('an Error occured');
    }
    // -----
    const newItem = new ProfilePic({
      img: {
        data: fs.readFileSync(req.file.path),
        contentType: 'image/png',
      },
      username: req.body.username,
    });
    newItem.save((err) => {
      if (err) {
        return res.json({
          success: false,
          msg: err,
        });
      }
      return res.json({
        success: true,
      });
    });
    // ----
    // No error occured.
    //return res.send('Upload Completed ');
  });
});

router.get('/profilepic/:username', (req, res) => {
  const userToFind = req.params.username;
  return ProfilePic.findOne({
    username: userToFind,
  }, (err, profilePic) => {
    if (err) throw err;
    if (!profilePic) {
      return res.status(401)
        .send({
          success: false,
          msg: 'no profile pic',
        });
    }
    console.log(profilePic.img.data);
    res.contentType(profilePic.img.contentType);
    return res.send({ fs });
  });
});
/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} api/checktoken checkTokenValidity
 * @apiDescription vérifie le token d'un utilisateur
 * @apiName verification
 * @apiGroup General
 * @apiParam {String} JWT token
 * @apiSuccessExample {json} Success-Response:
 *{
 *   "success": true
 *}
 * @apiError (401) UnknownUser
 * @apiError (403) WrongToken
 */
router.get('/checktoken', passport.authenticate('jwt', { session: false }), (req, res) => {
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
