import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { toast } from "sonner";

const links = [
  { to: "/", label: "Home" },
  // { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/resume", label: "Resume" },
  // { to: "/articles", label: "Articles" },
  // { to: "/profiles", label: "Profiles" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="container-tight mt-4">
        <nav className="glass-card flex items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="relative inline-block w-7 h-7 rounded-md bg-gradient-primary glow-soft" />
            <span className="heading text-lg font-bold tracking-tight">
              Arasu Ramanan
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative px-3 py-2 text-sm rounded-md transition-colors",
                      "text-muted-foreground hover:text-foreground",
                      isActive && "text-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <span className="relative">
                      {l.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-primary rounded-full shadow-glow-soft"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <Button
                size="sm"
                variant="outline"
                onClick={handleSignOut}
                className="glass border-border/60 hover:border-primary/60 hover:text-primary"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                Sign out
              </Button>
            ) : (
              <Button
                asChild
                size="sm"
                className="bg-gradient-primary text-primary-foreground border-0 shadow-glow-soft"
              >
              </Button>
            )}
          </div>

          <button
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-md hover:bg-secondary"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden glass-card mt-2 p-2"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block px-4 py-3 rounded-md text-sm",
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 pt-2 border-t border-border/60 px-2">
              <div className="mb-2 flex justify-end">
                <ThemeToggle />
              </div>
              {user ? (
                <Button variant="outline" size="sm" onClick={() => { setOpen(false); handleSignOut(); }} className="w-full glass border-border/60">
                  <LogOut className="w-4 h-4 mr-1.5" /> Sign out
                </Button>
              ) : (
                <Button asChild size="sm" className="w-full bg-gradient-primary text-primary-foreground border-0">
                  <Link to="/" onClick={() => setOpen(false)}>
                    <LogIn className="w-4 h-4 mr-1.5" /> Sign in
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
