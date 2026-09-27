import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  COLORS,
  CREATURES,
  EXTRAS,
  GENERATING_LINES,
  HAIR_STYLES,
  MAX_EXTRAS,
  QUICK_MESSAGES,
  type ColorTile,
  type Tile,
} from "./options";

type StepId = "creature" | "color" | "hair" | "extras" | "photo" | "message" | "generating" | "result" | "done";

const STEP_TITLES: Record<StepId, string> = {
  creature: "Who do you want to make?",
  color: "Pick a color!",
  hair: "What kind of hair?",
  extras: "Add some fun stuff!",
  photo: "Say cheese! 📸",
  message: "Tell Kaveer something!",
  generating: "Making magic...",
  result: "Ta-da! 🎉",
  done: "You're at the party!",
};

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function BigTile({
  tile,
  selected,
  onClick,
  disabled,
}: {
  tile: Tile;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`party-tile ${selected ? "party-tile-selected" : ""} ${disabled ? "opacity-40" : ""}`}
    >
      <span className="text-5xl md:text-6xl leading-none" aria-hidden>
        {tile.emoji}
      </span>
      <span className="font-display font-bold text-xl md:text-2xl text-ink">{tile.label}</span>
    </button>
  );
}

function ColorBlob({
  color,
  selected,
  onClick,
  size = "large",
}: {
  color: ColorTile;
  selected: boolean;
  onClick: () => void;
  size?: "large" | "small";
}) {
  const dim = size === "large" ? "w-28 h-28 md:w-36 md:h-36" : "w-16 h-16 md:w-20 md:h-20";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={color.label}
      className={`party-blob ${dim} ${selected ? "party-blob-selected" : ""}`}
      style={{ background: color.css }}
    >
      {selected && <span className="text-4xl drop-shadow">✔️</span>}
    </button>
  );
}

function BigButton({
  children,
  onClick,
  variant = "go",
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "go" | "back" | "soft";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`party-button party-button-${variant}`}>
      {children}
    </button>
  );
}

/** Shrinks a webcam frame so uploads stay small and fast. */
function captureFrame(video: HTMLVideoElement, maxSize = 640): string | null {
  const w = video.videoWidth;
  const h = video.videoHeight;
  if (!w || !h) return null;
  const scale = Math.min(1, maxSize / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  // Mirror so it matches what the child saw in the preview.
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}

function fileToDataUrl(file: File, maxSize = 640): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no canvas"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => reject(new Error("Could not read that picture"));
    img.src = url;
  });
}

// ---------------------------------------------------------------------------
// Webcam step
// ---------------------------------------------------------------------------

