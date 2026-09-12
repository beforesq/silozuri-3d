import { useEffect } from "react";
import { Canvas3D } from "./Canvas3D";
import { Hud } from "./ui/Hud";
import { useSimStore } from "@/lib/sim/store";

export function SimulationApp() {
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      useSimStore.getState().tick(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        useSimStore.getState().togglePlay();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        const s = useSimStore.getState();
        s.seek(s.time + 2);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        const s = useSimStore.getState();
        s.seek(s.time - 2);
      } else if (e.code === "KeyC") {
        useSimStore.getState().recinema();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-ink">
      <Canvas3D />
      <Hud />
    </div>
  );
}
