module.exports = {
  secret: 'nodeauthsecret',
  database: process.env.MONGODB_URI || 'mongodb://localhost/node-auth',
  seedAdminUsername: process.env.SEED_ADMIN_USERNAME || 'root',
  seedAdminPassword: process.env.SEED_ADMIN_PASSWORD || 'root',
  seedStudentUsername: process.env.SEED_STUDENT_USERNAME || 'student',
  seedStudentPassword: process.env.SEED_STUDENT_PASSWORD || 'student',
  seedInterUsername: process.env.SEED_INTERVENANT_USERNAME || 'inter',
  seedInterPassword: process.env.SEED_INTERVENANT_PASSWORD || 'inter',
};
