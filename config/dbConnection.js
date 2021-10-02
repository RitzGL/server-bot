const Sequelize = require('sequelize');
const path = require('path');

// const localSequelize = new Sequelize(
//   'database',
//   'user',
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'sqlite',
//     logging: true,
//     storage: path.join(__dirname, '..', 'db/database.sqlite'),
//   }
// );

// const prodSequelize = new Sequelize(process.env.DATABASE_URL, {
//   logging: true,
// });

function sequelize() {
  // in production use the linked mySQL container
  if (process.env.ENV === 'prod') {
    return new Sequelize(process.env.DATABASE_URL, {
      logging: true,
    });
  }
  // if running localling user/build an sql db
  return new Sequelize('database', 'user', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: true,
    storage: path.join(__dirname, '..', 'db/database.sqlite'),
  });
}

// const sequelize = process.env.ENV === 'prod' ? prodSequelize : localSequelize;

module.exports = sequelize();
