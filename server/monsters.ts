/**
 * Kaveer's Monster Party — guestbook backend.
 *
 * Kids (with a parent) build a monster/unicorn/princess/cartoon-me on the
 * laptop at /kaveer, we generate the picture through OpenRouter (Gemini image
 * models), and saved monsters show up in the slideshow at /kaveer/tv.
 *
 * Storage: a `party_monsters` table created on first use (CREATE TABLE IF NOT
 * EXISTS — no migration step needed). If the database is unreachable we fall
 * back to an in-memory list so the party still works.
 */
import type { Express, Request, Response } from "express";
import { pool } from "@db";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MonsterMeta {
  id: number;
  name: string;
  message: string;
  creature: string;
  createdAt: string;
}

interface MonsterRow extends MonsterMeta {
  image: string; // data URL
}

export interface MonsterSpec {
  creature: string;
  color: string;
  hairStyle: string;
  hairColor: string;
  accessories: string[];
  photo?: string; // data URL of a webcam photo (optional, for "cartoon me")
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------

/** Fallback rows live above any plausible DB id so the two never collide and
 *  can be listed together once the database comes back. */
const MEMORY_ID_BASE = 1_000_000;
const memory: MonsterRow[] = [];
let memoryNextId = MEMORY_ID_BASE;
let dbReady: Promise<boolean> | null = null;

function ensureTable(): Promise<boolean> {
  if (!dbReady) {
    dbReady = pool
      .query(`
        CREATE TABLE IF NOT EXISTS party_monsters (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          message TEXT NOT NULL,
          creature TEXT NOT NULL,
          image TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
      .then(() => {
        console.log("🎉 [monsters] party_monsters table ready");
        return true;
      })
      .catch((err) => {
        console.error("🎉 [monsters] database unavailable, using in-memory store:", err?.message ?? err);
        dbReady = null; // allow a retry on the next call
        return false;
      });
  }
  return dbReady;
}

async function listMonsters(): Promise<MonsterMeta[]> {
  const fromMemory: MonsterMeta[] = memory.map(({ image: _image, ...meta }) => meta);
  if (!(await ensureTable())) return fromMemory;
  const result = await pool.query(
    `SELECT id, name, message, creature, created_at FROM party_monsters ORDER BY created_at ASC, id ASC`,
  );
  const fromDb: MonsterMeta[] = result.rows.map((r: any) => ({
    id: Number(r.id),
    name: r.name,
    message: r.message,
    creature: r.creature,
    createdAt: new Date(r.created_at).toISOString(),
  }));
  // Rows saved while the database was down stay in the show after it recovers.
  return [...fromDb, ...fromMemory].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

async function saveMonster(input: Omit<MonsterRow, "id" | "createdAt">): Promise<MonsterMeta> {
  if (await ensureTable()) {
    try {
      const result = await pool.query(
        `INSERT INTO party_monsters (name, message, creature, image)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, message, creature, created_at`,
        [input.name, input.message, input.creature, input.image],
      );
      const r = result.rows[0];
      return {
        id: Number(r.id),
        name: r.name,
        message: r.message,
        creature: r.creature,
        createdAt: new Date(r.created_at).toISOString(),
      };
    } catch (err) {
      console.error("🎉 [monsters] insert failed, falling back to memory:", err);
    }
  }
  const row: MonsterRow = {
    id: memoryNextId++,
    createdAt: new Date().toISOString(),
    ...input,
  };
  memory.push(row);
  const { image: _image, ...meta } = row;
  return meta;
}

async function getMonsterImage(id: number): Promise<string | null> {
  if (id < MEMORY_ID_BASE && (await ensureTable())) {
    const result = await pool.query(`SELECT image FROM party_monsters WHERE id = $1`, [id]);
    if (result.rows[0]?.image) return result.rows[0].image as string;
  }
  return memory.find((m) => m.id === id)?.image ?? null;
}

async function deleteMonster(id: number): Promise<boolean> {
  let removed = false;
  if (id < MEMORY_ID_BASE && (await ensureTable())) {
    const result = await pool.query(`DELETE FROM party_monsters WHERE id = $1`, [id]);
    removed = (result.rowCount ?? 0) > 0;
  }
  const idx = memory.findIndex((m) => m.id === id);
  if (idx >= 0) {
    memory.splice(idx, 1);
    removed = true;
  }
  return removed;
}

// ---------------------------------------------------------------------------
// Image generation (OpenRouter → Gemini image models)
// ---------------------------------------------------------------------------

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const REQUEST_TIMEOUT_MS = 90_000;

/** Tried in order; the first one that returns an image wins. */
const IMAGE_MODELS = [
  "google/gemini-2.5-flash-image",
  "google/gemini-3.1-flash-image-preview",
];

function getOpenRouterKey(): string | undefined {
  return (
    process.env.OPENROUTER_API_KEY ||
    process.env.OPENROUTER_API_KEY_U2C ||
    process.env.OPENROUTER_API_KEY_KIDSCRIBE
  );
}

export function isMonsterGenerationConfigured(): boolean {
  return !!getOpenRouterKey();
}

const STYLE =
  "Style: adorable children's picture-book illustration, bold clean outlines, bright flat colors, " +
  "soft shading, big friendly eyes, huge happy smile. Centered, full body, facing the viewer, " +
  "plain soft pastel background with a few confetti sparkles. No text, no letters, no watermark.";

function joinList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function buildMonsterPrompt(spec: MonsterSpec): string {
  const accessories = spec.accessories.length
    ? `They are wearing or holding ${joinList(spec.accessories)}.`
    : "";
  const hair =
    spec.hairStyle && spec.hairStyle !== "no hair"
      ? `They have ${spec.hairStyle} hair that is ${spec.hairColor}.`
      : "They have no hair on their head.";

  if (spec.photo) {
    return (
      `Turn the child in this photo into a cute cartoon character for a 5-year-old's birthday party. ` +
      `Keep their face clearly recognizable and friendly. Give them ${spec.hairStyle === "no hair" ? "their own hair" : `${spec.hairStyle} hair that is ${spec.hairColor}`} ` +
      `and dress them as a ${spec.creature} in a ${spec.color} outfit. ${accessories} ` +
      `They are cheering and celebrating a birthday. ${STYLE}`
    );
  }

  return (
    `A cute, friendly, whimsical cartoon ${spec.creature} for a 5-year-old's birthday party. ` +
    `Its body is ${spec.color}. ${hair} ${accessories} ` +
    `It is cheering and celebrating a birthday. ${STYLE}`
  );
}

interface OpenRouterResponse {
  choices?: {
    message?: { content?: string; images?: { image_url?: { url?: string } }[] };
  }[];
  error?: { message?: string };
}

async function requestImage(model: string, prompt: string, photo?: string): Promise<string> {
  const apiKey = getOpenRouterKey();
  if (!apiKey) throw new Error("OpenRouter API key is not set (OPENROUTER_API_KEY)");

  const content: Array<
    { type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }
  > = [{ type: "text", text: prompt }];
  if (photo) content.push({ type: "image_url", image_url: { url: photo } });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const started = Date.now();
  console.log(`🎉 [monsters] → ${model}${photo ? " (with photo)" : ""}`);

  let response: globalThis.Response;
  try {
    response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://stickywicketlabs.com",
        "X-Title": "Kaveer's Monster Party",
      },
      body: JSON.stringify({
        model,
        modalities: ["image", "text"],
        messages: [{ role: "user", content }],
      }),
      signal: controller.signal,
    });
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    throw new Error(aborted ? "The picture took too long. Try again!" : (err as Error).message);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    let message = `OpenRouter request failed (${response.status})`;
    try {
      const parsed = JSON.parse(text) as OpenRouterResponse;
      if (parsed.error?.message) message = parsed.error.message;
    } catch {
      if (text) message = text.slice(0, 300);
    }
    throw new Error(message);
  }

  const data = (await response.json()) as OpenRouterResponse;
  if (data.error?.message) throw new Error(data.error.message);

  const message = data.choices?.[0]?.message;
  const url = message?.images?.find((i) => i.image_url?.url)?.image_url?.url;
  if (!url) {
    const text = message?.content?.trim();
    throw new Error(text ? `Model returned text instead of an image: ${text.slice(0, 200)}` : "No image returned");
  }
  console.log(`🎉 [monsters] ✓ ${model} in ${Date.now() - started}ms`);
  return url.startsWith("data:") ? url : `data:image/png;base64,${url}`;
}

