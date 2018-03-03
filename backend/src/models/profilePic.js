const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfilePic = new Schema({
  img:
    {
      data: Buffer,
      contentType: String,
    },
  username: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model('ProfilePic', ProfilePic);
