import { SILOS } from "@/lib/sim/layout";
import { Extraction } from "./Extraction";
import { Flow } from "./Flow";
import { Pit } from "./Pit";
import { Silos } from "./Silos";

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
    </group>
  );
}

export function World() {
  return (
    <>
      <fog attach="fog" args={["#8fb7d6", 80, 240]} />
      <ambientLight intensity={0.72} />
      <hemisphereLight args={["#d7e6f5", "#6a6458", 0.45]} />
      <directionalLight position={[30, 48, 22]} intensity={1.55} color="#fff3dd" />
      <pointLight position={[0, -1.6, 10]} intensity={38} distance={24} color="#f2ead8" />

      <Pit />
      <Silos />
      <Gantry />
      <Extraction />
      <Flow />
    </>
  );
}