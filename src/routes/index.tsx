import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [App, setApp] = useState<ComponentType | null>(null);

  useEffect(() => {
    let live = true;
    void import("@/components/sim/SimulationApp").then((m) => {
      if (live) setApp(() => m.SimulationApp);
    });
    return () => {
      live = false;
    };
  }, []);

  if (!App) {
    return (
      <main className="flex h-dvh items-center justify-center bg-ink text-paper">
        <div className="text-center">
          <p className="font-display text-xs tracking-[0.28em] text-moss uppercase">Holcim</p>
          <p className="mt-2 font-display text-3xl">Simulare 3D</p>
          <p className="mt-1 text-sm text-paper/60">Silozuri și blocaje la extracție</p>
        </div>
      </main>
    );
  }

  return <App />;
}
