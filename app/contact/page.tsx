"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "@/app/components/contact/ContactForm";
import ContactInfo from "@/app/components/contact/ContactInfo";
import FormToast from "@/app/components/contact/FormToast";

export default function ContactPage() {
  const [toast, setToast] = useState<"success" | "error" | null>(null);

  return (
    <main className="relative min-h-screen bg-[#060606]">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-16 pb-24">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/[0.07]
                       text-white/40 text-xs font-mono tracking-wide mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
            Open to Work
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.9] mb-6"
          >
            <span className="text-white/75 block">Get In</span>
            <span className="text-white/20 block">Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
            className="text-white/35 text-base sm:text-lg max-w-lg leading-relaxed"
          >
            Whether you have a project in mind, want to collaborate, or just want
            to say hi &mdash; I&apos;d love to hear from you.
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-10 items-start">
          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass border border-white/[0.06] rounded-3xl p-6 sm:p-8 lg:p-10"
          >
            <h2 className="text-lg font-semibold text-white/65 mb-7">Send a message</h2>
            <ContactForm
              onSuccess={() => setToast("success")}
              onError={() => setToast("error")}
            />
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.62, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass border border-white/[0.06] rounded-3xl p-6 sm:p-8 lg:p-10"
          >
            <h2 className="text-lg font-semibold text-white/65 mb-7">Contact info</h2>
            <ContactInfo />
          </motion.div>
        </div>
      </div>

      <FormToast type={toast} onDismiss={() => setToast(null)} />
    </main>
  );
}
