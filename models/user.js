'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ OTP, Product }) {
      // define association here
      this.hasOne(OTP, { foreignKey: 'user_id', constraints: false });
      this.belongsToMany(Product, { through: 'carts', as: 'products' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    sub: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.TEXT,
    password_hash: DataTypes.TEXT,
    verified: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};