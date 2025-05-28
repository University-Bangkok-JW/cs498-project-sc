const express = require("express");
const session = require("express-session");
const path = require("path");

const indexRoute = require("./routes/index");
const chatRoute = require("./routes/chat");
const userRoute = require('./routes/user');

// Utility functions for database and user setup
const { ensureDatabaseExists } = require("./utils/fileHandler");
const { addUser } = require("./utils/userHandler");

const app = express();

// Middleware
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
  })
);

ensureDatabaseExists().then(() => {
  // Add default admin and user accounts
  return Promise.all([
    addUser("jetsada", "admin@example.com", "admin", "1234"),
    addUser("owen", "user@example.com", "user", "1234")
  ]);
}).then(() => {
  console.log("Default users added.");
}).catch((err) => {
  console.error("Database setup error:", err);
});

// Route mounting
app.use("/", indexRoute);
app.use("/chat", chatRoute);
app.use("/api/user", userRoute)

// Catch-all route to handle undefined routes
app.use((req, res) => {
  res.redirect("/");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
