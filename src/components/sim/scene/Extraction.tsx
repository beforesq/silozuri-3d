import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  EXTRACTOR_Y,
  FRONT_Z,
  OUTLET_Y,
  TROUGH_Y,
  WORKING,
  type SiloDef,
} from "@/lib/sim/layout";
import { rustTex } from "@/lib/sim/textures";
import { envAt } from "@/lib/sim/timeline";
import { useSimStore } from "@/lib/sim/store";

function Shaft({
  localZ,
  dir,
  spinning,
}: {
  localZ: number;
  dir: number;
  spinning: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current && spinning) ref.current.rotation.x += dir * 2.35 * Math.min(dt, 0.05);
  });
  const teeth = useMemo(() => Array.from({ length: 9 }, (_, i) => i), []);
  return (
    <group ref={ref} position={[0, 0, localZ]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 2.35, 14]} />
        <meshStandardMaterial color="#3e444c" metalness={0.55} roughness={0.38} />
      </mesh>
      {teeth.map((i) => {
        const a = (i / 9) * Math.PI * 2;
        return (
          <mesh key={i} position={[0, Math.cos(a) * 0.28, Math.sin(a) * 0.28]} rotation={[a, 0, 0]}>
            <boxGeometry args={[2.05, 0.12, 0.22]} />
            <meshStandardMaterial color="#2c3138" metalness={0.45} roughness={0.42} />
          </mesh>
        );
      })}
    </group>
  );
}

/** AGICO KQP — mounted on the square plate, firing UP into the hopper cap. */
function AirCannon({
  side,
  pulse,
}: {
  side: -1 | 1;
  pulse: number;
}) {
  const tank = useRef<THREE.Group>(null);
  useFrame(() => {
    if (tank.current) tank.current.position.y = -pulse * 0.05;
  });
  const x = side * 0.72;
  return (
    <group position={[x, OUTLET_Y + 0.08, 0]}>
      <group ref={tank}>
        {/* Horizontal tank on the plate, pointing outward */}
        <mesh position={[side * 0.72, -0.02, 0.38]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 0.95, 20]} />
          <meshStandardMaterial
            color="#c0392b"
            metalness={0.35}
            roughness={0.4}
            emissive="#ff6a3d"
            emissiveIntensity={pulse * 1.8}
          />
        </mesh>
        <mesh position={[side * 1.2, -0.02, 0.38]}>
          <sphereGeometry args={[0.26, 14, 12]} />
          <meshStandardMaterial color="#a93226" metalness={0.4} roughness={0.38} />
        </mesh>
        <mesh position={[side * 0.24, -0.02, 0.38]}>
          <sphereGeometry args={[0.26, 14, 12]} />
          <meshStandardMaterial color="#a93226" metalness={0.4} roughness={0.38} />
        </mesh>
        <mesh position={[side * 0.18, 0.12, 0.38]}>
          <boxGeometry args={[0.22, 0.28, 0.28]} />
          <meshStandardMaterial color="#2f343c" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Elbow + vertical discharge through the plate, into the hopper */}
        <mesh position={[side * 0.08, 0.38, 0.12]}>
          <cylinderGeometry args={[0.075, 0.075, 0.72, 12]} />
          <meshStandardMaterial color="#5c6370" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[side * 0.08, 0.74, 0.12]} rotation={[0, 0, -side * 0.35]}>
          <cylinderGeometry args={[0.06, 0.09, 0.28, 12]} />
          <meshStandardMaterial color="#4a5058" metalness={0.5} roughness={0.35} />
        </mesh>
        {/* Flange on plate */}
        <mesh position={[side * 0.08, 0.18, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.06, 12]} />
          <meshStandardMaterial color="#6a7078" metalness={0.45} roughness={0.4} />
        </mesh>
      </group>
      {pulse > 0.05 && (
        <mesh position={[side * 0.06, 1.15 + pulse * 0.35, 0.08]}>
          <sphereGeometry args={[0.28 + pulse * 0.95, 14, 10]} />
          <meshBasicMaterial color="#f4e2c2" transparent opacity={0.28 * pulse} depthWrite={false} />
        </mesh>
      )}
    </group>
  );
}

function Handwheel({ radius = 0.28 }: { radius?: number }) {
  return (
    <group>
      <mesh>
        <torusGeometry args={[radius, 0.032, 8, 18]} />
        <meshStandardMaterial color="#2e333a" metalness={0.55} roughness={0.35} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
          <boxGeometry args={[radius * 1.85, 0.035, 0.035]} />
          <meshStandardMaterial color="#3e444c" metalness={0.5} roughness={0.35} />
        </mesh>
      ))}
      <mesh>
        <cylinderGeometry args={[0.045, 0.045, 0.08, 10]} />
        <meshStandardMaterial color="#4a5058" metalness={0.5} roughness={0.35} />
      </mesh>
    </group>
  );
}

