import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cameraShotAt } from "@/lib/sim/timeline";
import { useSimStore } from "@/lib/sim/store";

type ControlsLike = {
  enabled: boolean;
  target: THREE.Vector3;
  update: () => void;
};

export function CameraRig() {
  const camera = useThree((s) => s.camera);
  const pos = useRef(new THREE.Vector3(16, 24, 54));
  const look = useRef(new THREE.Vector3(0, 9, 0));
  const tmpP = useRef(new THREE.Vector3());
  const tmpT = useRef(new THREE.Vector3());

  useEffect(() => {
    camera.near = 0.15;
    camera.far = 420;
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.08);
    const { cameraMode, time } = useSimStore.getState();
    const shot = cameraShotAt(time);
    tmpP.current.set(...shot.position);
    tmpT.current.set(...shot.target);

    const controls = state.controls as unknown as ControlsLike | undefined;

    if (cameraMode === "cinematic") {
      if (controls) controls.enabled = false;
      const k = 1 - Math.exp(-d * 2.15);
      pos.current.lerp(tmpP.current, k);
      look.current.lerp(tmpT.current, k);
      camera.position.copy(pos.current);
      camera.lookAt(look.current);
      if (controls) {
        controls.target.copy(look.current);
        controls.update();
      }
    } else if (controls) {
      controls.enabled = true;
      pos.current.copy(camera.position);
      look.current.copy(controls.target);
    }
  });

  return null;
}
