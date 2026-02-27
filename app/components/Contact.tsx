"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send, Mail, Github, Linkedin, Twitter, MapPin, Clock, CheckCircle, Loader2, MessageSquare
} from "lucide-react";

const GMAIL_BOILERPLATE =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  "&to=waqarkhalid2024%40gmail.com" +
  "&su=Project%20Inquiry%20%E2%80%94%20From%20Portfolio" +
  "&body=Hi%20Waqar%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project%20with%20you.%0A%0AProject%3A%20%5BDescribe%20your%20project%5D%0ABudget%3A%20%5BYour%20budget%20range%5D%0ATimeline%3A%20%5BDesired%20timeline%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D";

const SOCIALS = [
  {
    icon: Github,
    label: "GitHub",
    handle: "@WaqarHassan20",
    href: "https://github.com/WaqarHassan20",
    color: "#f0f6ff",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "waqar-khalid",
    href: "https://linkedin.com/in/waqar-khalid-9a1342338",
    color: "#0a66c2",
  },
  {
    icon: Twitter,
    label: "X / Twitter",
    handle: "@Waqarkhalid",
    href: "https://x.com/Waqarkhalid",
    color: "#f0f6ff",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "waqarkhalid2024@gmail.com",
    href: GMAIL_BOILERPLATE,
    color: "#94a3b8",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate async send (integrate Formspree/EmailJS here)
    await new Promise((r) => setTimeout(r, 2000));
    setStatus("success");
    setFormState({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  const inputBase =
    "w-full bg-white/[0.03] border rounded-2xl px-5 py-4 text-white placeholder-slate-600 text-sm transition-all duration-300 font-mono input-glow focus:bg-white/[0.05]";

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/40 text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
            Contact
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4">
            Let&apos;s Build{" "}
            <span className="text-gradient-cyan-purple">Something Epic</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Have a project in mind? Want to collaborate? Or just want to say hi?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Status card */}
            <div className="glass rounded-3xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse" />
                <span className="text-white/55 text-sm font-semibold">Available for Work</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Currently accepting new projects and full-time opportunities.
                Response time is typically{" "}
                <span className="text-white/70 font-medium">within 24 hours</span>.
              </p>
            </div>

            {/* Info rows */}
            <div className="glass rounded-3xl p-6 border border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white/40" />
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Location</div>
                  <div className="text-white font-medium">Remote — Worldwide</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white/40" />
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Timezone</div>
                  <div className="text-white font-medium">UTC+5 (PKT) · Flexible</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white/40" />
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Availability</div>
                  <div className="text-white font-medium">Contract / Full-time</div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="glass rounded-3xl p-6 border border-white/5">
              <h3 className="text-xs font-mono text-slate-500 mb-4 uppercase tracking-widest">
                Find me on
              </h3>
              <div className="space-y-3">
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-all group-hover:bg-white/[0.08]"
                    >
                      <s.icon className="w-4 h-4 text-white/40 group-hover:text-white/65 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium group-hover:text-white/75 transition-colors">
                        {s.label}
                      </div>
                      <div className="text-slate-600 text-xs font-mono truncate">{s.handle}</div>
                    </div>
                    <span className="text-slate-600 group-hover:text-slate-400 transition-colors text-xs">→</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden">
              {/* Top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

              <h3 className="text-xl font-bold text-white mb-6">
                Send a Message{" "}
                <span className="text-slate-500 font-normal text-sm font-mono">direct_message()</span>
              </h3>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-white/60" />
                  </motion.div>
                  <div className="text-white font-bold text-xl">Message Sent!</div>
                  <div className="text-slate-400 text-sm text-center">
                    Thank you! I&apos;ll get back to you within 24 hours.
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-500 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="John Doe"
                        className={`${inputBase} ${
                          focused === "name" ? "border-white/25" : "border-white/10"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-500 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="john@example.com"
                        className={`${inputBase} ${
                          focused === "email" ? "border-white/25" : "border-white/10"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                      placeholder="New project inquiry..."
                      className={`${inputBase} ${
                          focused === "subject" ? "border-white/25" : "border-white/10"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell me about your project, budget, and timeline..."
                      className={`${inputBase} resize-none ${
                          focused === "message" ? "border-white/25" : "border-white/10"
                      }`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-2xl bg-white text-black font-bold text-base flex items-center justify-center gap-3 shimmer-btn hover:bg-white/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-slate-600 font-mono">
                    🔒 Your info is private. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
