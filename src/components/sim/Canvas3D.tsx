import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "./scene/CameraRig";
import { World } from "./scene/World";
import { useSimStore } from "@/lib/sim/store";

export function Canvas3D() {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.25]}
      frameloop="always"
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.shadowMap.enabled = false;
        const canvas = gl.domElement;
        const onLost = (e: Event) => {
          e.preventDefault();
          console.warn("[WebGL] Context Lost – attempting recovery...");
          useSimStore.getState().setPlaying(false);
        };
        const onRestored = () => {
          gl.setSize(canvas.clientWidth, canvas.clientHeight, false);
        };
        canvas.addEventListener("webglcontextlost", onLost, false);
        canvas.addEventListener("webglcontextrestored", onRestored, false);
      }}
      camera={{ position: [16, 24, 54], fov: 40, near: 0.15, far: 420 }}
      onPointerDown={() => useSimStore.getState().setCameraMode("manual")}
    >
      <color attach="background" args={["#8fb7d6"]} />
      <CameraRig />
      <World />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={4.5}
        maxDistance={95}
        minPolarAngle={0.12}
        maxPolarAngle={Math.PI - 0.18}
        target={[0, 2, 6]}
      />
    </Canvas>
  );
}