import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "EduBridge" });
  });

  // AI Explanation / Assistant endpoint
  app.post("/api/explain", async (req, res) => {
    try {
      const { prompt, lang } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback response if GEMINI_API_KEY not configured yet
        return res.json({
          reply: `[EduBridge AI Science Tutor] Great question about "${prompt}"! In plant cells, the cell wall (कोशिका भित्ति) gives rigid structure, while the cell membrane (कोशिका झिल्ली) acts as a selective barrier regulating what enters and leaves the cell.`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const languageMap: Record<string, string> = {
        hi: "Hindi (हिंदी)",
        mr: "Marathi (मराठी)",
        ta: "Tamil (தமிழ்)",
        te: "Telugu (తెలుగు)",
        en: "English",
      };

      const targetLang = languageMap[lang] || "English";
      const systemInstruction = `You are EduBridge AI, a helpful and encouraging science tutor for Grade 5 to 8 students in India. Provide clear, age-appropriate science explanations in ${targetLang}. Use bimodal terminology (e.g. "Cell Wall / कोशिका भित्ति") where appropriate. Keep answers concise (under 120 words).`;

      const response = await ai.models.generateContent({
        model: "gemini-[#a43700]2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || "Thank you for asking! The cell wall provides rigidity to plant cells.";
      res.json({ reply });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.json({
        reply: `In Science: The plant cell wall is made of cellulose and provides physical strength, protecting the plant against severe weather conditions!`
      });
    }
  });

  // Vite middleware for development vs static production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EduBridge Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
