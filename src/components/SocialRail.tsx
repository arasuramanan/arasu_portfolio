import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Youtube, Instagram, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com", label: "GitHub", icon: Github },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://youtube.com", label: "YouTube", icon: Youtube },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "mailto:arasua1993@gmail.com", label: "Email", icon: Mail },
];

export default function SocialRail() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="hidden xl:flex flex-col gap-3 fixed left-6 bottom-6 z-40"
    >
      {socials.map(({ href, label, icon: Icon }, i) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={label}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="group glass w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 hover:shadow-glow-soft transition-all"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <Icon className="w-4 h-4" />
        </motion.a>
      ))}
      <div className="mx-auto w-px h-16 bg-gradient-to-b from-primary/60 to-transparent" />
    </motion.aside>
  );
}
