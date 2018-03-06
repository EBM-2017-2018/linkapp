/* eslint-disable no-shadow,consistent-return */
const configdb = require('./database');
const User = require('../models/user');

// seed data - documents organized by Model

const adminUserToFind = configdb.seedAdminUsername;

User.findOne({
  username: adminUserToFind,
})
  .exec((err, user) => {
    if (err) {
      return console.error(err);
    } else if (user) {
      return console.log('Already seeded');
    }
    const adminUser = new User({
      username: configdb.seedAdminUsername,
      password: configdb.seedAdminPassword,
      role: 'administrateur',
      nom: 'root',
      prenom: 'root',
      email: 'root@root.fr',

    });
    adminUser.save((err, seeded) => {
      if (err) {
        return console.error(err);
      }
      return console.log('Seeded', seeded);
    });
  });

const studentUserToFind = configdb.seedStudentUsername;

User.findOne({
  username: studentUserToFind,
})
  .exec((err, user) => {
    if (err) {
      return console.error(err);
    } else if (user) {
      return console.log('Already seeded');
    }
    const adminUser = new User({
      username: configdb.seedStudentUsername,
      password: configdb.seedStudentPassword,
      role: 'etudiant',
      nom: 'root',
      prenom: 'root',
      email: 'root@etudiant.fr',

    });
    adminUser.save((err, seeded) => {
      if (err) {
        return console.error(err);
      }
      return console.log('Seeded', seeded);
    });
  });
