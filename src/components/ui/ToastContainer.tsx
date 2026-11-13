"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useGame();

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          let bg = "bg-inverse-surface text-inverse-on-surface";
          let IconComponent = Info;

          if (toast.type === "success") {
            bg = "bg-primary text-on-primary shadow-tactile-primary";
            IconComponent = CheckCircle2;
          } else if (toast.type === "warning") {
            bg = "bg-secondary-container text-on-secondary-container shadow-tactile-secondary";
            IconComponent = AlertTriangle;
          } else if (toast.type === "error") {
            bg = "bg-error text-on-error shadow-tactile-error";
            IconComponent = AlertTriangle;
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`p-3.5 rounded-xl font-medium text-sm flex items-center justify-between gap-3 pointer-events-auto shadow-lg ${bg}`}
              role="alert"
            >
              <div className="flex items-center gap-2.5">
                <IconComponent className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span className="leading-snug">{toast.message}</span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Tutup notifikasi"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

