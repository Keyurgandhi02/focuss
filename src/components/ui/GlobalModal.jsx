"use client";

import { motion, AnimatePresence } from "framer-motion";
import useModalStore from "@/store/useModalStore";

export function GlobalModal() {
  const { isOpen, title, description, onConfirm, closeModal } = useModalStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🌫️ Background Blur */}
          <motion.div
            className="fixed inset-0 z-999 bg-black/40 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 🧊 Modal */}
          <motion.div
            className="fixed inset-0 z-1000 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="w-[min(90vw,420px)] rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl p-6 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
              {/* Title */}
              <h2 className="text-xl font-semibold text-white">{title}</h2>

              {/* Description */}
              <p className="mt-2 text-white/70 text-sm">{description}</p>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    onConfirm?.();
                    closeModal();
                  }}
                  className="px-4 py-2 rounded-full bg-white text-black font-medium hover:opacity-90 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
