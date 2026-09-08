export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="container-tight py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Arasu Ramanan. Crafted with React & Framer Motion.</p>
        <p className="mono text-xs">v1.0.0 · built for speed</p>
      </div>
    </footer>
  );
}