export async function generateMonsterImage(spec: MonsterSpec): Promise<string> {
  const prompt = buildMonsterPrompt(spec);
  let lastError: Error | null = null;
  for (const model of IMAGE_MODELS) {
    try {
      return await requestImage(model, prompt, spec.photo);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(`🎉 [monsters] ✗ ${model}: ${lastError.message}`);
    }
  }
  throw lastError ?? new Error("Image generation failed");
}

// ---------------------------------------------------------------------------
// Abuse controls for the paid generate route
// ---------------------------------------------------------------------------
// The whole party shares one laptop (one IP), so the per-IP cap is generous;
// the global cap bounds OpenRouter spend if the public URL gets hammered.

const LIMIT_WINDOW_MS = 60 * 60 * 1000;
const PER_IP_PER_WINDOW = 60;
const GLOBAL_PER_WINDOW = 400;
const MAX_CONCURRENT = 4;

const ipHits = new Map<string, number[]>();
let globalHits: number[] = [];
let inFlight = 0;

function prune(times: number[], now: number): number[] {
  return times.filter((t) => now - t < LIMIT_WINDOW_MS);
}

/** Returns a reason when the request should be refused, else null (and records the hit). */
function checkGenerateLimits(ip: string): string | null {
  const now = Date.now();
  globalHits = prune(globalHits, now);
  const mine = prune(ipHits.get(ip) ?? [], now);
  if (inFlight >= MAX_CONCURRENT) return "Too many pictures being made right now. Wait a moment and try again!";
  if (mine.length >= PER_IP_PER_WINDOW) return "That's a lot of monsters! Take a little break and try again soon.";
  if (globalHits.length >= GLOBAL_PER_WINDOW) return "The monster machine needs a rest. Try again in a little while!";
  mine.push(now);
  ipHits.set(ip, mine);
  globalHits.push(now);
  // Keep the map from growing without bound.
  if (ipHits.size > 1000) {
    ipHits.forEach((times, key) => {
      if (prune(times, now).length === 0) ipHits.delete(key);
    });
  }
  return null;
}