function Unit({ silo, env }: { silo: SiloDef; env: ReturnType<typeof envAt> }) {
  const rust = useMemo(() => rustTex(), []);
  const spinning = env.flow > 0.2;
  const labels = useSimStore((s) => s.labels);
  const showLabels = labels && env.cutaway > 0.6;
  const showRod = env.lance > 0.04 || (env.jam > 0.5 && env.cannon < 0.25);
  const insert = showRod ? 0.55 + env.lance * 0.7 : 0;

  const glass = {
    color: "#b7c2cc",
    metalness: 0.12,
    roughness: 0.18,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false,
  } as const;

  return (
    <group position={[silo.x, 0, silo.z]}>
      {/* Square bolted inlet plate — mounting face for air cannons */}
      <mesh position={[0, OUTLET_Y + 0.22, 0]}>
        <boxGeometry args={[1.7, 0.14, 1.7]} />
        <meshStandardMaterial color="#8d9096" metalness={0.4} roughness={0.45} map={rust} />
      </mesh>
      {[-0.68, 0.68].flatMap((x) =>
        [-0.68, 0.68].map((z) => (
          <mesh key={`${x}${z}`} position={[x, OUTLET_Y + 0.32, z]}>
            <cylinderGeometry args={[0.045, 0.045, 0.12, 8]} />
            <meshStandardMaterial color="#cfd3d8" metalness={0.6} roughness={0.3} />
          </mesh>
        )),
      )}

      {/* Short throat into the hopper — where the cap forms */}
      <mesh position={[0, OUTLET_Y + 0.62, 0]}>
        <cylinderGeometry args={[0.42, 0.55, 0.7, 16, 1, true]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.3} roughness={0.5} side={THREE.DoubleSide} transparent opacity={0.45} />
      </mesh>

      {/* HORIZONTAL sliding gate (shiber) — stem + handwheel to the side */}
      <group position={[0, OUTLET_Y - 0.08, 0]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[1.95, 0.2, 1.28]} />
          <meshStandardMaterial color="#5b616a" metalness={0.35} roughness={0.5} />
        </mesh>
        {/* Gate plate, slightly cracked open */}
        <mesh position={[0.18, 0, 0]}>
          <boxGeometry args={[1.28, 0.07, 1.02]} />
          <meshStandardMaterial color="#3d434c" metalness={0.45} roughness={0.4} />
        </mesh>
        {/* Horizontal stem along −X */}
        <mesh position={[-1.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.038, 0.038, 1.85, 10]} />
          <meshStandardMaterial color="#6a7180" metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[-0.62, 0, 0]}>
          <boxGeometry args={[0.22, 0.16, 0.16]} />
          <meshStandardMaterial color="#4a5058" metalness={0.4} roughness={0.4} />
        </mesh>
        {/* Handwheel in YZ plane — turn it from the side, like a real knife-gate */}
        <group position={[-2.38, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <Handwheel radius={0.3} />
        </group>
      </group>

      {/* Extractor housing — steel frame + transparent walls so the cap is visible */}
      <group position={[0, EXTRACTOR_Y, 0]}>
        {/* Opaque floor */}
        <mesh position={[0, -0.78, 0.05]}>
          <boxGeometry args={[2.55, 0.1, 1.45]} />
          <meshStandardMaterial color="#6c7078" metalness={0.2} roughness={0.6} />
        </mesh>
        {/* Steel edge frames */}
        {/* Steel edge frames — posts only, so glass walls stay readable */}
        {[-1.26, 1.26].flatMap((x) =>
          [-0.66, 0.66].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0, z]}>
              <boxGeometry args={[0.08, 1.58, 0.08]} />
              <meshStandardMaterial color="#7a7e85" metalness={0.28} roughness={0.5} />
            </mesh>
          )),
        )}
        <mesh position={[0, 0, -0.68]}>
          <boxGeometry args={[2.55, 0.1, 0.08]} />
          <meshStandardMaterial color="#7a7e85" metalness={0.28} roughness={0.5} />
        </mesh>
        {/* Transparent walls */}
        <mesh position={[0, 0, 0.72]}>
          <boxGeometry args={[2.42, 1.48, 0.04]} />
          <meshStandardMaterial {...glass} />
        </mesh>
        <mesh position={[0, 0, -0.62]}>
          <boxGeometry args={[2.42, 1.48, 0.04]} />
          <meshStandardMaterial {...glass} />
        </mesh>
        <mesh position={[-1.22, 0, 0.05]}>
          <boxGeometry args={[0.04, 1.48, 1.32]} />
          <meshStandardMaterial {...glass} />
        </mesh>
        <mesh position={[1.22, 0, 0.05]}>
          <boxGeometry args={[0.04, 1.48, 1.32]} />
          <meshStandardMaterial {...glass} />
        </mesh>
        {/* Inlet opening from hopper (top cut) */}
        <mesh position={[0, 0.82, 0.05]}>
          <boxGeometry args={[1.05, 0.06, 0.85]} />
          <meshStandardMaterial color="#5c6168" metalness={0.3} roughness={0.5} />
        </mesh>

        <Shaft localZ={-0.22} dir={1} spinning={spinning} />
        <Shaft localZ={0.28} dir={-1} spinning={spinning} />
      </group>

      {/* Red inspection nozzle + steel lance going INTO the hopper cap */}
      <group position={[0.58, OUTLET_Y + 0.02, 0.92]} rotation={[0.7, 0.08, 0]}>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.12, 0.175, 0.42, 14]} />
          <meshStandardMaterial
            color="#c0392b"
            metalness={0.2}
            roughness={0.45}
            emissive="#7a1f14"
            emissiveIntensity={0.35 + env.lance * 1.4}
          />
        </mesh>
        <mesh position={[0, 0.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 14]} />
          <meshStandardMaterial color="#8a2a22" metalness={0.3} roughness={0.45} />
        </mesh>
        {showRod && (
          <>
            {/* Steel rod through the tube, into the blockage */}
            <mesh position={[0, 0.2 - insert * 0.85, 0]}>
              <cylinderGeometry args={[0.042, 0.042, 2.35, 10]} />
              <meshStandardMaterial color="#c5ccd4" metalness={0.72} roughness={0.22} />
            </mesh>
            {/* Outer handle / grip */}
            <mesh position={[0, 1.22, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.035, 0.035, 0.38, 8]} />
              <meshStandardMaterial color="#2c3138" metalness={0.4} roughness={0.45} />
            </mesh>
            <mesh position={[0, 1.22, 0]}>
              <sphereGeometry args={[0.07, 10, 8]} />
              <meshStandardMaterial color="#3a4048" metalness={0.4} roughness={0.4} />
            </mesh>
            {env.lance > 0.12 && (
              <mesh position={[0, -1.05 - env.lance * 0.15, 0]}>
                <sphereGeometry args={[0.16 + env.lance * 0.42, 12, 10]} />
                <meshBasicMaterial color="#f0e0c0" transparent opacity={0.32 * env.lance} depthWrite={false} />
              </mesh>
            )}
          </>
        )}
      </group>

      <AirCannon side={-1} pulse={env.cannon} />
      <AirCannon side={1} pulse={env.cannon} />

      {/* Discharge into trough */}
      <mesh position={[0, EXTRACTOR_Y - 1.05, 0.05]}>
        <boxGeometry args={[1.1, 0.45, 0.7]} />
        <meshStandardMaterial color="#6e737c" metalness={0.25} roughness={0.55} />
      </mesh>

      {showLabels && silo.id === 5 && (
        <>
          <Html position={[0, EXTRACTOR_Y + 0.15, 1.35]} center distanceFactor={18} occlude={false}>
            <div className="pointer-events-none rounded-sm bg-ink/80 px-2 py-1 font-display text-[11px] tracking-[0.14em] text-paper uppercase">
              Extractor 2 axe
            </div>
          </Html>
          <Html position={[1.55, OUTLET_Y + 0.55, 0.55]} center distanceFactor={18} occlude={false}>
            <div className="pointer-events-none rounded-sm bg-ink/80 px-2 py-1 font-display text-[11px] tracking-[0.14em] text-moss uppercase">
              Tun KQP
            </div>
          </Html>
          <Html position={[-2.2, OUTLET_Y + 0.35, 0.2]} center distanceFactor={18} occlude={false}>
            <div className="pointer-events-none rounded-sm bg-ink/80 px-2 py-1 font-display text-[11px] tracking-[0.14em] text-paper uppercase">
              Shiber orizontal
            </div>
          </Html>
          <Html position={[0.95, OUTLET_Y + 0.15, 1.55]} center distanceFactor={18} occlude={false}>
            <div className="pointer-events-none rounded-sm bg-danger/90 px-2 py-1 font-display text-[11px] tracking-[0.12em] text-paper uppercase">
              Tijă + tub vizitare
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

function Trough({ env }: { env: ReturnType<typeof envAt> }) {
  const labels = useSimStore((s) => s.labels);
  return (
    <group position={[0, TROUGH_Y, FRONT_Z]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[28, 0.08, 0.85]} />
        <meshStandardMaterial color="#6d727a" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.28, -0.42]}>
        <boxGeometry args={[28, 0.55, 0.08]} />
        <meshStandardMaterial color="#7a8088" metalness={0.25} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.28, 0.42]}>
        <boxGeometry args={[28, 0.55, 0.08]} />
        <meshStandardMaterial color="#7a8088" metalness={0.25} roughness={0.5} transparent opacity={0.35} />
      </mesh>
      {env.flow > 0.55 && env.jam < 0.5 && (
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[26, 0.14, 0.48]} />
          <meshStandardMaterial color="#d5c7ad" roughness={1} />
        </mesh>
      )}
      {labels && env.cutaway > 0.6 && (
        <Html position={[0, 0.7, 0.6]} center distanceFactor={20} occlude={false}>
          <div className="pointer-events-none rounded-sm bg-ink/80 px-2 py-1 font-display text-[11px] tracking-[0.14em] text-paper uppercase">
            Rigolă
          </div>
        </Html>
      )}
    </group>
  );
}

export function Extraction() {
  const time = useSimStore((s) => s.time);
  const env = envAt(time);
  return (
    <group>
      {WORKING.map((s) => (
        <Unit key={s.id} silo={s} env={env} />
      ))}
      <Trough env={env} />
    </group>
  );
}
