const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Example route: GET /api/user/:username
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: { user_name: username },
      attributes: ['user_id', 'user_name', 'user_role']
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
