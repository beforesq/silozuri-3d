import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { BOULDER_N, FINE_N, prepInstanced, writeBoulders, writeFines } from "@/lib/sim/flow";
import { useSimStore } from "@/lib/sim/store";

export function Flow() {
  const fines = useRef<THREE.InstancedMesh>(null);
  const boulders = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (fines.current) prepInstanced(fines.current);
    if (boulders.current) prepInstanced(boulders.current);
  }, []);

  useFrame(() => {
    const t = useSimStore.getState().time;
    if (fines.current) writeFines(fines.current, t);
    if (boulders.current) writeBoulders(boulders.current, t);
  });

  return (
    <group>
      <instancedMesh ref={fines} args={[undefined, undefined, FINE_N]} frustumCulled={false} castShadow={false}>
        <sphereGeometry args={[1, 5, 4]} />
        <meshBasicMaterial color="#e2d3b8" />
      </instancedMesh>
      <instancedMesh ref={boulders} args={[undefined, undefined, BOULDER_N]} frustumCulled={false} castShadow={false}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#6a5340" />
      </instancedMesh>
    </group>
  );
}