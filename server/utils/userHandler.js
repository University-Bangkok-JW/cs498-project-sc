const bcrypt = require("bcryptjs");
const User = require("../models/User");
const validator = require("validator");

/**
 * Adds a new user to the database with a hashed password.
 * Validates email format before creation.
 *
 * @param {string} username - The username of the user
 * @param {string} email - The user's email address
 * @param {string} role - The user's role (e.g., 'admin', 'user')
 * @param {string} password - The plaintext password to be hashed
 */
async function addUser(username, email, role, password) {
  try {
    if (!validator.isEmail(email)) {
      throw new Error(`Invalid email format: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      user_name: username,
      user_email: email,
      user_role: role,
      user_password: hashedPassword
    });

    console.log("User created:", user.toJSON());
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

module.exports = { addUser };