function PhotoStep({ photo, onPhoto }: { photo: string | null; onPhoto: (p: string | null) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [camError, setCamError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (photo) return; // camera off while previewing
    let cancelled = false;
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
      } catch (err) {
        setCamError(err instanceof Error ? err.message : "Camera not available");
      }
    };
    start();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [photo]);

  const snap = () => {
    if (countdown !== null) return;
    let n = 3;
    setCountdown(n);
    const tick = setInterval(() => {
      n -= 1;
      if (n <= 0) {
        clearInterval(tick);
        setCountdown(null);
        const frame = videoRef.current ? captureFrame(videoRef.current) : null;
        if (frame) onPhoto(frame);
        else setCamError("Oops, the camera wasn't ready. Try again!");
      } else {
        setCountdown(n);
      }
    }, 1000);
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      onPhoto(await fileToDataUrl(file));
    } catch (err) {
      setCamError(err instanceof Error ? err.message : "Could not read that picture");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-xl aspect-video rounded-3xl overflow-hidden bg-ink/10 shadow-xl border-8 border-white">
        {photo ? (
          <img src={photo} alt="Your photo" className="w-full h-full object-cover" />
        ) : (
          <video ref={videoRef} playsInline muted className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
        )}
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span key={countdown} className="party-pop font-display font-bold text-white text-[10rem] leading-none drop-shadow-lg">
              {countdown}
            </span>
          </div>
        )}
        {camError && !photo && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/90 p-6 text-center">
            <span className="text-5xl">🙈</span>
            <p className="font-display text-xl text-ink">No camera here. Pick a photo instead!</p>
            <p className="text-ink-light text-sm">{camError}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {photo ? (
          <BigButton variant="soft" onClick={() => onPhoto(null)}>
            🔄 Take it again
          </BigButton>
        ) : (
          <>
            {!camError && (
              <BigButton onClick={snap} disabled={countdown !== null}>
                📸 Take my photo!
              </BigButton>
            )}
            <label className="party-button party-button-soft cursor-pointer">
              🖼️ Pick a photo
              <input type="file" accept="image/*" capture="user" className="hidden" onChange={onFile} />
            </label>
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function KaveerCreatePage() {
  const [step, setStep] = useState<StepId>("creature");
  const [creature, setCreature] = useState<Tile | null>(null);
  const [color, setColor] = useState<ColorTile | null>(null);
  const [hairStyle, setHairStyle] = useState<Tile | null>(null);
  const [hairColor, setHairColor] = useState<ColorTile | null>(null);
  const [extras, setExtras] = useState<Tile[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState(QUICK_MESSAGES[0]);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/monsters/status")
      .then((r) => r.json())
      .then((d) => setConfigured(!!d.configured))
      .catch(() => setConfigured(null));
  }, []);

  // Rotate the fun "working on it" lines while generating.
  useEffect(() => {
    if (step !== "generating") return;
    setLineIdx(0);
    const t = setInterval(() => setLineIdx((i) => (i + 1) % GENERATING_LINES.length), 2500);
    return () => clearInterval(t);
  }, [step]);

  const isMe = creature?.id === "me";
  const order: StepId[] = isMe
    ? ["creature", "color", "hair", "extras", "photo", "message"]
    : ["creature", "color", "hair", "extras", "message"];
  const stepIndex = order.indexOf(step);

  const canContinue = (): boolean => {
    switch (step) {
      case "creature":
        return !!creature;
      case "color":
        return !!color;
      case "hair":
        return !!hairStyle && (hairStyle.id === "none" || !!hairColor);
      case "extras":
        return true;
      case "photo":
        return !!photo;
      case "message":
        return true;
      default:
        return false;
    }
  };

  const next = () => {
    if (stepIndex >= 0 && stepIndex < order.length - 1) setStep(order[stepIndex + 1]);
  };
  const back = () => {
    if (stepIndex > 0) setStep(order[stepIndex - 1]);
  };

  const toggleExtra = (tile: Tile) => {
    setExtras((prev) => {
      if (prev.some((t) => t.id === tile.id)) return prev.filter((t) => t.id !== tile.id);
      if (prev.length >= MAX_EXTRAS) return prev;
      return [...prev, tile];
    });
  };

  const reset = useCallback(() => {
    setStep("creature");
    setCreature(null);
    setColor(null);
    setHairStyle(null);
    setHairColor(null);
    setExtras([]);
    setPhoto(null);
    setName("");
    setMessage(QUICK_MESSAGES[0]);
    setImage(null);
    setError(null);
    setSaving(false);
  }, []);

  const generate = async () => {
    if (!creature || !color || !hairStyle) return;
    setError(null);
    setImage(null);
    setStep("generating");
    try {
      const res = await fetch("/api/monsters/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creature: creature.prompt,
          color: color.prompt,
          hairStyle: hairStyle.prompt,
          hairColor: hairColor?.prompt ?? "brown",
          accessories: extras.map((e) => e.prompt),
          photo: isMe ? photo : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.image) {
        throw new Error(data.error || `Something went wrong (${res.status})`);
      }
      setImage(data.image);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("result");
    }
  };

  const save = async () => {
    if (!image || !creature) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/monsters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "A friend",
          message: message.trim() || QUICK_MESSAGES[0],
          creature: creature.label,
          image,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Could not save (${res.status})`);
      }
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  };

  // Auto-restart after the celebration so the next kid gets a fresh screen.
  useEffect(() => {
    if (step !== "done") return;
    const t = setTimeout(reset, 12000);
    return () => clearTimeout(t);
  }, [step, reset]);

  const creatureWord = creature ? (isMe ? "cartoon you" : creature.label.toLowerCase()) : "monster";

  return (
    <div className="party-bg min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="font-display font-bold text-2xl md:text-3xl text-white drop-shadow">
          🎉 Kaveer's Monster Party
        </div>
        {stepIndex >= 0 && (
          <div className="flex gap-2" aria-label={`Step ${stepIndex + 1} of ${order.length}`}>
            {order.map((s, i) => (
              <span
                key={s}
                className={`w-4 h-4 rounded-full border-2 border-white ${i <= stepIndex ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        )}
      </header>

      {/* Card */}
      <main className="flex-1 flex items-start justify-center px-4 pb-8">
        <div className="party-card w-full max-w-5xl">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-center text-ink mb-5 md:mb-6">
            {STEP_TITLES[step]}
          </h1>

          {configured === false && step === "creature" && (
            <div className="mb-6 rounded-2xl bg-postit-coral border-2 border-[#E8B8B5] p-4 text-center font-display text-lg text-[#8B4E52]">
              Picture-making is not set up yet (missing OPENROUTER_API_KEY on the server).
            </div>
          )}

          {step === "creature" && (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
              {CREATURES.map((t) => (
                <BigTile key={t.id} tile={t} selected={creature?.id === t.id} onClick={() => setCreature(t)} />
              ))}
            </div>
          )}

          {step === "color" && (
            <div className="flex flex-wrap justify-center gap-5 md:gap-7">
              {COLORS.map((c) => (
                <ColorBlob key={c.id} color={c} selected={color?.id === c.id} onClick={() => setColor(c)} />
              ))}
            </div>
          )}

          {step === "hair" && (
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-4 gap-4 md:gap-5">
                {HAIR_STYLES.map((t) => (
                  <BigTile key={t.id} tile={t} selected={hairStyle?.id === t.id} onClick={() => setHairStyle(t)} />
                ))}
              </div>
              {hairStyle && hairStyle.id !== "none" && (
                <div className="flex flex-col items-center gap-4">
                  <div className="font-display font-bold text-3xl text-ink">Hair color?</div>
                  <div className="flex flex-wrap justify-center gap-4">
                    {COLORS.map((c) => (
                      <ColorBlob key={c.id} color={c} size="small" selected={hairColor?.id === c.id} onClick={() => setHairColor(c)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === "extras" && (
            <div className="flex flex-col gap-5">
              <p className="text-center font-display text-2xl text-ink-light">Pick up to {MAX_EXTRAS} — or none!</p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
                {EXTRAS.map((t) => {
                  const selected = extras.some((e) => e.id === t.id);
                  return (
                    <BigTile
                      key={t.id}
                      tile={t}
                      selected={selected}
                      disabled={!selected && extras.length >= MAX_EXTRAS}
                      onClick={() => toggleExtra(t)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {step === "photo" && <PhotoStep photo={photo} onPhoto={setPhoto} />}

          {step === "message" && (
            <form
              className="flex flex-col gap-6 max-w-2xl mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                generate();
              }}
            >
              <label className="flex flex-col gap-2">
                <span className="font-display font-bold text-2xl text-ink">My name is...</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  placeholder="Type your name"
                  className="party-input"
                  autoFocus
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-display font-bold text-2xl text-ink">My message for Kaveer</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={160}
                  rows={2}
                  className="party-input resize-none"
                />
              </label>
              <div className="flex flex-wrap gap-3">
                {QUICK_MESSAGES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMessage(m)}
                    className={`party-chip ${message === m ? "party-chip-selected" : ""}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="flex justify-center pt-2">
                <BigButton type="submit">✨ Make my {creatureWord}!</BigButton>
              </div>
            </form>
          )}

          {step === "generating" && (
            <div className="flex flex-col items-center gap-8 py-8">
              <div className="text-[9rem] leading-none party-bounce" aria-hidden>
                {creature?.emoji ?? "👾"}
              </div>
              <p key={lineIdx} className="party-pop font-display font-bold text-3xl md:text-4xl text-ink text-center">
                {GENERATING_LINES[lineIdx]}
              </p>
              <p className="text-ink-light font-display text-xl">This takes about 15 seconds</p>
            </div>
          )}

          {step === "result" && (
            <div className="flex flex-col items-center gap-6">
              {image ? (
                <img
                  src={image}
                  alt={`Your ${creatureWord}`}
                  className="party-pop max-h-[55vh] w-auto rounded-3xl shadow-2xl border-8 border-white"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="text-7xl">😵‍💫</span>
                  <p className="font-display text-2xl text-ink">Oops! The magic hiccuped.</p>
                  {error && <p className="text-ink-light max-w-lg">{error}</p>}
                </div>
              )}
              {image && error && <p className="text-[#8B4E52] font-display text-xl">{error}</p>}
              <div className="flex flex-wrap justify-center gap-4">
                {image && (
                  <BigButton onClick={save} disabled={saving}>
                    {saving ? "Sending... 🚀" : "🎉 Add me to the party!"}
                  </BigButton>
                )}
                <BigButton variant="soft" onClick={generate} disabled={saving}>
                  🔄 Try again
                </BigButton>
                <BigButton variant="back" onClick={() => setStep("message")} disabled={saving}>
                  ✏️ Change something
                </BigButton>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center gap-6 py-6 text-center">
              <div className="text-[7rem] leading-none party-bounce" aria-hidden>
                🥳
              </div>
              <p className="font-display font-bold text-3xl md:text-4xl text-ink">
                Your {creatureWord} joined the party!
              </p>
              <p className="font-display text-2xl text-ink-light">Look at the TV! 📺</p>
              <BigButton onClick={reset}>➕ Make another one</BigButton>
            </div>
          )}

          {/* Wizard nav */}
          {stepIndex >= 0 && step !== "message" && (
            <div className="flex items-center justify-between mt-6 md:mt-8">
              <div>
                {stepIndex > 0 ? (
                  <BigButton variant="back" onClick={back}>
                    ⬅️ Back
                  </BigButton>
                ) : (
                  <span />
                )}
              </div>
              <BigButton onClick={next} disabled={!canContinue()}>
                Next ➡️
              </BigButton>
            </div>
          )}
          {step === "message" && (
            <div className="flex items-center justify-start mt-6">
              <BigButton variant="back" onClick={back}>
                ⬅️ Back
              </BigButton>
            </div>
          )}
        </div>
      </main>

      <footer className="px-6 py-3 text-center text-white/80 text-sm">
        <Link href="/kaveer/tv" className="underline hover:text-white">
          Open the TV view
        </Link>
      </footer>
    </div>
  );
}
