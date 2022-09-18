require('dotenv').config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DEV,
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
    username: 'me',
    password: 'passwd',
    database: 'woishop_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
  },
  production: {
    username: 'me',
    password: 'passwd',
    database: 'woishop_prod',
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
  },
};
