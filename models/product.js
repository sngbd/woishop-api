'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category }) {
      // define association here
      this.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
    }
  }
  Product.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    stock: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    thumbnail: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: 'products',
    modelName: 'Product',
  });
  return Product;
};