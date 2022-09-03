'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  OTP.init({
    user_id: DataTypes.INTEGER,
    expires_at: DataTypes.BIGINT,
    otp: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: 'otps',
    modelName: 'OTP',
  });
  return OTP;
};