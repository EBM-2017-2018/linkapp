/* eslint-disable no-shadow,consistent-return */
const configdb = require('./database');
const User = require('../models/user');

// seed data : ajoute des utilisateurs de base

const adminUserToFind = configdb.seedAdminUsername;

User.findOne({
  username: adminUserToFind,
})
  .exec((err, user) => {
    if (err) {
      return console.error(err);
    } else if (user) {
      return console.log('Admin already seeded');
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
      return console.log('Student already seeded');
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

const interUserToFind = configdb.seedInterUsername;

User.findOne({
  username: interUserToFind,
})
  .exec((err, user) => {
    if (err) {
      return console.error(err);
    } else if (user) {
      return console.log('Intervenant Already seeded');
    }
    const interUser = new User({
      username: configdb.seedInterUsername,
      password: configdb.seedInterPassword,
      role: 'intervenant',
      nom: 'root',
      prenom: 'root',
      email: 'root@etudiant.fr',

    });
    interUser.save((err, seeded) => {
      if (err) {
        return console.error(err);
      }
      return console.log('Seeded', seeded);
    });
  });
