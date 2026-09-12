export type Vec3 = [number, number, number];

export type CameraShot = {
  position: Vec3;
  target: Vec3;
};

export type ChapterId =
  | "overview"
  | "focus"
  | "interior"
  | "extraction"
  | "flow"
  | "blockage"
  | "temporary"
  | "cannons"
  | "restored";

export type Chapter = {
  id: ChapterId;
  kicker: string;
  title: string;
  lead: string;
  detail: string;
  duration: number;
  start: number;
  camera: CameraShot;
};

const RAW: Omit<Chapter, "start">[] = [
  {
    id: "overview",
    kicker: "01",
    title: "Ansamblu silozuri",
    lead: "Cele 12 silozuri de ciment ale fabricii.",
    detail:
      "Silozurile 5 și 7 sunt modelate complet — con de extracție, extractor cu două axe și rigolă. Restul rămân în context, cu opacitate redusă, ca să nu deranjeze lectura.",
    duration: 7.2,
    camera: { position: [16, 24, 54], target: [0, 9, 0] },
  },
  {
    id: "focus",
    kicker: "02",
    title: "Zona de lucru",
    lead: "Extracția se întâmplă sub cota terenului.",
    detail:
      "La nivelul solului, în siloz, materialul este încă brut. Sub pământ: conul, poarta glisantă, placa pătrată, extractorul și rigola către însăcuire / vrac.",
    duration: 6.4,
    camera: { position: [3, 11.5, 27], target: [0, 5.5, 6] },
  },
  {
    id: "interior",
    kicker: "03",
    title: "Interior siloz",
    lead: "Pe terminate, crusta de pe pereți se desprinde.",
    detail:
      "Cimentul fin curge. Plăcile dure lipite de perete și bolovanii de la fund nu se mai macină — ajung ca un capac în extractor.",
    duration: 8.0,
    camera: { position: [0.2, 11.2, 18.5], target: [0, 8.6, 6.1] },
  },
  {
    id: "extraction",
    kicker: "04",
    title: "Extracție subterană",
    lead: "Secțiune prin teren — camera de sub siloz.",
    detail:
      "Poarta glisantă stă orizontal, acționată de volant, pentru mentenanță. Sub ea: extractor cu două axe dințate. Pe placa pătrată montăm tunurile de aer.",
    duration: 8.2,
    camera: { position: [2.4, -0.2, 16.2], target: [0, -3.5, 6.1] },
  },
  {
    id: "flow",
    kicker: "05",
    title: "Flux normal",
    lead: "Cimentul fin trece, extractorul toacă, rigola transportă.",
    detail:
      "Cât materialul rămâne pulverulent, linia de însăcuire și instalațiile de vrac sunt alimentate continuu. Nu există timp mort.",
    duration: 9.0,
    camera: { position: [1.1, -1.05, 14.2], target: [0, -3.7, 6.1] },
  },
  {
    id: "blockage",
    kicker: "06",
    title: "Formarea blocajului",
    lead: "Bolovanii fac capac pe extractor. Rigola rămâne goală.",
    detail:
      "Fluxul spre stațiile de vrac și mașinile de însăcuit se oprește. Blocajul nu e opțional — este oprirea liniei.",
    duration: 11.2,
    camera: { position: [0.4, -1.45, 13.2], target: [0, -3.15, 6.1] },
  },
  {
    id: "temporary",
    kicker: "07",
    title: "Soluție temporară",
    lead: "Tijă cu aer prin tubul roșu de vizitare.",
    detail:
      "Merge, dar greu: prezență fizică în subteran, risc, rezultate parțiale. Capacul se reface. Nu este o soluție de flux continuu.",
    duration: 9.0,
    camera: { position: [8.4, -1.55, 13.0], target: [6.5, -2.35, 7.0] },
  },
  {
    id: "cannons",
    kicker: "08",
    title: "Tunuri de aer AGICO",
    lead: "KQP, montate pe placa extractorului, trag în sus.",
    detail:
      "Unda de șoc (0.4–0.8 MPa) rupe capacul, fluidizează crusta și repornește curgerea. Acționare din camera de comandă sau pe senzor de presiune — fără oameni în groapă.",
    duration: 12.4,
    camera: { position: [0.2, -0.55, 14.8], target: [0, -2.7, 6.1] },
  },
  {
    id: "restored",
    kicker: "09",
    title: "Flux restabilit",
    lead: "Curgere continuă. Timpii morți dispar.",
    detail:
      "Personalul iese din intervenții repetitive în zona subterană. Linia de însăcuire și vracul rămân alimentate. Continuitate operațională — critic, nu opțional.",
    duration: 8.0,
    camera: { position: [13, 7.2, 24], target: [0, 1.4, 6] },
  },
];

