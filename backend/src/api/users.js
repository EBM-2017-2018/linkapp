const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

/**
 * @api {get} /user/role/:username getUserRole
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
router.get('/role/:username', passport.authenticate('jwt', { session: false} ), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    const userToFind = req.params.username;
    User.findOne({
      username: userToFind,
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        res.status(401).send({ success: false, msg: 'Wrong user' });
      } else {
        // check if password matches
        // return the information including token as JSON
        return res.json({ success: true, role: user.role });
      }
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});


/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} /user/list/:role getUsersFromRole
 * @apiDescription récupère la liste des utilisateurs pour un role donné
 * @apiName getUsersFromRole
 * @apiGroup User
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String= "etudiant","intervenant","administrateur"} le role dont on cherche les
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
router.get('/list/:role', passport.authenticate('jwt', {session: false}), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    const roleToFind = req.params.role;
    User.find({
      role: roleToFind,
    }, (err, users) => {
      if (err) throw err;

      if (!users) {
        res.status(401).send({success: false, msg: 'wrong role'});
      } else {
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
        return res.json({ success: true, users: outputUsers });
      }
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});
module.exports = router;