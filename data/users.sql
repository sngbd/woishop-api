\c products

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone_number TEXT NOT NULL,
  password_hash TEXT NOT NULL
);