import { SILO_H, SILO_R, SILOS } from "@/lib/sim/layout";
import { envAt } from "@/lib/sim/timeline";
import { useSimStore } from "@/lib/sim/store";

export function Silos() {
  const time = useSimStore((s) => s.time);
  const env = envAt(time);
  const cut = env.cutaway > 0.4;
  const ghost = env.siloGhost;

  return (
    <group>
      {SILOS.map((silo) => {
        const isWork = silo.working;
        const opacity = isWork ? 1 - ghost * 0.5 : 0.28;
        const segments = isWork ? 16 : 10;
        // cutaway: cilindru deschis doar la silozurile working
        const thetaStart = isWork && cut ? Math.PI * 0.35 : 0;
        const thetaLength = isWork && cut ? Math.PI * 1.3 : Math.PI * 2;

        return (
          <group key={silo.id} position={[silo.x, 0, silo.z]}>
            <mesh position={[0, SILO_H / 2, 0]}>
              <cylinderGeometry
                args={[SILO_R, SILO_R, SILO_H, segments, 1, false, thetaStart, thetaLength]}
              />
              <meshBasicMaterial
                color={isWork ? "#c9c6bf" : "#8a8680"}
                transparent={opacity < 0.95}
                opacity={opacity}
                depthWrite={opacity > 0.5}
              />
            </mesh>
            <mesh position={[0, SILO_H + 0.25, 0]}>
              <cylinderGeometry
                args={[SILO_R + 0.1, SILO_R - 0.3, 0.5, 10, 1, false, thetaStart, thetaLength]}
              />
              <meshBasicMaterial
                color="#8e949c"
                transparent={opacity < 0.95}
                opacity={opacity}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}