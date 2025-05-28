const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const FeedBack = sequelize.define(
  "FeedBack",
  {
    fb_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ai_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ais",
        key: "ai_id",
      },
      onDelete: "CASCADE",
    },
    fb_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fb_created_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "feedbacks",
    timestamps: false,
    underscored: true,
  }
);

module.exports = FeedBack;
