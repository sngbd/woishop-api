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
    static associate({ Category, User }) {
      // define association here
      this.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
      this.belongsToMany(User, { through: 'carts', as: 'products' });
    }
    
    toJSON() {
      return { ...this.get(), category_id: undefined };
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
  Product.addScope(
    'defaultScope', 
    { order: [['id', 'ASC']], }, 
    { override: true },
  );
  return Product;
};