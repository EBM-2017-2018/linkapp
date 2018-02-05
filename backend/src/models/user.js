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
    enum: ['etudiant', 'intervenant', 'admin'],
    default: 'etudiant',
    required: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'invalid email'],
    required: true,
  },

});

UserSchema.pre('save', function pre(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    return bcrypt.genSalt(10000, (err, salt) => {
      if (err) {
        return next(err);
      }
      return bcrypt.hash(user.password, salt, null, (hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        return next();
      });
    });
  }
  return next();
});

UserSchema.methods.comparePassword = function compare(passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
