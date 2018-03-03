const mongoose = require('mongoose');

const { Schema } = mongoose;

const Promo = new Schema({
  nomPromo: {
    type: String,
    unique: true,
    required: true,
  },
  membres: {
    type: [String],
  },
  responsable: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Promo', Promo);
