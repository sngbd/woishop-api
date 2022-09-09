'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
  }
};