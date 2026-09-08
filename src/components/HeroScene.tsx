
import { Canvas } from "@react-three/fiber";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useReducedMotion";

export default function HeroScene() {
  const mobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, mobile ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={0.3} />

      <pointLight
        position={[5, 5, 5]}
        intensity={1.15}
        color="#ffffff"
      />

      <pointLight
        position={[-4, -2, -3]}
        intensity={0.55}
        color="#c084fc"
      />
    </Canvas>
  );
}

