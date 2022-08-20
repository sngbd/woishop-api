CREATE DATABASE products;
\c products

CREATE TABLE IF NOT EXISTS brand(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS category(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

INSERT INTO brand (name) 
  VALUES 
    ('Apple'), 
    ('Hemani Tea'), 
    ('Samsung'), 
    ('Microsoft Surface'),
    ('OPPO'),
    ('Saaf & Khaas'),
    ('HP Pavilion'),
    ('Fair & Clear'),
    ('Baking Food Items');

INSERT INTO category (name) 
  VALUES 
    ('smartphones'), 
    ('laptops'), 
    ('skincare'),
    ('groceries');

CREATE TABLE IF NOT EXISTS product(
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  price INTEGER NOT NULL,
  discount_percentage REAL NOT NULL,
  rating REAL NOT NULL,
  stock INTEGER NOT NULL,
  brand_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  thumbnail TEXT NOT NULL,
  images TEXT[] NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brand (id) ON DELETE SET NULL,
  FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE SET NULL
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
    1,
    1,
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
    2,
    3,
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
    3,
    1,
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
    1,
    2,
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
    4,
    2,
    'https://dummyjson.com/image/i/products/8/thumbnail.jpg',
    '{
      "https://dummyjson.com/image/i/products/8/1.jpg",
      "https://dummyjson.com/image/i/products/8/2.jpg",
      "https://dummyjson.com/image/i/products/8/3.jpg",
      "https://dummyjson.com/image/i/products/8/4.jpg",
      "https://dummyjson.com/image/i/products/8/thumbnail.jpg"
    }'
  ),
  (
    DEFAULT,
    'Orange Essence Food Flavour',
    'Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item',
    14,
    8.04,
    4.85,
    26,
    9,
    4,
    'https://dummyjson.com/image/i/products/23/thumbnail.jpg',
    '{
      "https://dummyjson.com/image/i/products/23/1.jpg",
      "https://dummyjson.com/image/i/products/23/2.jpg",
      "https://dummyjson.com/image/i/products/23/3.jpg",
      "https://dummyjson.com/image/i/products/23/4.jpg",
      "https://dummyjson.com/image/i/products/23/thumbnail.jpg"
    }'
  ),
  (
    DEFAULT,
    'Freckle Treatment Cream 15gm',
    'Fair & Clear is Pakistan''s only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.',
    70,
    16.99,
    4.06,
    140,
    8,
    3,
    'https://dummyjson.com/image/i/products/20/thumbnail.jpg',
    '{
      "https://dummyjson.com/image/i/products/20/1.jpg",
      "https://dummyjson.com/image/i/products/20/2.jpg",
      "https://dummyjson.com/image/i/products/20/3.jpg",
      "https://dummyjson.com/image/i/products/20/4.jpg",
      "https://dummyjson.com/image/i/products/20/thumbnail.jpg"
    }'
  ),
  (
    DEFAULT,
    'HP Pavilion 15-DK1056WM',
    'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10',
    1099,
    6.18,
    4.43,
    89,
    7,
    2,
    'https://dummyjson.com/image/i/products/10/thumbnail.jpeg',
    '{
      "https://dummyjson.com/image/i/products/10/1.jpg",
      "https://dummyjson.com/image/i/products/10/2.jpg",
      "https://dummyjson.com/image/i/products/10/3.jpg",
      "https://dummyjson.com/image/i/products/10/thumbnail.jpeg"
    }'
  ),
  (
    DEFAULT,
    'Daal Masoor 500 grams',
    'Fine quality Branded Product Keep in a cool and dry place',
    20,
    4.81,
    4.44,
    133,
    6,
    4,
    'https://dummyjson.com/image/i/products/21/thumbnail.png',
    '{
      "https://dummyjson.com/image/i/products/21/1.png",
      "https://dummyjson.com/image/i/products/21/2.jpg",
      "https://dummyjson.com/image/i/products/21/3.jpg"
    }'
  ),
  (
    DEFAULT,
    'OPPOF19',
    'OPPO F19 is officially announced on April 2021.',
    280,
    17.91,
    4.3,
    123,
    5,
    1,
    'https://dummyjson.com/image/i/products/4/thumbnail.jpg',
    '{
      "https://dummyjson.com/image/i/products/4/1.jpg",
      "https://dummyjson.com/image/i/products/4/2.jpg",
      "https://dummyjson.com/image/i/products/4/3.jpg",
      "https://dummyjson.com/image/i/products/4/4.jpg",
      "https://dummyjson.com/image/i/products/4/thumbnail.jpg"
    }'
  );