import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.35 } },
};

export const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } },
};

// Per-route distinct page transitions
export const pageVariants: Record<string, Variants> = {
  "/": {
    initial: { opacity: 0, scale: 1.04 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.4 } },
  },
  // "/about": {
  //   initial: { opacity: 0, x: 60 },
  //   animate: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  //   exit: { opacity: 0, x: -60, transition: { duration: 0.35 } },
  // },
  "/projects": {
    initial: { opacity: 0, y: 40, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, filter: "blur(8px)", transition: { duration: 0.35 } },
  },
  "/skills": {
    initial: { opacity: 0, rotateX: -8, y: 30 },
    animate: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, rotateX: 8, transition: { duration: 0.35 } },
  },
  "/resume": {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 1.02, transition: { duration: 0.3 } },
  },
  // "/articles": {
  //   initial: { opacity: 0, y: 24 },
  //   animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  //   exit: { opacity: 0, y: -24, transition: { duration: 0.3 } },
  // },
  // "/profiles": {
  //   initial: { opacity: 0, scale: 0.96, y: 20 },
  //   animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55 } },
  //   exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } },
  // },
  "/contact": {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.55 } },
    exit: { opacity: 0, x: 60, transition: { duration: 0.35 } },
  },
  default: fadeUp,
};

export const getPageVariants = (path: string): Variants =>
  pageVariants[path] ?? pageVariants.default;
