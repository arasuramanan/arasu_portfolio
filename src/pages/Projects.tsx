import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const projects = [
  {
    title: "Railbook Premium",
    desc: "MERN railway booking platform with authentication, seat booking, and Razorpay payments.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Razorpay",
      "RESTful APIs",
      "Authentication",
      "Authorization",
    ],
    accent: "from-violet-400 to-purple-500",
    demo: "https://railbookpremium.netlify.app",
    repos: [
      {
        name: "Frontend",
        url: "https://github.com/arasuramanan/railbook-frontend",
      },
      {
        name: "Backend",
        url: "https://github.com/arasuramanan/railbook-backend",
      },
    ],
  },

  {
    title: "Looply",
    desc: "MERN social video platform with reels, likes, comments, follows, and Cloudinary uploads.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Vite",
      "RESTful APIs",
      "Authentication",
      "Authorization",
      "Responsive Design",
    ],
    accent: "from-purple-400 to-fuchsia-500",
    demo: "https://looply-mern.netlify.app/login",
    repos: [
      {
        name: "Frontend",
        url: "https://github.com/arasuramanan/looply-frontend",
      },
      {
        name: "Backend",
        url: "https://github.com/arasuramanan/looply-backend",
      },
    ],
  },

  {
    title: "Dashboard",
    desc: "Responsive dashboard application built with React.js and Tailwind CSS for displaying and managing application data.",
    tags: ["Tailwind CSS", "React.js", "Responsive Design"],
    accent: "from-fuchsia-400 to-purple-500",
    demo: "https://dasharas.netlify.app/",
    repos: [
      {
        name: "Frontend",
        url: "https://github.com/arasuramanan/Dash_",
      },
    ],
  },

  {
    title: "Invoice Generator",
    desc: "React-based application for creating professional invoices with customer details, product pricing, automatic calculations, and downloadable PDF invoices.",
    tags: ["React.js", "Bootstrap", "Responsive Design"],
    accent: "from-violet-500 to-purple-700",
    demo: "https://invoicearas.netlify.app/",
    repos: [
      {
        name: "GitHub",
        url: "https://github.com/arasuramanan/invoice_generator",
      },
    ],
  },

  {
    title: "Health Check Dashboard",
    desc: "A MERN-based dashboard for monitoring application and service health with status information and a responsive interface.",
    tags: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Leaflet",
      "TypeScript",
    ],
    accent: "from-purple-300 to-violet-500",
  },

  {
    title: "Splus Dashboard",
    desc: "A MERN-based dashboard application for managing and visualizing business data.",
    tags: ["React.js", "Bootstrap", "Responsive Design"],
    accent: "from-indigo-400 to-purple-500",
  },
];

function TiltCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(
    useTransform(my, [-0.5, 0.5], [8, -8]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

  const ry = useSpring(
    useTransform(mx, [-0.5, 0.5], [-8, 8]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();

    if (!r) return;

    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06 }}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl border border-slate-200 bg-white text-slate-900 p-6 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.2)] hover:border-primary/50 transition-colors cursor-pointer"
    >
      {/* Hover Glow */}
      <div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-20 blur-xl transition-opacity -z-10`}
      />

      <div
        style={{ transform: "translateZ(30px)" }}
        className="space-y-4"
      >
        {/* Project Preview */}
        <div
          className={`w-full h-36 rounded-xl bg-gradient-to-br ${project.accent} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_50%)]" />

          <div className="absolute inset-0 flex items-center justify-center heading text-3xl font-bold text-white/90 drop-shadow">
            {project.title
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </div>
        </div>

        {/* Project Details */}
        <div>
          <h3 className="heading text-xl font-semibold mb-1.5">
            {project.title}
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2">
            {project.desc}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="mono text-[11px] px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links - Only shown when project has links */}
        {(project.demo || project.repos) && (
          <div className="flex flex-wrap gap-3 pt-1">
            {/* Live Demo */}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-glow transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live
              </a>
            )}

            {/* GitHub Repositories */}
            {project.repos?.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                {repo.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <div className="container-tight py-12 lg:py-20">
      <SectionHeader
        eyebrow="projects"
        title="Selected work"
        subtitle="A few things I've built recently. Hover the cards for some depth — and click through for live demos and source."
      />

      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ perspective: 1200 }}
      >
        {projects.map((project, index) => (
          <TiltCard
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}