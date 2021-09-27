const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('database', 'user', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'sqlite',
  logging: true,
  storage: path.join(__dirname, '..', 'db/database.sqlite'),
});

module.exports = sequelize;
