const express = require("express");
const session = require("express-session");
const path = require("path");

const indexRoute = require("./routes/index");
const chatRoute = require("./routes/chat");

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

// Route mounting
app.use("/", indexRoute);
app.use("/chat", chatRoute);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
