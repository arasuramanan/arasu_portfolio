import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const articles = [
  { title: "Designing motion that doesn't get in the way", date: "Mar 2025", read: 7, tag: "Design", excerpt: "Practical principles for adding animation to interfaces without overwhelming users." },
  { title: "Building a realtime cursor system in 200 lines", date: "Feb 2025", read: 9, tag: "Engineering", excerpt: "A breakdown of the WebSocket protocol, throttling, and rendering tricks behind multiplayer cursors." },
  { title: "Three.js performance: the 80/20 guide", date: "Jan 2025", read: 12, tag: "WebGL", excerpt: "The handful of optimizations that yielded the biggest gains in my last R3F project." },
  { title: "Why I stopped reaching for state libraries", date: "Dec 2024", read: 6, tag: "React", excerpt: "Modern React has more tools than you think. Here's how I structure state without Redux." },
  { title: "Edge functions in production: 6 months in", date: "Nov 2024", read: 8, tag: "Backend", excerpt: "What worked, what broke, and what I'd do differently next time." },
  { title: "A pragmatic intro to shaders for web devs", date: "Oct 2024", read: 11, tag: "WebGL", excerpt: "GLSL doesn't have to be scary. Start here and build your first fragment shader in 15 minutes." },
];

export default function Articles() {
  return (
    <div className="container-tight py-12 lg:py-20">
      <SectionHeader eyebrow="writing" title="Articles & notes" subtitle="Long-form thoughts on engineering, design, and the messy bits in between." />
      <div className="grid md:grid-cols-2 gap-5">
        {articles.map((a, i) => (
          <motion.a
            key={a.title}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="group glass-card p-6 block hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="mono text-[11px] px-2 py-0.5 rounded-full border border-primary/40 text-primary">{a.tag}</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
            </div>
            <h3 className="heading text-xl font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground mono">
              <span>{a.date}</span>
              <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {a.read} min read</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
