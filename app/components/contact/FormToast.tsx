"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

interface FormToastProps {
  type: "success" | "error" | null;
  onDismiss: () => void;
}

export default function FormToast({ type, onDismiss }: FormToastProps) {
  useEffect(() => {
    if (!type) return;
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [type, onDismiss]);

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-2rem)] max-w-sm"
          role="alert"
          aria-live="polite"
        >
          <div
            className={`flex items-start gap-3 px-5 py-4 rounded-2xl glass-strong border ${
              type === "success" ? "border-white/20" : "border-white/10"
            }`}
          >
            {type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-white/65 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-white/35 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white/75 font-semibold text-sm mb-0.5">
                {type === "success" ? "Message sent!" : "Something went wrong"}
              </p>
              <p className="text-white/38 text-xs leading-relaxed">
                {type === "success"
                  ? "I'll get back to you within 24 hours."
                  : "Please try again or email me directly."}
              </p>
            </div>
            <button
              onClick={onDismiss}
              className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center
                         text-white/28 hover:text-white/60 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
