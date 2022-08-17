CREATE DATABASE products;
\c products

CREATE TABLE IF NOT EXISTS product(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50),
  description VARCHAR(255),
  price INTEGER,
  discountPercentage REAL,
  rating REAL,
  stock INTEGER,
  brand VARCHAR(25),
  category VARCHAR(25),
  thumbnail TEXT,
  images TEXT[]
);

INSERT INTO product
  VALUES (
    DEFAULT,
    'iPhone 9',
    'An apple mobile which is nothing like apple',
    549,
    12.96,
    4.69,
    94,
    'Apple',
    'smartphones',
    'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
    '{
      "https://dummyjson.com/image/i/products/1/1.jpg",
      "https://dummyjson.com/image/i/products/1/2.jpg",
      "https://dummyjson.com/image/i/products/1/3.jpg",
      "https://dummyjson.com/image/i/products/1/4.jpg",
      "https://dummyjson.com/image/i/products/1/thumbnail.jpg"
    }'
  ),
  (
    DEFAULT,
    'Tree Oil 30ml',
    'Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria',
    12,
    4.09,
    4.52,
    78,
    'Hemani Tea',
    'skincare',
    'https://dummyjson.com/image/i/products/17/thumbnail.jpg',
    '{
      "https://dummyjson.com/image/i/products/17/1.jpg",
      "https://dummyjson.com/image/i/products/17/2.jpg",
      "https://dummyjson.com/image/i/products/17/3.jpg",
      "https://dummyjson.com/image/i/products/17/thumbnail.jpg"
    }'
  ),
  (
    DEFAULT,
    'Samsung Universe 9',
    'Samsung''s new variant which goes beyond Galaxy to the Universe',
    1249,
    15.46,
    4.09,
    36,
    'Samsung',
    'smartphones',
    'https://dummyjson.com/image/i/products/3/thumbnail.jpg',
    '{
      "https://dummyjson.com/image/i/products/3/1.jpg"
    }'
  ),
  (
    DEFAULT,
    'MacBook Pro',
    'MacBook Pro 2021 with mini-LED display may launch between September, November',
    1749,
    11.02,
    4.57,
    83,
    'Apple',
    'laptops',
    'https://dummyjson.com/image/i/products/6/thumbnail.png',
    '{
      "https://dummyjson.com/image/i/products/6/1.png",
      "https://dummyjson.com/image/i/products/6/2.jpg",
      "https://dummyjson.com/image/i/products/6/3.png",
      "https://dummyjson.com/image/i/products/6/4.jpg"
    }'
  ),
  (
    DEFAULT,
    'Microsoft Surface Laptop 4',
    'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
    1499,
    10.23,
    4.43,
    68,
    'Microsoft Surface',
    'laptops',
    'https://dummyjson.com/image/i/products/8/thumbnail.jpg',
    '{
      "https://dummyjson.com/image/i/products/8/1.jpg",
      "https://dummyjson.com/image/i/products/8/2.jpg",
      "https://dummyjson.com/image/i/products/8/3.jpg",
      "https://dummyjson.com/image/i/products/8/4.jpg",
      "https://dummyjson.com/image/i/products/8/thumbnail.jpg"
    }'
  );