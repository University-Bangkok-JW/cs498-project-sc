const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Product = sequelize.define(
  "Product",
  {
    prd_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    prd_brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prd_model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prd_created_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    prd_last_updated_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "products",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Product;
