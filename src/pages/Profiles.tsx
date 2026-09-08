import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Github, Code, Trophy, Activity } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const profiles = [
  {
    name: "GitHub",
    handle: "@arasuramanan",
    icon: Github,
    color: "from-violet-400 to-purple-500",
    href: "https://github.com/arasuramanan",
    stats: [
      { label: "Repos", value: 84 },
      { label: "Contributions (1y)", value: 1240 },
      { label: "Stars earned", value: 4200 },
    ],
  },
  {
    name: "LeetCode",
    handle: "arasuramanan",
    icon: Code,
    color: "from-amber-400 to-orange-500",
    href: "https://leetcode.com",
    stats: [
      { label: "Solved", value: 412 },
      { label: "Contest rating", value: 1980 },
      { label: "Top %", value: 8 },
    ],
  },
  {
    name: "HackerRank",
    handle: "arasuramanan",
    icon: Trophy,
    color: "from-emerald-400 to-teal-500",
    href: "https://hackerrank.com",
    stats: [
      { label: "Badges", value: 24 },
      { label: "Stars", value: 5 },
      { label: "Certificates", value: 6 },
    ],
  },
  {
    name: "Codeforces",
    handle: "arasuramanan",
    icon: Activity,
    color: "from-red-400 to-pink-500",
    href: "https://codeforces.com",
    stats: [
      { label: "Rating", value: 1640 },
      { label: "Rounds", value: 58 },
      { label: "Problems", value: 320 },
    ],
  },
];

function StatCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString()}</span>;
}

export default function Profiles() {
  return (
    <div className="container-tight py-12 lg:py-20">
      <SectionHeader eyebrow="profiles" title="Coding profiles" subtitle="Where I learn, compete, and build in public." />
      <div className="grid sm:grid-cols-2 gap-6">
        {profiles.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group glass-card p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-glow-soft`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="heading font-semibold text-lg">{p.name}</h3>
                    <p className="mono text-xs text-muted-foreground">{p.handle}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {p.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="heading text-xl font-bold text-gradient-primary">
                      <StatCounter value={s.value} />
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
