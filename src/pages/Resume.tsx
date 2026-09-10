import { motion } from "framer-motion";
import { Download, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";

const sections = [
  {
    title: "Experience",
    items: [
      { h: "Senior Full-Stack Engineer · Nebula Labs", s: "2024 — Present", b: "Lead engineer on the realtime collaboration product. Built WebSocket-driven editor with sub-50ms latency." },
      { h: "Frontend Engineer · Lumen Studio", s: "2022 — 2024", b: "Shipped 20+ marketing sites & product UIs. Built shared design system used across 6 brands." },
      { h: "Junior Developer · Pixelforge", s: "2020 — 2022", b: "Component libraries, internal dashboards, design tokens." },
    ],
  },
  {
    title: "Education",
    items: [
      { h: "B.Sc. Computer Science · State University", s: "2016 — 2020", b: "Graphics & HCI specialization. Honors thesis on realtime fluid simulation." },
    ],
  },
  {
    title: "Highlights",
    items: [
      { h: "Conference talk — ReactConf EU", s: "2024", b: "“Motion design for engineers: principles and pitfalls.”" },
      { h: "Open source — 12 repos, 4k+ stars", s: "Ongoing", b: "Maintainer of `react-tilt-fx` and `useThreeScene`." },
    ],
  },
];

export default function Resume() {
  return (
    <div className="container-tight py-12 lg:py-20">
      <SectionHeader eyebrow="resume" title="A printable summary" subtitle="The TL;DR of my career so far. Download for the full PDF." />

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
          <a href="/res.pdf" download="Arasu_Ramanan_Resume.pdf">
            <Download className="mr-2 w-4 h-4" /> Download PDF
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="glass border-primary/40">
          <a href="mailto:arasua1993@gmail.com">
            <Mail className="mr-2 w-4 h-4" /> Email me
          </a>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 lg:p-12 max-w-3xl mx-auto"
      >
        <header className="flex items-start gap-4 pb-6 border-b border-border/60 mb-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-soft">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="heading text-2xl font-bold">Arasu Ramanan</h2>
            <p className="text-muted-foreground">Full-Stack Developer · India</p>
            <p className="mono text-xs text-primary mt-1">arasua1993@gmail.com · Arasu Ramanan</p>
          </div>
        </header>

        {sections.map((sec, i) => (
          <motion.section
            key={sec.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="mb-8"
          >
            <h3 className="heading text-sm uppercase tracking-[0.2em] text-primary mb-4">{sec.title}</h3>
            <div className="space-y-5">
              {sec.items.map((it) => (
                <div key={it.h}>
                  <div className="flex flex-wrap justify-between gap-2">
                    <h4 className="font-semibold">{it.h}</h4>
                    <span className="mono text-xs text-muted-foreground">{it.s}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{it.b}</p>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
}
