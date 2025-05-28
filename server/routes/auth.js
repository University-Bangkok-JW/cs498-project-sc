const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const router = express.Router();

// POST /api/auth — Login user via API
router.post("/", async (req, res) => {
  const { user_name, password } = req.body;
  const normalizedUsername = user_name?.toLowerCase();

  try {
    const user = await User.findOne({ where: { user_name: normalizedUsername } });

    if (!user || !(await bcrypt.compare(password, user.user_password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Optionally issue a token or set session depending on your auth strategy
    req.session.userId = user.user_id;
    req.session.user = {
      user_id: user.user_id,
      user_name: user.user_name,
      user_role: user.user_role
    };

    res.json({
      message: "Login successful",
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        user_role: user.user_role
      }
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
