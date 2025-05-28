// Import Sequelize ORM
const { Sequelize } = require("sequelize");

// Initialize Sequelize instance with environment variables or defaults
const sequelize = new Sequelize(
  process.env.DB_NAME || "mydb",           // Database name
  process.env.DB_USER || "postgres",       // Database user
  process.env.DB_PASSWORD || "1234",       // Database password
  {
    host: process.env.DB_HOST || "db",     // Database host (e.g., Docker service name)
    dialect: "postgres",                   // Use PostgreSQL dialect
    port: process.env.DB_PORT || 5432,     // Database port
    logging: false                         // Disable SQL logging to console
  }
);

// Export the configured Sequelize instance for use throughout the app
module.exports = sequelize;
