const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures valid email format
      },
    },
    user_role: {
      type: DataTypes.STRING(50), // Defined length for better indexing
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_created_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    user_updated_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: sequelize.literal("CURRENT_TIMESTAMP"), // Ensures update time is modified
    },
  },
  {
    tableName: "users", // Changed from `user` to `users` to avoid SQL conflicts
    timestamps: true, // Enables Sequelize to manage createdAt & updatedAt
    underscored: true, // Makes column names snake_case
  }
);

module.exports = User;
