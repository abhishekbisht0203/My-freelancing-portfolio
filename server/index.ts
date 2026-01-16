import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";

const app = express();
const httpServer = createServer(app);

/* -------- Body parsers -------- */
declare module "http" {
  interface IncomingMessage {
    rawBody?: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

/* -------- Logger -------- */
export function log(message: string, source = "express") {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${time} [${source}] ${message}`);
}

/* -------- Request logger -------- */
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  res.on("finish", () => {
    if (path.startsWith("/api")) {
      const duration = Date.now() - start;
      log(`${req.method} ${path} ${res.statusCode} ${duration}ms`);
    }
  });

  next();
});

/* -------- CORS (simple) -------- */
{
  const raw = process.env.ALLOWED_ORIGINS || "*";
  const allowed = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const allowedAll = allowed.includes("*");

  // Log CORS configuration once at startup (avoid per-request spam)
  if (!process.env.ALLOWED_ORIGINS) {
    console.log("CORS: no ALLOWED_ORIGINS set, allowing all origins (for dev). Set ALLOWED_ORIGINS in Render for production.");
  } else {
    console.log("CORS allowed origins:", allowed.join(","));
  }

  app.use((req, res, next) => {
    const origin = req.headers.origin as string | undefined;

    if (allowedAll || (origin && allowed.includes(origin))) {
      res.setHeader("Access-Control-Allow-Origin", allowedAll ? "*" : origin || "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    next();
  });
}

/* -------- App start -------- */
(async () => {
  await registerRoutes(httpServer, app);

  /* -------- Error handler -------- */
  app.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
    }
  );

  /* -------- Vite / Static -------- */
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  /* -------- Server listen (Windows safe) -------- */
  const PORT = Number(process.env.PORT) || 5000;

  httpServer.listen(PORT, () => {
    log(`Server running on http://localhost:${PORT}`);
  });
})();
