import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-tight py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 max-w-lg mx-auto"
      >
        <p className="mono text-sm text-primary mb-2">// 404</p>
        <h1 className="heading text-6xl font-bold text-gradient mb-3">Lost in space</h1>
        <p className="text-muted-foreground mb-8">This page drifted out of orbit. Let's get you back.</p>
        <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
          <Link to="/"><Home className="mr-2 w-4 h-4" /> Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
