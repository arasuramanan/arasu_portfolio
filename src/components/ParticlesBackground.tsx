import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { usePrefersReducedMotion, useIsMobile } from "@/hooks/useReducedMotion";

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      interactivity: {
        events: {
          onHover: { enable: !reduced, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 150, links: { opacity: 0.35 } },
        },
      },
      particles: {
        color: { value: ["#ffffff", "#f8fafc", "#e2e8f0"] },
        links: {
          color: "#ffffff",
          distance: 130,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: !reduced,
          speed: mobile ? 0.32 : 0.55,
          direction: "none" as const,
          outModes: { default: "out" as const },
          random: true,
        },
        number: {
          value: mobile ? 22 : 52,
          density: { enable: true, area: 900 },
        },
        opacity: { value: { min: 0.35, max: 0.9 } },
        shape: { type: "star" },
        size: { value: { min: 0.9, max: 2.4 } },
      },
    }),
    [reduced, mobile]
  );

  if (!ready) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Particles id="tsparticles" options={options as any} className="absolute inset-0 pointer-events-auto" />
    </div>
  );
}
