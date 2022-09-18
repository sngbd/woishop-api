require('dotenv').config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DEV,
  DB_TEST,
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
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
