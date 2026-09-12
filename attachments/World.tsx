import { Sky } from "@react-three/drei";
import { SILOS } from "@/lib/sim/layout";
import { Extraction } from "./Extraction";
import { Flow } from "./Flow";
import { Pit } from "./Pit";
import { Silos } from "./Silos";

function DistantSilos() {
  // Faint extra silos in the background — industrial context, not a packing hall
  const spots: [number, number][] = [
    [-52, -18],
    [-40, -22],
    [48, -16],
    [58, -20],
  ];
  return (
    <group>
      {spots.map(([x, z], i) => (
        <mesh key={i} position={[x, 11, z]}>
          <cylinderGeometry args={[4.2, 4.2, 22, 20]} />
          <meshStandardMaterial color="#b8b5ae" transparent opacity={0.22} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

function Gantry() {
  const xs = SILOS.filter((s) => s.row === "back").map((s) => s.x);
  const minX = Math.min(...xs) - 4;
  const maxX = Math.max(...xs) + 4;
  const z = SILOS.find((s) => s.row === "back")!.z;
  const len = maxX - minX;
  return (
    <group>
      <mesh position={[(minX + maxX) / 2, 29.2, z]}>
        <boxGeometry args={[len, 0.45, 2.4]} />
        <meshStandardMaterial color="#8b929a" metalness={0.4} roughness={0.45} />
      </mesh>
      <mesh position={[(minX + maxX) / 2, 30.1, z]}>
        <boxGeometry args={[len, 1.1, 2.1]} />
        <meshStandardMaterial color="#6d757e" metalness={0.35} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Hills() {
  return (
    <group>
      <mesh position={[-30, 2, -70]} rotation={[0, 0.2, 0]}>
        <coneGeometry args={[28, 16, 7]} />
        <meshStandardMaterial color="#4f6a45" roughness={1} />
      </mesh>
      <mesh position={[25, 1.5, -80]} rotation={[0, -0.3, 0]}>
        <coneGeometry args={[36, 14, 7]} />
        <meshStandardMaterial color="#5a704c" roughness={1} />
      </mesh>
    </group>
  );
}

export function World() {
  return (
    <>
      <color attach="background" args={["#8fb7d6"]} />
      <fog attach="fog" args={["#9fc0d8", 70, 220]} />
      <Sky
        sunPosition={[80, 40, 30]}
        turbidity={4.5}
        rayleigh={1.1}
        mieCoefficient={0.004}
        mieDirectionalG={0.8}
      />
      <hemisphereLight args={["#d7e6f5", "#6a6458", 0.85]} />
      <ambientLight intensity={0.32} />
      <directionalLight
        position={[40, 55, 25]}
        intensity={2.35}
        color="#fff3dd"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={2}
        shadow-camera-far={160}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      {/* Pit work lights — keep boulders and extractor readable */}
      <pointLight position={[0, -1.2, 10]} intensity={90} distance={28} color="#f2ead8" />
      <pointLight position={[-6.5, -2.8, 9]} intensity={70} distance={18} color="#e8f0ff" />
      <pointLight position={[6.5, -2.8, 9]} intensity={70} distance={18} color="#e8f0ff" />
      <pointLight position={[0, -3.2, 7.4]} intensity={55} distance={14} color="#ffe6c8" />

      <Pit />
      <Silos />
      <Gantry />
      <Extraction />
      <Flow />
      <DistantSilos />
      <Hills />
    </>
  );
}
