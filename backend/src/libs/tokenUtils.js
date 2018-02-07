const db = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = {
  getToken(headers) {
    if (headers && headers.authorization) {
      const parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      }
      return null;
    }
    return null;
  },
  decodeToken(token) {
    return jwt.verify(token, db.secret);
  },
};

