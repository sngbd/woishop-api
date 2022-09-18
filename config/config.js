require('dotenv').config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DEV,
  DB_TEST,
  DB_PROD,
  DB_HOST,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DEV,
    host: DB_HOST,
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_TEST,
    host: DB_HOST,
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_PROD,
    host: DB_HOST,
    define: {
      timestamps: false,
    },
  },
};
