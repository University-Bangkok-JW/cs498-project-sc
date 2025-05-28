const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Ai = sequelize.define(
  "Ai",
  {
    ai_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ai_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ai_created_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ai_last_updated_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "ais",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Ai;
