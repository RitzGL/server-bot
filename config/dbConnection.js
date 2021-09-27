const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'sqlite',
  logging: true,
  storage: '../db/database.sqlite',
});

module.exports = sequelize;
