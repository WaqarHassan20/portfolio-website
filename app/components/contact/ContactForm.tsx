"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactFormProps {
  onSuccess: () => void;
  onError: () => void;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim())
    errors.name = "Name is required.";
  if (!form.email.trim())
    errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address.";
  if (!form.subject.trim())
    errors.subject = "Subject is required.";
  if (form.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters.";
  return errors;
}

const inputBase =
  "w-full px-4 py-3.5 rounded-xl glass border border-white/[0.08] bg-transparent " +
  "text-white/70 text-sm placeholder:text-white/22 " +
  "focus:outline-none focus:border-white/25 focus:text-white/90 " +
  "transition-all duration-200 input-glow font-[family-name:var(--font-saira)]";

const labelBase = "block text-white/35 text-[10px] font-mono tracking-widest uppercase mb-2";
const errorBase = "mt-1.5 text-white/38 text-xs font-mono";

export default function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormState]) {
      const next = { ...form, [name]: value };
      const errs = validate(next);
      setErrors((prev) => ({ ...prev, [name]: errs[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [name]: errs[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("server error");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
      onSuccess();
    } catch {
      onError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name + Email row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className={labelBase}>Name</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your name"
            autoComplete="name"
            className={inputBase}
          />
          {errors.name && <p className={errorBase}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className={labelBase}>Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputBase}
          />
          {errors.email && <p className={errorBase}>{errors.email}</p>}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="cf-subject" className={labelBase}>Subject</label>
        <input
          id="cf-subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Project inquiry / Collaboration / Just saying hi"
          className={inputBase}
        />
        {errors.subject && <p className={errorBase}>{errors.subject}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className={labelBase}>Message</label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tell me about your project — what you need, your timeline, budget range..."
          className={`${inputBase} resize-none`}
        />
        <div className="flex items-start justify-between mt-1.5 gap-2">
          {errors.message ? (
            <p className={errorBase}>{errors.message}</p>
          ) : (
            <span />
          )}
          <span className="text-white/18 text-[10px] font-mono shrink-0">
            {form.message.length} / 5000
          </span>
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={loading ? {} : { scale: 1.02, y: -1 }}
        whileTap={loading ? {} : { scale: 0.98 }}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl
                   bg-white text-black font-bold text-sm tracking-widest uppercase
                   shimmer-btn hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  );
}
