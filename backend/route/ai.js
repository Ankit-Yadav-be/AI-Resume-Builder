// backend/routes/ai.js
const express = require("express");
const router = express.Router();
const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const apiKey = process.env.VITE_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

router.post("/generate-summary", async (req, res) => {
  try {
    const { positionTitle } = req.body;

    const chat = model.startChat({
      generationConfig,
      history: [],
    });

    const prompt = `positionTitle: ${positionTitle}, based on this position title, give me 5-6 bullet points for my resume in HTML format.`;

    const result = await chat.sendMessage(prompt);
    const text = await result.response.text();

    res.json({ summary: text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Gemini AI generation failed" });
  }
});

module.exports = router;
