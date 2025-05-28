const express = require("express");
const axios = require("axios");
const router = express.Router();

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_TOKEN || "DefaultApiKey";

router.get("/", async (req, res) => {
  const userMessage = req.query.message || "Hi there!";

  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage },
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || "No response from DeepSeek.";
    res.json({ response: reply });
  } catch (err) {
    console.error("DeepSeek API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get response from DeepSeek-Chat." });
  }
});

module.exports = router;
