import { useMemo } from "react";
import {
  PIT_BACK,
  PIT_FLOOR,
  PIT_FRONT,
  PIT_LEFT,
  PIT_RIGHT,
  SILO_R,
  WORKING,
} from "@/lib/sim/layout";
import { gravelTex, soilTex } from "@/lib/sim/textures";

const YARD = 160;
const TRENCH_END = 48;

export function Pit() {
  const soil = useMemo(() => {
    const t = soilTex().clone();
    t.repeat.set(2, 2);
    return t;
  }, []);
  const gravel = useMemo(() => {
    const t = gravelTex().clone();
    t.repeat.set(22, 22);
    return t;
  }, []);

  const w = PIT_RIGHT - PIT_LEFT;
  const trenchDepth = TRENCH_END - PIT_BACK;
  const h = -PIT_FLOOR;
  const midZ = (TRENCH_END + PIT_BACK) / 2;

  return (
    <group>
      {/* Ground on the sides and behind — the trench toward +Z stays open (architectural section) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[PIT_LEFT - 50, 0, 0]} receiveShadow>
        <planeGeometry args={[100, YARD]} />
        <meshStandardMaterial map={gravel} color="#8a8478" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[PIT_RIGHT + 50, 0, 0]} receiveShadow>
        <planeGeometry args={[100, YARD]} />
        <meshStandardMaterial map={gravel} color="#8a8478" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, PIT_BACK - 40]} receiveShadow>
        <planeGeometry args={[w + 2, 80]} />
        <meshStandardMaterial map={gravel} color="#8a8478" roughness={1} />
      </mesh>

      {/* Soil walls of the section — extend toward the camera, no front wall */}
      <mesh position={[PIT_LEFT, PIT_FLOOR / 2, midZ]} receiveShadow>
        <boxGeometry args={[0.95, h, trenchDepth]} />
        <meshStandardMaterial map={soil} color="#5a4a32" roughness={1} />
      </mesh>
      <mesh position={[PIT_RIGHT, PIT_FLOOR / 2, midZ]} receiveShadow>
        <boxGeometry args={[0.95, h, trenchDepth]} />
        <meshStandardMaterial map={soil} color="#5a4a32" roughness={1} />
      </mesh>
      <mesh position={[0, PIT_FLOOR / 2, PIT_BACK]} receiveShadow>
        <boxGeometry args={[w, h, 0.95]} />
        <meshStandardMaterial map={soil} color="#4e3f2c" roughness={1} />
      </mesh>

      {/* Grass lip */}
      <mesh position={[PIT_LEFT, 0.08, midZ]}>
        <boxGeometry args={[1.4, 0.16, trenchDepth + 0.6]} />
        <meshStandardMaterial color="#4d6a38" roughness={1} />
      </mesh>
      <mesh position={[PIT_RIGHT, 0.08, midZ]}>
        <boxGeometry args={[1.4, 0.16, trenchDepth + 0.6]} />
        <meshStandardMaterial color="#4d6a38" roughness={1} />
      </mesh>
      <mesh position={[0, 0.08, PIT_BACK]}>
        <boxGeometry args={[w + 1.4, 0.16, 1.4]} />
        <meshStandardMaterial color="#4d6a38" roughness={1} />
      </mesh>

      {/* Cota 0 marker at the theoretical section plane */}
      <mesh position={[0, 0.04, PIT_FRONT]}>
        <boxGeometry args={[w + 0.6, 0.07, 0.07]} />
        <meshStandardMaterial color="#dce8c8" emissive="#7cb518" emissiveIntensity={0.28} />
      </mesh>

      {/* Chamber floor */}
      <mesh position={[0, PIT_FLOOR + 0.08, (PIT_FRONT + PIT_BACK) / 2]} receiveShadow>
        <boxGeometry args={[w - 1.2, 0.16, PIT_FRONT - PIT_BACK - 0.6]} />
        <meshStandardMaterial color="#8f8c86" roughness={0.88} />
      </mesh>
      <mesh position={[0, PIT_FLOOR / 2, PIT_BACK + 0.55]}>
        <boxGeometry args={[w - 1.4, h - 0.2, 0.22]} />
        <meshStandardMaterial color="#9a9790" roughness={0.85} />
      </mesh>

      {[-10, 0, 10].map((x) => (
        <mesh key={x} position={[x, PIT_FLOOR / 2, PIT_BACK + 1.4]}>
          <boxGeometry args={[0.7, h, 0.7]} />
          <meshStandardMaterial color="#9c9890" roughness={0.9} />
        </mesh>
      ))}

      {WORKING.map((s) => (
        <mesh key={`pad-${s.id}`} position={[s.x, PIT_FLOOR + 0.2, s.z]}>
          <cylinderGeometry args={[SILO_R + 0.6, SILO_R + 0.8, 0.28, 24]} />
          <meshStandardMaterial color="#7d7a74" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
