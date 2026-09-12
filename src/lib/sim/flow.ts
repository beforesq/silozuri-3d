import * as THREE from "three";
import { envAt, type FlowEnv } from "./timeline";
import { EXTRACTOR_Y, FRONT_Z, OUTLET_Y, SILO_R, TROUGH_Y, WORKING } from "./layout";

export const FINE_N = 160;
export const BOULDER_N = 22;

const dummy = new THREE.Object3D();

function rand(i: number, k: number) {
  const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

const silo0 = WORKING.find((s) => s.id === 7)!;
const silo1 = WORKING.find((s) => s.id === 5)!;
const SILO_POS = [silo0, silo1];

function pathFine(
  i: number,
  t: number,
  env: FlowEnv,
): { x: number; y: number; z: number; s: number; alive: boolean } {
  const silo = SILO_POS[i % 2];
  const cx = silo.x;
  const cz = silo.z;
  const seed = rand(i, 1);
  const seed2 = rand(i, 2);
  const seed3 = rand(i, 3);
  const rate = 0.07 + seed * 0.055;
  const base = (t * rate * (0.25 + env.flow * 0.9) + seed) % 1;
  let u = base;
  if (env.jam > 0.55 && u > 0.5) {
    const clamp = 0.5 + seed2 * 0.045;
    u = clamp + Math.sin(t * 7 + i) * 0.008 * env.lance;
  }
  if (env.cannon > 0.4 && u > 0.42 && u < 0.62) {
    u = Math.min(0.95, u + env.cannon * 0.22);
  }
  const a = seed * Math.PI * 2;
  const spin = t * 0.15 + seed3 * 6;
  let x = cx;
  let y = 12;
  let z = cz;
  let s = 0.055 + seed2 * 0.055;
  if (u < 0.28) {
    const k = u / 0.28;
    const r = (0.4 + (1 - k) * 3.6) * (0.55 + seed2 * 0.45);
    x = cx + Math.cos(a + spin * 0.2) * r;
    z = cz + Math.sin(a + spin * 0.2) * r;
    y = 5 + k * 12 + Math.sin(spin) * 0.3;
  } else if (u < 0.48) {
    const k = (u - 0.28) / 0.2;
    const r = (1 - k) * 3.2 * (0.3 + seed * 0.5);
    x = cx + Math.cos(a) * r;
    z = cz + Math.sin(a) * r * 0.85;
    y = 16 - k * (16 - OUTLET_Y - 0.35);
  } else if (u < 0.56) {
    const k = (u - 0.48) / 0.08;
    const jamLift = env.jam * (0.35 + seed * 0.4);
    x = cx + (seed - 0.5) * 0.45;
    z = cz + (seed2 - 0.5) * 0.45;
    y = OUTLET_Y - k * 0.7 + jamLift;
    if (env.jam > 0.7) s *= 0.9;
  } else if (u < 0.7) {
    const k = (u - 0.56) / 0.14;
    x = cx + Math.sin(k * 8 + i) * 0.18;
    z = cz + (k - 0.5) * 0.15;
    y = EXTRACTOR_Y + 0.35 - k * 1.35;
  } else {
    const k = (u - 0.7) / 0.3;
    const dir = silo.id === 7 ? 1 : -1;
    x = cx + dir * k * 9.5;
    y = TROUGH_Y + 0.22 + Math.sin(k * 10 + i) * 0.04;
    z = cz + (FRONT_Z - cz) * 0 + (seed3 - 0.5) * 0.22;
    if (k > 0.92) s *= Math.max(0, 1 - (k - 0.92) / 0.08);
  }
  if (env.flow < 0.1 && u > 0.3) {
    const hold = 0.28 + seed * 0.08;
    const k = hold / 0.28;
    const r = (0.4 + (1 - k) * 3.6) * 0.7;
    x = cx + Math.cos(a) * r;
    z = cz + Math.sin(a) * r;
    y = 8 + seed2 * 6;
  }
  const alive = env.flow > 0.04 || u < 0.35;
  return { x, y, z, s: alive ? s : 0, alive };
}

function boulderPos(
  i: number,
  t: number,
  env: FlowEnv,
): { x: number; y: number; z: number; s: number } {
  const silo = SILO_POS[i % 2];
  const cx = silo.x;
  const cz = silo.z;
  const n = Math.floor(i / 2);
  const seed = rand(i, 9);
  const seed2 = rand(i, 10);
  const ang = (n / 18) * Math.PI * 2 + seed * 0.4;
  const wallY = 7.5 + (n % 12) * 1.05 + seed2 * 0.5;
  const wallR = SILO_R - 0.38;
  const wallX = cx + Math.cos(ang) * wallR;
  const wallZ = cz + Math.sin(ang) * wallR * 0.92;
  const detachAt = (n % 18) / 18;
  const fallen = env.detach > detachAt + 0.04;
  const jamAng = n * 2.31 + seed;
  const jamR = 0.12 + (n % 6) * 0.1;
  const jamX = cx + Math.cos(jamAng) * jamR;
  const jamZ = cz + Math.sin(jamAng) * jamR;
  const jamY = OUTLET_Y + 0.22 + Math.floor(n / 7) * 0.32 + seed2 * 0.08;
  const size = 0.28 + seed * 0.32;
  if (!fallen) {
    return { x: wallX, y: wallY, z: wallZ, s: size * (0.55 + env.detach * 0.5) };
  }
  const fallK = Math.min(1, (env.detach - detachAt) / 0.28);
  const ease = fallK * fallK * (3 - 2 * fallK);
  let x = wallX + (jamX - wallX) * ease;
  let y = wallY + (jamY - wallY) * ease + Math.sin(ease * Math.PI) * 1.8;
  let z = wallZ + (jamZ - wallZ) * ease;
  let s = size;
  if (env.lance > 0.2 && env.jam > 0.4) {
    const wiggle = env.lance * 0.22;
    x += Math.sin(t * 18 + i) * wiggle;
    z += 0.35 * env.lance;
    y += Math.abs(Math.sin(t * 11 + i)) * 0.15 * env.lance;
  }
  if (env.cannon > 0.15) {
    const kick = env.cannon;
    const outward = 0.4 + seed * 0.8;
    x += Math.cos(jamAng) * outward * kick;
    z += Math.sin(jamAng) * outward * kick;
    y += kick * (1.1 + seed2 * 1.4);
    s *= 1 - kick * 0.25;
  }
  if (env.jam < 0.25 && fallen && env.flow > 0.55) {
    const k = 1 - env.jam;
    const dir = silo.id === 7 ? 1 : -1;
    y = jamY * (1 - k) + (TROUGH_Y + 0.3) * k;
    x = jamX + dir * k * 4.5;
    z = jamZ * (1 - k) + cz * k;
    if (k > 0.7) s *= Math.max(0, 1 - (k - 0.7) / 0.3);
  }
  if (env.detach < 0.02) {
    return { x: wallX, y: wallY, z: wallZ, s: size * 0.7 };
  }
  return { x, y, z, s };
}

export function writeFines(mesh: THREE.InstancedMesh, time: number) {
  const env = envAt(time);
  for (let i = 0; i < FINE_N; i++) {
    const p = pathFine(i, time, env);
    dummy.position.set(p.x, p.y, p.z);
    dummy.scale.setScalar(p.s);
    dummy.rotation.set(0, rand(i, 4) * 6, 0);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

export function writeBoulders(mesh: THREE.InstancedMesh, time: number) {
  const env = envAt(time);
  for (let i = 0; i < BOULDER_N; i++) {
    const p = boulderPos(i, time, env);
    dummy.position.set(p.x, p.y, p.z);
    dummy.scale.set(p.s * (0.85 + rand(i, 11) * 0.4), p.s, p.s * (0.75 + rand(i, 12) * 0.5));
    dummy.rotation.set(rand(i, 13) * 6, rand(i, 14) * 6, rand(i, 15) * 6);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

export function prepInstanced(mesh: THREE.InstancedMesh) {
  mesh.frustumCulled = false;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
}