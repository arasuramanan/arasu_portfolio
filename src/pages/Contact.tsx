import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Mail, MapPin, Send, CheckCircle2, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import SectionHeader from "@/components/SectionHeader";


const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message too short").max(1000),
});

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  const parsed = schema.safeParse(form);
  if (!parsed.success) {
    const errs: any = {};
    parsed.error.issues.forEach((i) => (errs[i.path[0]] = i.message));
    setErrors(errs);
    return;
  }

  setErrors({});
  setSubmitting(true);

  try {
    const res = await fetch("https://formspree.io/f/xqewobje", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
  ...form,
  _subject: "New Portfolio Message from Website",
  }),
    });

    if (!res.ok) throw new Error("Failed to send");

    setSent(true);
    setForm({ name: "", email: "", message: "" });
    toast.success("Message sent successfully");
  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="container-tight py-12 lg:py-20">
      <SectionHeader eyebrow="contact" title="Let's build something" subtitle="Got a project in mind, or just want to say hi? Drop a message." />

      <div className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-card p-6 space-y-6"
        >
          <div>
            <h3 className="heading text-xl font-semibold mb-2">Get in touch</h3>
            <p className="text-sm text-muted-foreground">I read every message. Expect a reply within 1–2 days.</p>
          </div>
          <div className="space-y-4">
            <a href="mailto:arasua1993@gmail.com" className="flex items-center gap-3 group">
              <span className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center group-hover:border-primary/60 group-hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="mono text-sm">arasua1993@gmail.com</p>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Based in</p>
                <p className="text-sm">India</p>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-border/60">
            <p className="mono text-xs text-muted-foreground mb-3">// elsewhere</p>
            <div className="flex gap-2">
              {[
                { icon: Github, href: "https://github.com/arasuramanan" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/arasu-ramanan/" },
                // { icon: Twitter, href: "https://twitter.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-lg glass border-border/60 flex items-center justify-center hover:text-primary hover:border-primary/60 hover:shadow-glow-soft transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 glass-card p-6"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center mb-4 shadow-glow-soft">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading text-xl font-semibold mb-2">Message received</h3>
                <p className="text-sm text-muted-foreground mb-6">Thanks for reaching out — I'll get back to you within 1–2 days.</p>
                <Button variant="outline" className="glass border-primary/40" onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}>
                  Send another
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
                noValidate
              >
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={form.name} onChange={update("name")} maxLength={100} className="mt-1.5 bg-secondary/50 border-border focus-visible:ring-primary" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={update("email")} maxLength={255} className="mt-1.5 bg-secondary/50 border-border focus-visible:ring-primary" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={6} value={form.message} onChange={update("message")} maxLength={1000} className="mt-1.5 bg-secondary/50 border-border focus-visible:ring-primary resize-none" />
                  <div className="flex justify-between mt-1">
                    {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : <span />}
                    <span className="mono text-[11px] text-muted-foreground">{form.message.length}/1000</span>
                  </div>
                </div>
                <Button type="submit" size="lg" disabled={submitting} className="w-full bg-gradient-primary text-primary-foreground border-0 shadow-glow group">
                  <Send className="mr-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  {submitting ? "Sending..." : "Send message"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