function isAdmin(req: Request): boolean {
  const key = process.env.PARTY_ADMIN_KEY;
  if (!key) return false;
  const provided = req.get("x-party-key") ?? (typeof req.query.key === "string" ? req.query.key : "");
  return provided === key;
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

const MAX_TEXT = 200;

function cleanText(value: unknown, fallback: string, max = MAX_TEXT): string {
  const s = typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
  return (s || fallback).slice(0, max);
}

function cleanList(value: unknown, max = 6): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim().slice(0, 60))
    .filter(Boolean)
    .slice(0, max);
}

function isDataImage(value: unknown): value is string {
  return typeof value === "string" && /^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/.test(value);
}

export function registerMonsterRoutes(app: Express) {
  app.get("/api/monsters/status", (_req: Request, res: Response) => {
    res.json({ configured: isMonsterGenerationConfigured() });
  });

  app.get("/api/monsters", async (_req: Request, res: Response) => {
    try {
      res.setHeader("Cache-Control", "no-store");
      res.json(await listMonsters());
    } catch (err) {
      console.error("🎉 [monsters] list failed:", err);
      res.status(500).json({ error: "Could not load monsters" });
    }
  });

  app.get("/api/monsters/:id/image", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).end();
    try {
      const dataUrl = await getMonsterImage(id);
      if (!dataUrl) return res.status(404).end();
      const comma = dataUrl.indexOf(",");
      const mime = dataUrl.slice(5, dataUrl.indexOf(";")) || "image/png";
      const buffer = Buffer.from(dataUrl.slice(comma + 1), "base64");
      res.setHeader("Content-Type", mime);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.send(buffer);
    } catch (err) {
      console.error("🎉 [monsters] image failed:", err);
      res.status(500).end();
    }
  });

  app.post("/api/monsters/generate", async (req: Request, res: Response) => {
    if (!isMonsterGenerationConfigured()) {
      return res.status(503).json({ error: "Image generation is not set up (missing OPENROUTER_API_KEY)." });
    }
    const refusal = checkGenerateLimits(req.ip ?? "unknown");
    if (refusal) return res.status(429).json({ error: refusal });
    const body = req.body ?? {};
    const spec: MonsterSpec = {
      creature: cleanText(body.creature, "monster", 60),
      color: cleanText(body.color, "rainbow", 60),
      hairStyle: cleanText(body.hairStyle, "fluffy", 60),
      hairColor: cleanText(body.hairColor, "purple", 60),
      accessories: cleanList(body.accessories),
      photo: isDataImage(body.photo) ? body.photo : undefined,
    };
    inFlight += 1;
    try {
      const image = await generateMonsterImage(spec);
      res.json({ image });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Image generation failed";
      res.status(502).json({ error: message });
    } finally {
      inFlight -= 1;
    }
  });

  app.post("/api/monsters", async (req: Request, res: Response) => {
    const body = req.body ?? {};
    if (!isDataImage(body.image)) {
      return res.status(400).json({ error: "A generated picture is required." });
    }
    if (body.image.length > 12_000_000) {
      return res.status(413).json({ error: "Picture is too large." });
    }
    try {
      const saved = await saveMonster({
        name: cleanText(body.name, "A friend", 60),
        message: cleanText(body.message, "Happy Birthday Kaveer!"),
        creature: cleanText(body.creature, "monster", 60),
        image: body.image,
      });
      res.status(201).json(saved);
    } catch (err) {
      console.error("🎉 [monsters] save failed:", err);
      res.status(500).json({ error: "Could not save the monster" });
    }
  });

  // Destructive: requires the PARTY_ADMIN_KEY secret (header x-party-key or ?key=).
  // With no secret configured the route is disabled entirely.
  app.delete("/api/monsters/:id", async (req: Request, res: Response) => {
    if (!isAdmin(req)) return res.status(403).json({ error: "Not allowed" });
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).end();
    try {
      res.json({ removed: await deleteMonster(id) });
    } catch (err) {
      console.error("🎉 [monsters] delete failed:", err);
      res.status(500).json({ error: "Could not delete" });
    }
  });
}
