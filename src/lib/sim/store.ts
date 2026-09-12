import { create } from "zustand";
import { CHAPTERS, TOTAL_TIME, chapterIndexAt } from "./timeline";

export type CameraMode = "cinematic" | "manual";

type SimState = {
  started: boolean;
  playing: boolean;
  time: number;
  cameraMode: CameraMode;
  labels: boolean;
  start: () => void;
  togglePlay: () => void;
  setPlaying: (v: boolean) => void;
  seek: (t: number) => void;
  goToChapter: (index: number) => void;
  setCameraMode: (m: CameraMode) => void;
  recinema: () => void;
  setLabels: (v: boolean) => void;
  tick: (dt: number) => void;
};

export const useSimStore = create<SimState>((set, get) => ({
  started: false,
  playing: false,
  time: 0,
  cameraMode: "cinematic",
  labels: true,
  start: () =>
    set({
      started: true,
      playing: true,
      time: 0,
      cameraMode: "cinematic",
    }),
  togglePlay: () => {
    const { started, playing, time } = get();
    if (!started) {
      set({ started: true, playing: true, cameraMode: "cinematic" });
      return;
    }
    if (!playing && time >= TOTAL_TIME - 0.05) {
      set({ playing: true, time: 0, cameraMode: "cinematic" });
      return;
    }
    set({ playing: !playing });
  },
  setPlaying: (v) => set({ playing: v }),
  seek: (t) => {
    const time = Math.max(0, Math.min(TOTAL_TIME, t));
    set({ time, started: true, playing: time < TOTAL_TIME - 0.02 });
  },
  goToChapter: (index) => {
    const i = Math.max(0, Math.min(CHAPTERS.length - 1, index));
    set({
      started: true,
      time: CHAPTERS[i].start + 0.12,
      playing: true,
      cameraMode: "cinematic",
    });
  },
  setCameraMode: (cameraMode) => set({ cameraMode }),
  recinema: () => set({ cameraMode: "cinematic" }),
  setLabels: (labels) => set({ labels }),
  tick: (dt) => {
    const { playing, time } = get();
    if (!playing) return;
    const next = time + dt;
    if (next >= TOTAL_TIME) {
      set({ time: TOTAL_TIME, playing: false });
      return;
    }
    set({ time: next });
  },
}));

export function currentChapterIndex(): number {
  return chapterIndexAt(useSimStore.getState().time);
}
