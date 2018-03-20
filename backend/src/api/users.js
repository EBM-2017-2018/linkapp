const express = require('express');

const router = express.Router();
const User = require('../models/user');

const passport = require('passport');
const tokenUtils = require('../libs/tokenUtils');

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} users/role/:username getUserRole
 * @apiDescription récupère le role de l'utilisateur
 * @apiName getUserRole
 * @apiGroup User
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} role le nom d'utilisateur de l'utilisateur
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {String} role role de l'utilisateur
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "role": "admin"
  }
 *
 * @apiError (4xx) wrongUser
 * @apiError (4xx) Unauthorized
 */
router.get('/role/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    const userToFind = req.params.username;
    return User.findOne({
      username: userToFind,
    }, (err, user) => {
      if (!user) {
        return res.status(401)
          .send({
            success: false,
            msg: 'Utilisateur inconnu',
          });
      }
      // check if password matches
      // return the role of the user
      return res.json({
        success: true,
        role: user.role,
      });
    });
  }
  return res.status(403)
    .send({
      success: false,
      msg: 'Opération non autorisée.',
    });
});

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} users/userinfos/:username getUserInfos
 * @apiDescription récupère les informations l'utilisateur
 * @apiName getUserInfos
 * @apiGroup User
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} username le nom d'utilisateur de l'utilisateur
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {String} role role de l'utilisateur
 * @apiSuccess {String} nom nom de l'utilisateur
 * @apiSuccess {String} prenom prenom de l'utilisateur
 * @apiSuccess {String} email email de l'utilisateur
 * @apiSuccess {String} username pseudo de l'utilisateur
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "role": "admin",
    "nom": "test",
    "prenom": "test",
    "email": "test@ebm.fr",
  }
 *
 * @apiError (4xx) wrongUser
 * @apiError (4xx) Unauthorized
 */
router.get('/userinfos/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    const userToFind = req.params.username;
    return User.findOne({
      username: userToFind,
    }, (err, user) => {
      if (!user) {
        return res.status(401)
          .send({
            success: false,
            msg: 'Utilisateur inconnu',
          });
      }
      // check if password matches
      // return the role of the user
      return res.json({
        success: true,
        username: user.username,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
      });
    });
  }
  return res.status(403)
    .send({
      success: false,
      msg: 'Opération non autorisée.',
    });
});

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} users/basicuserinfos/:username getBasicUserInfos
 * @apiDescription récupère les informations l'utilisateur
 * @apiName getBasicUserInfos
 * @apiGroup User
 * @apiParam {String} username le psuedo de l'utilisateur
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {String} nom nom de l'utilisateur
 * @apiSuccess {String} prenom prenom de l'utilisateur
 * @apiSuccess {String} username pseudo de l'utilisateur
 * @apiSuccessExample {json} Success-Response:
 *{
    "username": "root",
    "nom": "test",
    "prenom": "test",
  }
 *
 * @apiError (4xx) wrongUser
 * @apiError (4xx) Unauthorized
 */
router.get('/basicuserinfos/:username', (req, res) => {
  const userToFind = req.params.username;
  return User.findOne({
    username: userToFind,
  }, (err, user) => {
    if (!user) {
      return res.status(401)
        .send({
          success: false,
          msg: 'Utilisateur inconnu',
        });
    }
    return res.json({
      username: user.username,
      nom: user.nom,
      prenom: user.prenom,
    });
  });
});


/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} users/list/:role getUsersFromRole
 * @apiDescription récupère la liste des utilisateurs pour un role donné
 * @apiName getUsersFromRole
 * @apiGroup User
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String= "etudiant","intervenant","administrateur"} role le role dont on cherche les
 * utilisateurs
 *
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {users[]} users liste d'utilisateur
 * @apiSuccessExample {json} Success-Response:
 *{
 *  "success": true,
 *  "users": [
 *      {
 *          "username": "eleve",
 *          "nom": "test",
 *          "prenom": "test",
 *          "role": "etudiant"
 *      },
 *      {
 *          "username": "petitpoucet",
 *          "nom": "test",
 *         "prenom": "test",
 *         "role": "etudiant"
 *      }
 *  ]
 *}
 *
 * @apiError (4xx) wrongRole
 * @apiError (4xx) Unauthorized
 */
