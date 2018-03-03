/* eslint-disable consistent-return */
const mongoose = require('mongoose');


const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');



const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['etudiant', 'intervenant', 'administrateur'],
    default: 'etudiant',
    required: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'invalid email'],
    required: true,
  },

});

UserSchema.pre('save', function hashPass(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        console.log(hash);
        next();
      });
    });
  }
});

UserSchema.methods.comparePassword = function compare(password, hashedpassword, cb) {
  bcrypt.compare(password, hashedpassword, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    console.log(isMatch);
    cb(false, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
