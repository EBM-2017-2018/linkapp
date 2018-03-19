/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const Promo = require('../models/promo');
const User = require('../models/user');

const passport = require('passport');
const tokenUtils = require('../libs/tokenUtils');

const roleAdmin = 'administrateur';
const roleIntervenant = 'intervenant';

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} promos/listpromos getListPromo
 * @apiDescription récupère la liste des promotions
 * @apiName getListPromo
 * @apiGroup Promo
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {Promo} promotions la liste des promotions
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "promotions": [
        {
            "_id": "5a9aa79b687a689eba75a121",
            "nomPromo": "EBM1",
            "responsable": "root",
            "__v": 0,
            "membres": [
                "root",
                "test",
                "test2"
            ]
        },
        {
            "_id": "5a9aab5e69e4d89f0e467b23",
            "nomPromo": "EBM2",
            "responsable": "root",
            "__v": 0,
            "membres": [
                "root"
            ]
        },
        {
            "_id": "5a9aab6c69e4d89f0e467b24",
            "nomPromo": "EBM",
            "responsable": "root",
            "__v": 0,
            "membres": [
                "root"
            ]
        }
    ]
}
 *
 * @apiError (4xx) Unauthorized
 */
router.get('/listpromos', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    return Promo.find((err, listPromo) => {
      if (!listPromo) {
        return res.status(401)
          .send({
            success: false,
            msg: 'no promotion',
          });
      }
      // check if password matches
      // return the role of the user
      return res.json({
        success: true,
        promotions: listPromo,
      });
    });
  }
  return res.status(403)
    .send({
      success: false,
      msg: 'Unauthorized.',
    });
});

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} promos/:resp/listpromos getListPromo
 * @apiDescription récupère la liste des promotions
 * @apiName getListPromoByResponsablle
 * @apiGroup Promo
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiSuccess {Boolean} success succès
 * @apiParam {String} resp responsable de la promo
 * @apiSuccess {Promo} promotions la liste des promotions
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "promotions": [
        {
            "_id": "5a9aa79b687a689eba75a121",
            "nomPromo": "EBM1",
            "responsable": "root",
            "__v": 0,
            "membres": [
                "root",
                "test",
                "test2"
            ]
        },
        {
            "_id": "5a9aab5e69e4d89f0e467b23",
            "nomPromo": "EBM2",
            "responsable": "root",
            "__v": 0,
            "membres": [
                "root"
            ]
        },
        {
            "_id": "5a9aab6c69e4d89f0e467b24",
            "nomPromo": "EBM",
            "responsable": "root",
            "__v": 0,
            "membres": [
                "root"
            ]
        }
    ]
}
 *
 * @apiError (4xx) Unauthorized
 */
router.get('/:resp/listpromos', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (!req.params.resp) {
    return res.status(404).json({
      code: 'NO_RESP',
      message: 'Le responsable est absent.',
    });
  }
  if (token) {
    return Promo.find(
      { responsable: req.params.resp },
      (err, listPromo) => {
        if (!listPromo) {
          return res.status(401)
            .send({
              success: false,
              msg: 'no promotion',
            });
        }
        // check if password matches
        // return the role of the user
        return res.json({
          success: true,
          promotions: listPromo,
        });
      },
    );
  }
  return res.status(403)
    .send({
      success: false,
      msg: 'Unauthorized.',
    });
});

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} promos/:promo getPromo
 * @apiDescription récupère la promo passée en paramètre
 * @apiName getPromo
 * @apiGroup Promo
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} promo le nom de la promo
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {Promo} promotion la promo demandée
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "promotion": {
        "_id": "5a9aa79b687a689eba75a121",
        "nomPromo": "EBM1",
        "responsable": "root",
        "__v": 0,
        "membres": [
            "root",
            "test",
            "test2"
        ]
    }
}
 *
 * @apiError (4xx) wrongPromo
 * @apiError (4xx) Unauthorized
 */
