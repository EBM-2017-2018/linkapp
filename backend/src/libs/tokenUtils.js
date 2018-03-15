const db = require('../config/database');
const jwt = require('jsonwebtoken');

const verifTokenInUrl = new RegExp('JWT%20')

module.exports = {
  getToken(headers) {
    if (headers && headers.authorization) {
      const parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      }
      if (verifTokenInUrl.test(headers.authorization)) {
        console.log('rexgex');
        return headers.authorization.substring(6);
      }
      console.log('marche pas');
      return null;
    }
    return null;
  },
  decodeToken(token) {
    return jwt.verify(token, db.secret);
  },
};

