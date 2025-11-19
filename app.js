import dotenv from "dotenv";
dotenv.config();
// ...existing code...
import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Healthcheck
app.get("/api/health", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ ok: rows[0]?.ok === 1, ts: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, error: "DB connection failed" });
  }
});

// ...existing code (rotas de tasks) ...

// Subir servidor
const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));