'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};