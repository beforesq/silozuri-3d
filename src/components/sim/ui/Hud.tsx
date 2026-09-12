import {
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Eye,
  EyeOff,
  Video,
} from "lucide-react";
import { CHAPTERS, TOTAL_TIME, chapterAt, chapterIndexAt, envAt } from "@/lib/sim/timeline";
import { useSimStore } from "@/lib/sim/store";

function formatTime(t: number) {
  const s = Math.max(0, t);
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export function Hud() {
  const started = useSimStore((s) => s.started);
  const playing = useSimStore((s) => s.playing);
  const time = useSimStore((s) => s.time);
  const cameraMode = useSimStore((s) => s.cameraMode);
  const labels = useSimStore((s) => s.labels);
  const togglePlay = useSimStore((s) => s.togglePlay);
  const seek = useSimStore((s) => s.seek);
  const goToChapter = useSimStore((s) => s.goToChapter);
  const recinema = useSimStore((s) => s.recinema);
  const setLabels = useSimStore((s) => s.setLabels);

  const chapter = chapterAt(time);
  const idx = chapterIndexAt(time);
  const env = envAt(time);
  const jammed = env.jam > 0.55;
  const live = env.flow > 0.55 && env.jam < 0.4;

  if (!started) {
    return (
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-ink/72 px-5">
        <div className="pointer-events-auto hud-enter w-full max-w-xl rounded-lg border border-line bg-panel p-7 shadow-2xl">
          <p className="font-display text-xs tracking-[0.28em] text-moss uppercase">Holcim · Internship</p>
          <h1 className="mt-3 font-display text-4xl leading-none tracking-tight text-paper sm:text-5xl">
            Simulare 3D
          </h1>
          <p className="mt-2 font-display text-2xl text-paper/80">Silozuri și blocaje la extracție</p>
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-paper/70">
            Când silozul e pe terminate, crusta de pe pereți și bolovanii de la fund se așază ca un capac
            în extractor. Linia de însăcuire și vracul rămân fără material. Soluția propusă: tunuri de aer
            AGICO KQP, montate pe placa extractorului, acționate din camera de comandă.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-paper/75">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
              12 silozuri — detaliu complet pe silozurile 5 și 7
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
              Extractor cu două axe, rigolă, poartă glisantă orizontală
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
              Blocaj → tijă temporară → tunuri de aer → flux restabilit
            </li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => useSimStore.getState().start()}
              className="inline-flex h-11 items-center gap-2 rounded-sm bg-moss px-5 font-display text-sm tracking-[0.14em] text-ink uppercase"
            >
              <Play className="h-4 w-4" />
              Pornește prezentarea
            </button>
            <button
              type="button"
              onClick={() => {
                useSimStore.getState().start();
                useSimStore.getState().setPlaying(false);
                useSimStore.getState().setCameraMode("manual");
              }}
              className="inline-flex h-11 items-center gap-2 rounded-sm border border-line px-5 font-display text-sm tracking-[0.14em] text-paper uppercase"
            >
              Explorează scena
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-3 sm:p-4">
      <header className="pointer-events-auto flex items-start justify-between gap-3">
        <div className="rounded-md border border-line bg-panel px-3 py-2">
          <p className="font-display text-[10px] tracking-[0.26em] text-moss uppercase">Holcim · Simulare 3D</p>
          <p className="font-display text-lg leading-none text-paper sm:text-xl">
            {chapter.kicker} {chapter.title}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`rounded-md border border-line px-3 py-2 font-display text-[11px] tracking-[0.16em] uppercase ${
              jammed ? "bg-danger text-paper" : live ? "bg-ok text-paper" : "bg-panel text-paper/80"
            }`}
          >
            <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full bg-paper live-dot`} />
            {jammed ? "Flux blocat" : live ? "Flux activ" : "Stand-by"}
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 gap-3 py-3">
        <nav className="pointer-events-auto hidden w-52 shrink-0 flex-col justify-center gap-1 lg:flex">
          {CHAPTERS.map((c, i) => {
            const on = i === idx;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => goToChapter(i)}
                className={`rounded-sm border px-2.5 py-1.5 text-left transition-colors ${
                  on
                    ? "border-moss/50 bg-moss/15 text-paper"
                    : "border-transparent bg-panel-2 text-paper/60 hover:text-paper"
                }`}
              >
                <span className="font-display text-[10px] tracking-[0.18em] text-moss uppercase">{c.kicker}</span>
                <span className="block font-display text-[13px] leading-tight">{c.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <footer className="pointer-events-auto rounded-md border border-line bg-panel p-3">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-moss text-ink"
            aria-label={playing ? "Pauză" : "Redare"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => goToChapter(Math.max(0, idx - 1))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-paper"
            aria-label="Capitol anterior"
          >
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goToChapter(Math.min(CHAPTERS.length - 1, idx + 1))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-paper"
            aria-label="Capitol următor"
          >
            <SkipForward className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              seek(0);
              recinema();
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-paper"
            aria-label="De la început"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <div className="mx-1 hidden h-6 w-px bg-line sm:block" />
          <button
            type="button"
            onClick={recinema}
            className={`inline-flex h-10 items-center gap-2 rounded-sm border px-3 font-display text-[11px] tracking-[0.12em] uppercase ${
              cameraMode === "cinematic" ? "border-moss/40 bg-moss/15 text-paper" : "border-line text-paper/70"
            }`}
          >
            <Video className="h-3.5 w-3.5" />
            {cameraMode === "cinematic" ? "Cameră ghidată" : "Revino la ghidaj"}
          </button>
          <button
            type="button"
            onClick={() => setLabels(!labels)}
            className="inline-flex h-10 items-center gap-2 rounded-sm border border-line px-3 font-display text-[11px] tracking-[0.12em] text-paper/70 uppercase"
          >
            {labels ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            Etichete
          </button>
          <span className="ml-auto font-mono text-xs tabular-nums text-paper/60">
            {formatTime(time)} / {formatTime(TOTAL_TIME)}
          </span>
        </div>

        <div className="relative">
          <input
            type="range"
            min={0}
            max={TOTAL_TIME}
            step={0.05}
            value={time}
            onChange={(e) => seek(Number(e.target.value))}
            className="relative z-10 h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-2 accent-moss"
            aria-label="Poziție timeline"
          />
          <div className="pointer-events-none mt-1.5 flex">
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => goToChapter(CHAPTERS.indexOf(c))}
                style={{ width: `${(c.duration / TOTAL_TIME) * 100}%` }}
                className="pointer-events-auto truncate px-0.5 text-left font-display text-[9px] tracking-[0.12em] text-paper/45 uppercase hover:text-moss"
              >
                {c.kicker}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 hidden text-[11px] text-paper/40 sm:block">
          Trageți scena pentru a roti camera — simularea nu se oprește. Spațiu: play / pauză.
        </p>
        <p className="mt-2 font-display text-sm text-paper/80 lg:hidden">{chapter.lead}</p>
      </footer>
    </div>
  );
}
