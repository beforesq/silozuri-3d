export const SILO_R = 5.35;
export const SILO_H = 27.5;
export const PITCH_X = 13.05;
export const PITCH_Z = 12.15;

export const FRONT_Z = PITCH_Z * 0.5;
export const BACK_Z = -PITCH_Z * 0.5;

export const PIT_FLOOR = -6.65;
export const PIT_FRONT = 12.4;
export const PIT_BACK = -2.2;
export const PIT_LEFT = -14.2;
export const PIT_RIGHT = 14.2;

export const OUTLET_Y = -1.28;
export const EXTRACTOR_Y = -3.35;
export const TROUGH_Y = -5.08;

export const WORKING_IDS = [5, 7] as const;

export type SiloDef = {
  id: number;
  col: number;
  row: "front" | "back";
  x: number;
  z: number;
  working: boolean;
};

function colOf(id: number): number {
  // Front: 11 9 7 5 3 1   Back: 12 10 8 6 4 2
  const even = id % 2 === 0;
  const pair = even ? id : id + 1; // 12,10,8,6,4,2
  return (12 - pair) / 2;
}

export const SILOS: SiloDef[] = Array.from({ length: 12 }, (_, i) => {
  const id = 12 - i;
  const row: "front" | "back" = id % 2 === 0 ? "back" : "front";
  const col = colOf(id);
  const x = (col - 2.5) * PITCH_X;
  const z = row === "front" ? FRONT_Z : BACK_Z;
  return {
    id,
    col,
    row,
    x,
    z,
    working: WORKING_IDS.includes(id as 5 | 7),
  };
});

export const WORKING = SILOS.filter((s) => s.working);

export function siloById(id: number): SiloDef {
  const s = SILOS.find((x) => x.id === id);
  if (!s) throw new Error(`silo ${id}`);
  return s;
}

/** Cutaway opening faces +Z (camera). */
export const CUT_THETA_START = Math.PI / 2 - 0.42;
export const CUT_THETA_LENGTH = Math.PI * 2 - 0.84;
