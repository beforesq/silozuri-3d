import * as THREE from "three";

const cache = new Map<string, THREE.CanvasTexture>();

function noise(x: number, y: number) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

function make(key: string, size: number, draw: (ctx: CanvasRenderingContext2D, size: number) => void) {
  const hit = cache.get(key);
  if (hit) return hit;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("canvas");
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 1;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  cache.set(key, tex);
  return tex;
}

export function concreteTex() {
  return make("concrete", 512, (ctx, s) => {
    ctx.fillStyle = "#b7b3aa";
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 4200; i++) {
      const x = noise(i, 1) * s;
      const y = noise(i, 2) * s;
      const g = 140 + noise(i, 3) * 70;
      ctx.fillStyle = `rgba(${g},${g - 4},${g - 12},${0.12 + noise(i, 4) * 0.28})`;
      ctx.fillRect(x, y, 1 + noise(i, 5) * 3, 1 + noise(i, 6) * 3);
    }
    for (let i = 0; i < 18; i++) {
      ctx.strokeStyle = `rgba(90,86,80,${0.05 + noise(i, 8) * 0.08})`;
      ctx.beginPath();
      ctx.moveTo(noise(i, 9) * s, noise(i, 10) * s);
      ctx.lineTo(noise(i, 11) * s, noise(i, 12) * s);
      ctx.stroke();
    }
  });
}

export function soilTex() {
  return make("soil", 512, (ctx, s) => {
    const g = ctx.createLinearGradient(0, 0, 0, s);
    g.addColorStop(0, "#6a5a3a");
    g.addColorStop(0.18, "#5a4a32");
    g.addColorStop(0.45, "#4a3a28");
    g.addColorStop(0.72, "#3a2c20");
    g.addColorStop(1, "#2c2218");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 2800; i++) {
      const x = noise(i, 21) * s;
      const y = noise(i, 22) * s;
      const r = 70 + noise(i, 23) * 50;
      ctx.fillStyle = `rgba(${r},${r * 0.72},${r * 0.45},${0.1 + noise(i, 24) * 0.2})`;
      ctx.fillRect(x, y, 2, 2);
    }
    for (let y = 0; y < s; y += 28) {
      ctx.fillStyle = `rgba(20,14,8,${0.12})`;
      ctx.fillRect(0, y + noise(y, 3) * 6, s, 3);
    }
  });
}

export function rustTex() {
  return make("rust", 256, (ctx, s) => {
    ctx.fillStyle = "#6d7178";
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = `rgba(${90 + noise(i, 1) * 80},${70 + noise(i, 2) * 40},${50},${0.12})`;
      ctx.fillRect(noise(i, 3) * s, noise(i, 4) * s, 3, 2);
    }
  });
}

export function gravelTex() {
  return make("gravel", 512, (ctx, s) => {
    ctx.fillStyle = "#7a756c";
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 3600; i++) {
      const g = 90 + noise(i, 5) * 80;
      ctx.fillStyle = `rgb(${g},${g - 6},${g - 14})`;
      ctx.beginPath();
      ctx.arc(noise(i, 6) * s, noise(i, 7) * s, 1 + noise(i, 8) * 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

export function cementTex() {
  return make("cement", 256, (ctx, s) => {
    ctx.fillStyle = "#d8cbb3";
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 2400; i++) {
      const g = 180 + noise(i, 2) * 40;
      ctx.fillStyle = `rgba(${g},${g - 12},${g - 30},0.35)`;
      ctx.fillRect(noise(i, 3) * s, noise(i, 4) * s, 1, 1);
    }
  });
}

export function disposeTextures() {
  for (const t of cache.values()) t.dispose();
  cache.clear();
}
