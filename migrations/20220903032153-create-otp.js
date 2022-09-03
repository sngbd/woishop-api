'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('otps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      expires_at: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      otp: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('otps');
  }
};