import { useEffect, useRef, useState } from "react";
import type { MonsterMeta } from "./options";

const POLL_MS = 6000;
const SLIDE_MS = 9000;
const NEW_FRIEND_MS = 5000;

const BALLOONS = ["🎈", "🎈", "🎈", "🎉", "⭐", "🎈", "🎂", "✨", "🎈", "🎊"];

export default function KaveerTvPage() {
  const [monsters, setMonsters] = useState<MonsterMeta[]>([]);
  const [current, setCurrent] = useState(0);
  const [newFriend, setNewFriend] = useState(false);
  const [offline, setOffline] = useState(false);
  const seenIds = useRef<Set<number> | null>(null);

  // Poll for monsters; jump to a newly added one right away.
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/monsters", { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const list = (await res.json()) as MonsterMeta[];
        if (!alive) return;
        setOffline(false);
        setMonsters(list);
        if (seenIds.current === null) {
          seenIds.current = new Set(list.map((m) => m.id));
          return;
        }
        const fresh = list.filter((m) => !seenIds.current!.has(m.id));
        if (fresh.length > 0) {
          fresh.forEach((m) => seenIds.current!.add(m.id));
          const newest = fresh[fresh.length - 1];
          setCurrent(list.findIndex((m) => m.id === newest.id));
          setNewFriend(true);
          setTimeout(() => alive && setNewFriend(false), NEW_FRIEND_MS);
        }
      } catch {
        if (alive) setOffline(true);
      }
    };
    load();
    const t = setInterval(load, POLL_MS);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  // Advance the slideshow.
  useEffect(() => {
    if (monsters.length < 2) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % monsters.length);
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, [monsters.length, newFriend]);

  const safeIndex = monsters.length ? Math.min(current, monsters.length - 1) : 0;
  const active = monsters[safeIndex];
  const nextMonster = monsters.length > 1 ? monsters[(safeIndex + 1) % monsters.length] : null;

  return (
    <div className="party-bg fixed inset-0 overflow-hidden flex flex-col select-none">
      {/* Floating balloons */}
      {BALLOONS.map((b, i) => (
        <span
          key={i}
          aria-hidden
          className="party-float absolute text-6xl md:text-7xl opacity-70 pointer-events-none"
          style={{ left: `${(i * 97) % 100}%`, animationDelay: `${i * 1.7}s`, animationDuration: `${14 + (i % 5) * 3}s` }}
        >
          {b}
        </span>
      ))}

      {/* Top strip */}
      <header className="flex items-center justify-center pt-6 pb-2">
        <div className="font-display font-bold text-3xl md:text-4xl text-white drop-shadow-lg tracking-wide">
          🎈 Kaveer's Monster Party 🎈
        </div>
      </header>

      {/* Main slide */}
      <main className="flex-1 flex items-center justify-center px-10 min-h-0">
        {active ? (
          <div key={active.id} className="party-pop flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 w-full max-w-[1700px] h-full">
            <div className="relative shrink-0 h-[50vh] lg:h-[62vh] aspect-square">
              <img
                src={`/api/monsters/${active.id}/image`}
                alt={`${active.name}'s ${active.creature}`}
                className="party-sway h-full w-full object-cover rounded-[3rem] border-[12px] border-white shadow-2xl bg-white"
              />
              {newFriend && (
                <div className="party-pop absolute -top-6 -right-6 rotate-6 bg-postit-yellow border-4 border-white rounded-full px-6 py-3 font-display font-bold text-3xl text-ink shadow-xl">
                  🎉 New friend!
                </div>
              )}
            </div>
            <div className="party-bubble max-w-2xl">
              <p className="font-display font-bold text-4xl lg:text-6xl leading-tight text-ink">
                {active.message}
              </p>
              <p className="mt-6 font-display text-3xl lg:text-4xl text-[#8B4E52]">
                — {active.name}'s {active.creature.toLowerCase()}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-white drop-shadow-lg">
            <div className="text-[9rem] leading-none party-bounce">👾</div>
            <p className="font-display font-bold text-5xl mt-6">Come make a monster for Kaveer!</p>
            <p className="font-display text-3xl mt-3 opacity-90">
              {offline ? "Reconnecting to the party..." : "Head over to the laptop 💻"}
            </p>
          </div>
        )}
      </main>

      {/* Crowd strip */}
      {monsters.length > 0 && (
        <div className="flex justify-center gap-4 px-8 py-3 overflow-hidden">
          {monsters.slice(-16).map((m, i) => (
            <img
              key={m.id}
              src={`/api/monsters/${m.id}/image`}
              alt=""
              className={`party-bob h-20 w-20 md:h-28 md:w-28 object-cover rounded-full border-4 shadow-lg bg-white transition-transform ${
                m.id === active?.id ? "border-postit-yellow scale-125" : "border-white"
              }`}
              style={{ animationDelay: `${(i % 6) * 0.25}s` }}
            />
          ))}
        </div>
      )}

      {/* Banner */}
      <footer className="pb-8 pt-2 text-center">
        <div className="party-banner inline-block font-display font-bold text-6xl md:text-8xl leading-none">
          🎂 Happy 5th Birthday, Kaveer! 🎉
        </div>
        <div className="mt-3 font-display text-2xl md:text-3xl text-white/90 drop-shadow">
          {monsters.length > 0
            ? `${monsters.length} ${monsters.length === 1 ? "friend has" : "friends have"} joined the party`
            : "Waiting for the first friend..."}
        </div>
      </footer>

      {/* Preload the next picture so slides never flash empty. */}
      {nextMonster && <img src={`/api/monsters/${nextMonster.id}/image`} alt="" className="hidden" />}
    </div>
  );
}
