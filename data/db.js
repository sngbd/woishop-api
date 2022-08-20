const { Pool } = require('pg');

const {
  PG_USER,
  PG_PASSWORD,
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
} = process.env;

const pool = new Pool({
  user: PG_USER,
  password: PG_PASSWORD,
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
});

module.exports = pool;