router.get('/list/:role', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    const roleToFind = req.params.role;
    return User.find({
      role: roleToFind,
    }, (err, users) => {
      if (!users) {
        return res.status(401)
          .send({
            success: false,
            msg: 'wrong role',
          });
      }
      // check if password matches
      // return the information including token as JSON
      const outputUsers = [];
      users.forEach((user) => {
        outputUsers.push({
          username: user.username,
          nom: user.nom,
          prenom: user.prenom,
          role: user.role,

        });
      });
      return res.json({
        success: true,
        users: outputUsers,
      });
    });
  }
  return res.status(403)
    .send({
      success: false,
      msg: 'Opération non autorisée.',
    });
});

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} users/getusersstartingwith/:name getUsersStartingWith
 * @apiDescription récupère la liste des utilisateurs dont le nom commence par
 * @apiName getUsersStartingWith
 * @apiGroup User
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} name le début du nom des utilisateurs que l'on cherche
 *
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {users[]} users liste d'utilisateur
 * @apiSuccessExample {json} Success-Response:
 *{
 *  "success": true,
 *  "users": [
 *      {
 *          "username": "eleve",
 *          "nom": "test",
 *          "prenom": "test",
 *          "role": "etudiant"
 *      },
 *      {
 *          "username": "petitpoucet",
 *          "nom": "test",
 *         "prenom": "test",
 *         "role": "etudiant"
 *      }
 *  ]
 *}
 *
 * @apiError (403) Unauthorized
 */
router.get('/getusersstartingwith/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    const nameToFind = req.params.name;
    return User.find({
      nom: new RegExp(`^ ${nameToFind}`),
    }, (err, users) => {
      if (!users) {
        return res.status(404)
          .send({
            success: true,
            msg: 'utilisateur non trouvé',
          });
      }
      // check if password matches
      // return the information including token as JSON
      const outputUsers = [];
      users.forEach((user) => {
        outputUsers.push({
          username: user.username,
          nom: user.nom,
          prenom: user.prenom,
          role: user.role,

        });
      });
      return res.json({
        success: true,
        users: outputUsers,
      });
    });
  }
  return res.status(403)
    .send({
      success: false,
      msg: 'Opération non autorisée.',
    });
});

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} users/allusers getAllUsers
 * @apiDescription récupère la liste des utilisateurs
 * @apiName getAllUsers
 * @apiGroup User
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 *
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {users[]} users liste d'utilisateur
 * @apiSuccessExample {json} Success-Response:
 *{
 *  "success": true,
 *  "users": [
 *      {
 *          "username": "eleve",
 *          "nom": "test",
 *          "prenom": "test",
 *          "role": "etudiant"
 *      },
 *      {
 *          "username": "petitpoucet",
 *          "nom": "test",
 *         "prenom": "test",
 *         "role": "etudiant"
 *      }
 *  ]
 *}
 *
 * @apiError (403) Unauthorized
 */
router.get('/allusers', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    return User.find((err, users) => {
      if (!users) {
        return res.status(200)
          .send({
            success: true,
            msg: 'Aucun utilisateur trouvé',
          });
      }
      // check if password matches
      // return the information including token as JSON
      const outputUsers = [];
      users.forEach((user) => {
        outputUsers.push({
          username: user.username,
          nom: user.nom,
          prenom: user.prenom,
          role: user.role,

        });
      });
      return res.json({
        success: true,
        users: outputUsers,
      });
    });
  }
  return res.status(403)
    .send({
      success: false,
      msg: 'opération non autorisée.',
    });
});

module.exports = router;
