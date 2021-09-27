const Sequelize = require('sequelize');
const sequelize = require('../config/dbConnection');

const User = sequelize.define('user', {
  user_id: {
    type: Sequelize.STRING,
    unique: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  postcode: {
    type: Sequelize.INTEGER,
  },
});

module.exports = User;
