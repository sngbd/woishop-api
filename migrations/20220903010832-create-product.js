'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('products', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      category_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      thumbnail: {
        allowNull: false,
        type: DataTypes.TEXT
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('products');
  }
};