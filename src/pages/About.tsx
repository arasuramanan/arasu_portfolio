import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { GraduationCap, Briefcase, Rocket } from "lucide-react";

const timeline = [
  { year: "2024 — Now", title: "Senior Full-Stack Engineer", org: "Nebula Labs", icon: Rocket, desc: "Leading a small team building real-time collaboration tools with React, WebGL, and edge functions." },
  { year: "2022 — 2024", title: "Frontend Engineer", org: "Lumen Studio", icon: Briefcase, desc: "Shipped 20+ marketing sites and product UIs, focusing on motion design and accessibility." },
  { year: "2020 — 2022", title: "Junior Developer", org: "Pixelforge", icon: Briefcase, desc: "Built component libraries, internal tools, and design system tokens used by 12+ teams." },
  { year: "2016 — 2020", title: "B.Sc. Computer Science", org: "State University", icon: GraduationCap, desc: "Graduated with honors. Specialized in graphics programming and human-computer interaction." },
];

const stats = [
  { value: 5, suffix: "+", label: "Years experience" },
  { value: 40, suffix: "+", label: "Projects shipped" },
  { value: 12, suffix: "", label: "Open source repos" },
  { value: 99, suffix: "%", label: "Client satisfaction" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref} className="heading text-4xl md:text-5xl font-bold text-gradient-primary">
      {n}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <div className="container-tight py-12 lg:py-20">
      <SectionHeader
        eyebrow="about"
        title="A developer who treats the web like a canvas"
        subtitle="I'm Arasu Ramanan — based in India, building products at the intersection of engineering, design, and motion. I care about details that feel alive."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-6 text-center hover:border-primary/40 transition-colors"
          >
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
        {timeline.map((item, i) => {
          const Icon = item.icon;
          const left = i % 2 === 0;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: left ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className={`relative pl-16 sm:pl-0 sm:w-1/2 mb-10 ${
                left ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
              }`}
            >
              <span
                className={`absolute top-2 w-12 h-12 rounded-full glass border border-primary/40 flex items-center justify-center shadow-glow-soft
                  left-0 sm:left-auto ${left ? "sm:-right-6" : "sm:-left-6"}`}
              >
                <Icon className="w-5 h-5 text-primary" />
              </span>
              <div className="glass-card p-5">
                <p className="mono text-xs text-primary mb-1">{item.year}</p>
                <h3 className="heading font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.org}</p>
                <p className="mt-2 text-sm text-foreground/80">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
