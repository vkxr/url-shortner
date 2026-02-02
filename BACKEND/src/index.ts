import express, { Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import { z } from "zod";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = Number(process.env.PORT) || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// In-memory store (use DB in real production)
const db = new Map<string, { url: string; expiry: number }>();

// Zod schema for input validation
const urlSchema = z.object({
  url: z.string().url("Invalid URL"),
});

// Generate short code
function generateCode() {
  return randomBytes(4).toString("hex"); // 8 chars
}

// ✅ Create short URL
app.post("/api/shorten", (req: Request, res: Response): void => {
  const parsed = urlSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: parsed.error.issues[0].message,
    });
    return;
  }

  const code = generateCode();
  const expiry = Date.now() + 30 * 60 * 1000; // 30 min expiry

  db.set(code, { url: parsed.data.url, expiry });

  res.json({
    shortUrl: `${BASE_URL}/${code}`,
  });
});

// ✅ Redirect to original URL
app.get("/:code", (req: Request, res: Response): void => {
  const record = db.get(req.params.code);

  if (!record) {
    res.status(404).json({ error: "Short link not found" });
    return;
  }

  if (Date.now() > record.expiry) {
    res.status(410).json({ error: "Link expired" });
    return;
  }

  res.redirect(record.url);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at ${BASE_URL}`);
});
