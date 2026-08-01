import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // Initialize Gemini client server-side securely
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });

  // API endpoint for AI Tutor Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = `You are 'MindSparQ AI Tutor', a helpful, highly knowledgeable AI assistant for MindSparQ Education & Technology in Nepal.
Your core tasks:
1. Help users navigate the platform (e.g. Course Catalog, Instructional Feed, Member Portal, Teacher Verification, Admin Panel).
2. Answer questions about MindSparQ courses (Academic Programs, Software Engineering, AI & Data Science, Abacus, Vedic Math, School Solutions, DevOps).
3. Summarize tech concepts, programming topics, and learning materials.
4. Support English, Nepali (नेपाली), and Easy Chinese. Current UI language is '${language || 'en'}'. If user messages in Nepali or requests Nepali output, respond in warm, natural Nepali.

Be concise, friendly, well-structured, and use markdown where appropriate.`;

      const contents: any[] = [];
      if (Array.isArray(history)) {
        for (const item of history) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }]
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      const reply = response.text || "I am currently unable to answer that question. Please check our course catalog for more details!";
      res.json({ reply });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.status(500).json({
        error: "Failed to generate response",
        reply: "Namaste! I am experiencing temporary connectivity issues. Please try again in a moment or explore our course catalog."
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
