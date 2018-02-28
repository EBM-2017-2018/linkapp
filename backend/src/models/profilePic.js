const mongoose = require('mongoose');

const { ItemSchema } = mongoose;

const Item = new ItemSchema({
  img:
    {
      data: Buffer,
      contentType: String,
    },
});

module.exports = mongoose.model('profilePics', Item);
