const queryAllProduct = `SELECT product.id, 
title, description, price, discount_percentage, rating, stock, 
brand.name as brand, category.name as category, thumbnail, images
FROM product
INNER JOIN category ON product.category_id=category.id
INNER JOIN brand ON product.brand_id=brand.id
ORDER BY product.id`;

const selectAllProduct = `SELECT * FROM (${queryAllProduct}) as allProduct`;

module.exports = { queryAllProduct, selectAllProduct };