export const CHAPTERS: Chapter[] = (() => {
  let t = 0;
  return RAW.map((c) => {
    const start = t;
    t += c.duration;
    return { ...c, start };
  });
})();

export const TOTAL_TIME = CHAPTERS[CHAPTERS.length - 1].start + CHAPTERS[CHAPTERS.length - 1].duration;

export function chapterIndexAt(time: number): number {
  const t = Math.max(0, Math.min(time, TOTAL_TIME - 0.001));
  for (let i = CHAPTERS.length - 1; i >= 0; i--) {
    if (t >= CHAPTERS[i].start) return i;
  }
  return 0;
}

export function chapterAt(time: number): Chapter {
  return CHAPTERS[chapterIndexAt(time)];
}

export function chapterProgress(time: number): number {
  const c = chapterAt(time);
  return Math.max(0, Math.min(1, (time - c.start) / c.duration));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

export function cameraShotAt(time: number): CameraShot {
  const i = chapterIndexAt(time);
  const a = CHAPTERS[i];
  const b = CHAPTERS[Math.min(i + 1, CHAPTERS.length - 1)];
  const local = time - a.start;
  const window = Math.min(1.85, a.duration * 0.34);
  const t = a === b ? 0 : smoothstep((local - (a.duration - window)) / window);

  const bulge = Math.sin(t * Math.PI) * 5.5;
  const position: Vec3 = [
    lerp(a.camera.position[0], b.camera.position[0], t),
    lerp(a.camera.position[1], b.camera.position[1], t),
    lerp(a.camera.position[2], b.camera.position[2], t) + bulge,
  ];
  position[2] = Math.max(position[2], 12.05);
  const target: Vec3 = [
    lerp(a.camera.target[0], b.camera.target[0], t),
    lerp(a.camera.target[1], b.camera.target[1], t),
    lerp(a.camera.target[2], b.camera.target[2], t),
  ];
  return { position, target };
}

export type FlowEnv = {
  jam: number;
  flow: number;
  lance: number;
  cannon: number;
  cutaway: number;
  siloGhost: number;
  detach: number;
};

export function envAt(time: number): FlowEnv {
  const ch = chapterAt(time);
  const p = chapterProgress(time);
  const id = ch.id;

  let jam = 0;
  let flow = 0;
  let lance = 0;
  let cannon = 0;
  let cutaway = 0;
  let siloGhost = 0;
  let detach = 0;

  if (id === "overview") {
    flow = 0.08;
    cutaway = 0;
  } else if (id === "focus") {
    flow = 0.12;
    cutaway = p * 0.35;
  } else if (id === "interior") {
    flow = 0.22;
    cutaway = 0.55 + p * 0.45;
    detach = p * 0.15;
  } else if (id === "extraction") {
    flow = 0.45;
    cutaway = 1;
    siloGhost = 0.55 + p * 0.25;
  } else if (id === "flow") {
    flow = 1;
    cutaway = 1;
    siloGhost = 0.72;
  } else if (id === "blockage") {
    cutaway = 1;
    siloGhost = 0.7;
    detach = Math.min(1, p * 1.6);
    jam = smoothstep((p - 0.18) / 0.45);
    flow = 1 - jam * 0.95;
  } else if (id === "temporary") {
    cutaway = 1;
    siloGhost = 0.68;
    detach = 1;
    jam = 0.78;
    const pulse = Math.max(0, Math.sin(p * Math.PI * 6.2));
    lance = 0.42 + pulse * pulse * 0.58;
    flow = 0.12 + lance * 0.28;
  } else if (id === "cannons") {
    cutaway = 1;
    siloGhost = 0.62;
    detach = 1;
    const beat = p * 4.15;
    const pulse = Math.max(0, Math.sin(beat * Math.PI));
    cannon = pulse * pulse;
    jam = Math.max(0, 0.9 - p * 1.15) * (1 - cannon * 0.85);
    flow = Math.min(1, p * 1.2 + cannon * 0.45);
  } else {
    cutaway = 0.85;
    siloGhost = 0.25;
    flow = 1;
    jam = 0;
    detach = 0.08;
  }

  return { jam, flow, lance, cannon, cutaway, siloGhost, detach };
}
