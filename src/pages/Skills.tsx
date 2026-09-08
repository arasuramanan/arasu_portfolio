import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Code2, Server, Wrench } from "lucide-react";

const groups = [
  {
    name: "Frontend",
    icon: Code2,
    skills: [
      { name: "React / Next", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Three.js / R3F", level: 80 },
      { name: "Tailwind / CSS", level: 95 },
      { name: "Framer Motion", level: 88 },
    ],
  },
  {
    name: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 88 },
      { name: "PostgreSQL", level: 80 },
      { name: "GraphQL / tRPC", level: 75 },
      { name: "Edge Functions", level: 78 },
      { name: "Redis", level: 70 },
    ],
  },
  {
    name: "Tools & Cloud",
    icon: Wrench,
    skills: [
      { name: "Vite / Bun", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS / Vercel", level: 80 },
      { name: "Figma", level: 85 },
      { name: "Git / CI", level: 92 },
    ],
  },
];

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [w, setW] = useState(0);
  useEffect(() => { if (inView) setW(level); }, [inView, level]);
  return (
    <motion.div
      ref={ref}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="flex justify-between mb-1.5 text-sm">
        <span className="text-foreground/90">{name}</span>
        <span className="mono text-xs text-primary">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${w}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ filter: "brightness(1.12)" }}
          className="h-full bg-gradient-primary shadow-glow-soft"
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <div className="container-tight py-12 lg:py-20">
      <SectionHeader
        eyebrow="skills"
        title="Tools of the trade"
        subtitle="A snapshot of technologies I reach for. I value depth, but I'm always learning something new."
      />
      <div className="grid lg:grid-cols-3 gap-6">
        {groups.map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 220, damping: 20 }}
              className="group glass-card p-6 hover:border-primary/50 hover:shadow-glow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 280, damping: 16 }}
                  className="w-10 h-10 rounded-lg bg-gradient-primary/20 border border-primary/40 flex items-center justify-center"
                >
                  <Icon className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="heading text-lg font-semibold">{g.name}</h3>
              </div>
              <div className="space-y-4">
                {g.skills.map((s) => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
