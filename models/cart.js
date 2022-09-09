'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init({
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
  }, {
    sequelize,
    tableName: 'carts',
    modelName: 'Cart',
  });
  return Cart;
};