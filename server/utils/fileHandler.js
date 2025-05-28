const sequelize = require("../db/database");

// Import all models to register them with Sequelize
require("../models/User");
require("../models/Ai");
require("../models/FeedBack");
require("../models/Product");

/**
 * Ensures the database connection is valid and tables are synchronized.
 * WARNING: force: true will drop and recreate all tables.
 */
async function ensureDatabaseExists() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL database.");
    await sequelize.sync({ force: true }); // WARNING: This will delete existing data
    console.log("Database is ready.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

module.exports = { ensureDatabaseExists };
