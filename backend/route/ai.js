import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

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
    const { prompt } = req.body;

    const chat = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    const text = await result.response.text();

    res.json({ summary: text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Gemini AI generation failed" });
  }
});

export default router;
