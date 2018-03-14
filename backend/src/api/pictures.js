/* eslint-disable no-shadow,consistent-return */
let name;
const express = require('express');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

Grid.mongo = mongoose.mongo;
const gfs = new Grid(mongoose.connection.db);

const router = express.Router();

/** Setting up storage using multer-gridfs-storage */
const storage = GridFsStorage({
  db: mongoose.connection.db,
  gfs,
  file: (req) => {
    // eslint-disable-next-line no-throw-literal
    if (!req.body.username) { throw 'username manquant'; }
    return req.body.username;
  },
  /** With gridfs we can store aditional meta-data along with the file */
  metadata(req, file, cb) {
    cb(null, { originalname: file.originalname });
  },
});

const upload = multer({ // multer settings for single upload
  storage,
}).single('file');

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {post} pictures/upload setProfilePic
 * @apiDescription upload d'une photo de profil
 * @apiName setProfilePic
 * @apiGroup User
 * @apiHeader Content-Type multipart/form-data
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "multipart/form-data"
 *     }
 * @apiExample Example usage:
 *     body:
 * {
     username: test,
     file: file to upload,
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "success": true,
 *  }
 * @apiError (4xx) Wrong password
 */
router.post('/upload', (req, res) => {
  gfs.files.find({ filename: req.body.username }).toArray((err, files) => {
    if (err) {
      return res.status(500)
        .json({
          success: false,
          msg: 'erreur durant le remplacement du fichier',
        });
    }
    console.log(req.body.username);
    console.log(files);
    if (files && files.length > 0) {
      // eslint-disable-next-line no-underscore-dangle
      gfs.remove({ _id: files[0]._id }, (err) => {
        console.log(err);
        return res.status(500)
          .json({
            success: false,
            msg: 'erreur durant le remplacement du fichier',
          });
      });
    }
  });
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ success: false, msg: err });
      return;
    }
    res.json({ success: true, msg: name });
  });
});

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} pictures/file/:username getProfilePic
 * @apiDescription vérifie le token d'un utilisateur
 * @apiName getProfilePic
 * @apiGroup User
 * @apiParam {String} username username de l'utilisateur dont on veut récupérer la photo
 * @apiError (401) UnknownPicture
 * @apiError (403) WrongToken
 */
router.get('/file/:filename', (req, res) => {
  /** First check if file exists */
  gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
    if (err || !files || files.length === 0) {
      return res.status(401).json({
        success: false,
        msg: 'fichier non trouvé',
      });
    }
    /** create read stream */
    console.log(files);
    const readstream = gfs.createReadStream({
      filename: files[0].filename,
    });
    /** set the proper content type */
    res.set('Content-Type', files[0].contentType);
    /** return response */
    return readstream.pipe(res);
  });
});

module.exports = router;
