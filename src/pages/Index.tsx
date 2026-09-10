import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, stagger } from "@/lib/motion";

const HeroScene = lazy(() => import("@/components/HeroScene"));

export default function Index() {
  return (
    <section className="relative min-h-[calc(100vh-7rem)] container-tight overflow-hidden">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-center py-8 sm:py-12 lg:py-12">

        {/* Left: Hero Content */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="relative z-10"
        >
          {/* Availability Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mono text-xs text-primary mb-5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Available for select freelance work
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="heading text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            Hi, I'm{" "}
            <span className="text-gradient-primary">
              Arasu Ramanan
            </span>
            .
            <br />

            I build{" "}
            <span className="text-gradient">
              immersive web experiences.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Full-stack developer & creative engineer crafting performant
            interfaces with React.js, and a serious obsession for
            motion design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Button
              asChild
              size="lg"
              className="group bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow border-0"
            >
              <Link to="/projects">
                View Projects
                <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group glass border-primary/40 hover:border-primary hover:shadow-glow-soft"
            >
              <a href="/res.pdf" download>
                <Download className="mr-1.5 w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap gap-8 mono text-xs text-muted-foreground"
          >
            <div>
              <div className="text-2xl heading text-foreground font-semibold">
                6.10+
              </div>
              <div>years experience</div>
            </div>

            <div>
              <div className="text-2xl heading text-foreground font-semibold">
                40+
              </div>
              <div>projects shipped</div>
            </div>

            <div>
              <div className="text-2xl heading text-foreground font-semibold">
                ∞
              </div>
              <div>cups of coffee</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative h-[360px] sm:h-[440px] lg:h-[520px] xl:h-[560px] lg:scale-90 xl:scale-95 origin-center"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-primary/15 blur-3xl rounded-full" />

          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-primary/30 animate-pulse-glow" />
              </div>
            }
          >
            <HeroScene />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}