const express = require("express");
const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
const router = express.Router();

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_TOKEN || "DefaultApiKey";

router.get("/", async (req, res) => {
  const userMessage = req.query.message || "Hi there!";
  const lang = req.query.lang || "en-US"; // Default to English if missing

  try {
    const instructionPath = path.join(__dirname, "../data/instruction.txt");
    const instructionText = await fs.readFile(instructionPath, "utf-8");

    // Language context string (e.g. "Please reply in Thai.")
    const langHint = {
      "th-TH": "ตอบกลับเป็นภาษาไทยเท่านั้น",
      "en-US": "Respond only in English",
    }[lang] || "Respond only in English";

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: `You are a helpful assistant. ${langHint}` },
          { role: "user", content: `Only respond to the most recent input.\n\n${instructionText}\n\nUser: ${userMessage}` },
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let reply = response.data.choices?.[0]?.message?.content || "No response from DeepSeek.";
    reply = reply
      .replace(/^\[AI\]:\s*/i, "")                              // Remove '[AI]:'
      .replace(/\(?\*?Phase\s*\d+\*?\)?/gi, "")                 // Remove '(Phase X)' etc.
      .replace(/\(?Note:.*?\)?/gi, "")                          // Remove '(Note: ...)' or 'Note: ...'
      .replace(/\(?[A-Z][a-z]+:.*?\)?/gi, "")                   // Remove patterns like (Instruction: ...), (Response: ...)
      .replace(/[\*_]+/g, "")                                   // Remove stray '*' or '_'
      .replace(/^\s*[-–•]\s*/gm, "")                            // Remove bullet symbols
      .replace(/^\s*\(.*?\)\s*$/gm, "")                         // Remove lines that are *just* in parentheses
      .trim();

    res.json({ response: reply });
  } catch (err) {
    console.error("DeepSeek API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get response from DeepSeek-Chat." });
  }
});

module.exports = router;
