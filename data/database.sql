CREATE DATABASE products;

CREATE TABLE product(
  id SERIAL PRIMARY KEY,
  title VARCHAR(25),
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

INSERT INTO product (
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
  images
  )
  VALUES (
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
  );


INSERT INTO product (
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
  images
  )
  VALUES (
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
  );