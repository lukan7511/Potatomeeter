import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, "public");

app.disable("x-powered-by");

app.use(express.json({ limit: "1mb" }));

/*
|--------------------------------------------------------------------------
| Static files
|--------------------------------------------------------------------------
*/

app.use(
  express.static(publicDir, {
    fallthrough: true,
    index: false,
    extensions: false
  })
);

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    mode: "local",
    ai_required: false,
    version: "4.0.0"
  });
});

/*
|--------------------------------------------------------------------------
| Favicon
|--------------------------------------------------------------------------
|
| Это убирает бессмысленный GET /favicon.ico -> 404 в консоли браузера.
|
*/

app.get("/favicon.ico", (_req, res) => {
  res.status(204).end();
});

/*
|--------------------------------------------------------------------------
| Main page
|--------------------------------------------------------------------------
*/

app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

/*
|--------------------------------------------------------------------------
| API fallback
|--------------------------------------------------------------------------
*/

app.use("/api", (_req, res) => {
  res.status(404).json({
    ok: false,
    error: "API endpoint not found"
  });
});

/*
|--------------------------------------------------------------------------
| Unknown routes
|--------------------------------------------------------------------------
*/

app.use((_req, res) => {
  res.status(404).send("Not found");
});

/*
|--------------------------------------------------------------------------
| Error handler
|--------------------------------------------------------------------------
*/

app.use((err, _req, res, _next) => {
  console.error("SERVER ERROR:", err);

  if (res.headersSent) {
    return;
  }

  res.status(500).json({
    ok: false,
    error: "Внутренняя ошибка сервера"
  });
});

/*
|--------------------------------------------------------------------------
| Start
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
  console.log("");
  console.log("🥔 Potato Meter 4.0");
  console.log("--------------------------------");
  console.log(`🚀 http://localhost:${PORT}`);
  console.log(`❤️  http://localhost:${PORT}/api/health`);
  console.log(`📁 Static files: ${publicDir}`);
  console.log("🤖 AI/API: OFF — полностью локальный режим");
  console.log("--------------------------------");
  console.log("");
});