require('dotenv').config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DEV,
  DB_TEST,
  DB_HOST,
  NODE_ENV,
  CLIENT_ID_PROD,
  CLIENT_SECRET_PROD,
  CALLBACK_URL_PROD,
} = process.env;

if (NODE_ENV === 'production') {
  process.env.CLIENT_ID = CLIENT_ID_PROD;
  process.env.CLIENT_SECRET = CLIENT_SECRET_PROD;
  process.env.CALLBACK_URL = CALLBACK_URL_PROD;
}

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
