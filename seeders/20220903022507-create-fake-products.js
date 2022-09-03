'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products', [
      {
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        stock: 94,
        category_id: 1,
        thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
      },
      {
        title: "iPhone X",
        description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        price: 899,
        stock: 34,
        category_id: 1,
        thumbnail: "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
      },
      {
        title: "MacBook Pro",
        description: "MacBook Pro 2021 with mini-LED display may launch between September, November",
        price: 1749,
        stock: 83,
        category_id: 2,
        thumbnail: "https://dummyjson.com/image/i/products/6/thumbnail.png",
      },
      {
        title: "perfume Oil",
        description: "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
        price: 13,
        stock: 65,
        category_id: 3,
        thumbnail: "https://dummyjson.com/image/i/products/11/thumbnail.jpg"
      },
      {
        title: "HP Pavilion 15-DK1056WM",
        description: "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
        price: 1099,
        stock: 89,
        category_id: 2,
        thumbnail: "https://dummyjson.com/image/i/products/10/thumbnail.jpeg",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('products', null, {});
  }
};