router.get('/:promo', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    const promoToFind = req.params.promo;
    return Promo.findOne({
      nomPromo: promoToFind,
    }, (err, promo) => {
      if (!promo) {
        return res.status(401)
          .send({
            success: false,
            msg: 'Unknown promotion',
          });
      }
      // check if password matches
      // return the role of the user
      return res.json({
        success: true,
        promotion: promo,
      });
    });
  }
  return res.status(403)
    .send({
      success: false,
      msg: 'Unauthorized.',
    });
});

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {post} promos setPromo
 * @apiDescription récupère la promo passée en paramètre
 * @apiName setPromo
 * @apiGroup Promo
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiExample Example usage:
 *     body:
        {
        "nomPromo":"EBM",
        "responsable":"root",
        "membres":["root","test"]
        }
 *
 * @apiPermission 'administrateur'
 * @apiPermission 'intervenant'
 * @apiParam {String} nomPromo le nom de la promo
 * @apiParam {String} responsable le username du responsable
 * @apiParam {String[]} [membres] les usernames des membres
 * @apiSuccess {Boolean} success succès
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
}
 *
 * @apiError (4xx) wrongUser
 * @apiError (4xx) Unauthorized
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    const decodedToken = tokenUtils.decodeToken(token);
    const userToFind = decodedToken.username;
    return User.findOne({
      username: userToFind,
    }, (err, user) => {
      if (!user) {
        return res.status(401)
          .send({
            success: false,
            msg: 'Wrong user',
          });
      }
      if (!req.body.nomPromo || !req.body.responsable) {
        return res.json({
          success: false,
          msg: 'erreur paramètre nomPromo ou responsable manquant',
        });
      }
      if (user.role === roleAdmin || user.role === roleIntervenant) {
        User.findOne({
          username: req.body.responsable,
          // eslint-disable-next-line no-shadow
        }, (err, resp) => {
          if (!resp) {
            return res.status(401)
              .send({
                success: false,
                msg: 'Responsable inconnu',
              });
          }

          const newPromo = new Promo({
            nomPromo: req.body.nomPromo,
            membres: req.body.membres,
            responsable: req.body.responsable,
          });
          // ajout d'une Promo/
          // eslint-disable-next-line no-shadow
          newPromo.save((err) => {
            if (err) {
              if (err.errors) {
                // mauvais nomPromo
                if (err.errors.nomPromo) {
                  return res.json({
                    success: false,
                    msg: err.errors.nomPromo.message,
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
                msg: 'nouvelle promo ajoutée',
              });
            }
            return res.json({
              success: false,
              msg: 'unknown error',
            });
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
 * @api {put} promos updatePromo
 * @apiDescription récupère la promo passée en paramètre
 * @apiName updatePromo
 * @apiGroup Promo
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiExample Example usage:
 *     body:
        {
        "nomPromo":"EBM",
        "responsable":"root",
        "membres":["root","test"]
        }
 *
 * @apiPermission 'administrateur'
 * @apiPermission 'intervenant'
 * @apiParam {String} nomPromo le nom de la promo
 * @apiParam {String} [responsable] le username du responsable
 * @apiParam {String[]} [membres] les usernames des membres * @apiSuccess {Boolean} success succès
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
}
 *
 * @apiError (4xx) wrongUser
 * @apiError (4xx) Unauthorized
 */
router.put('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    const decodedToken = tokenUtils.decodeToken(token);
    const userToFind = decodedToken.username;
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
      if (!req.body.nomPromo || !req.body.responsable) {
        res.json({
          success: false,
          msg: 'erreur paramètre Promo ou responsable manquant',
        });
      }
      if (user.role === roleAdmin || user.role === roleIntervenant) {
        User.findOne({
          username: req.body.responsable,
          // eslint-disable-next-line no-shadow
        }, (err, resp) => {
          if (!resp) {
            return res.status(401)
              .send({
                success: false,
                msg: 'Responsable inconnu',
              });
          }
          // maj d'une Promo
          Promo.update({
            nomPromo: req.body.nomPromo,
          // eslint-disable-next-line no-shadow
          }, req.body, (err) => {
            if (err) {
              if (err.errors) {
                // mauvais nomPromo
                if (err.errors.nomPromo) {
                  return res.json({
                    success: false,
                    msg: err.errors.nomPromo.message,
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
                    return res.status(400).json({
                      success: false,
                      msg: 'Non d\'utilisateur existant',
                    });
                  }
                  default:
                    return res.status(400).json({
                      success: false,
                      msg: 'erreur',
                    });
                }
              }
            } else {
              return res.status(400).json({
                success: true,
                msg: 'promo mise à jour',
              });
            }
            return res.status(400).json({
              success: false,
              msg: 'erreur',
            });
          });
        });
      } else {
        return res.status(403)
          .send({
            success: false,
            msg: 'Opération non autorisée.',
          });
      }
    });
  }
});

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} listpromosof/:username listPromosOf
 * @apiDescription récupère la liste des promos dont l'utilisateur est membre
 * @apiName listPromosf
 * @apiGroup Promo
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} promo le nom de la promo
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {Promo} promotion la promo demandée
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "promotions": [
        {
            "_id": "5a9aa79b687a689eba75a121",
            "nomPromo": "EBM1",
            "responsable": "root",
            "__v": 0,
            "membres": [
                "root",
                "test",
                "test2"
            ]
        },
        {
            "_id": "5a9aab5e69e4d89f0e467b23",
            "nomPromo": "EBM2",
            "responsable": "root",
            "__v": 0,
            "membres": [
                "root"
            ]
        }
    ]
}
 *
 * @apiError (403) Unauthorized
 */
router.get('/listpromosof/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = tokenUtils.getToken(req.headers);
  if (token) {
    const usernameToFind = req.params.username;
    return Promo.find({
      membres: usernameToFind,
    }, (err, listPromo) => {
      if (!listPromo) {
        return res.status(401)
          .send({
            success: false,
            msg: `Pas de promos associée à ${req.params.username}`,
          });
      }
      const outputPromos = [];
      listPromo.forEach((promo) => {
        outputPromos.push({
          responsable: promo.responsable,
          nomPromo: promo.nomPromo,
          membres: promo.membres,
        });
      });
      return res.json({
        success: true,
        promotions: listPromo,
      });
    });
  }
  return res.status(403)
    .send({
      success: false,
      msg: 'Opération non autorisée.',
    });
});

module.exports = router;
