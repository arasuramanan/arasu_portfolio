import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import SocialRail from "./SocialRail";
import Footer from "./Footer";
import ParticlesBackground from "./ParticlesBackground";
import { getPageVariants } from "@/lib/motion";

export default function Layout() {
  const location = useLocation();
  const variants = getPageVariants(location.pathname);

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <ParticlesBackground />
      <Navbar />
      <SocialRail />
      <main className="flex-1 pt-28">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="will-change-transform"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
