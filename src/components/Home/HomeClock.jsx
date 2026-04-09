"use client";

import { motion } from "framer-motion";
import { useClock } from "@/hooks/useClock";

export default function HomeClock() {
  const { time, greeting } = useClock();

  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white/60 text-xl"
      >
        {greeting}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-[100px] md:text-[160px] font-bold tracking-tight"
      >
        {time?.toUpperCase()}
      </motion.h1>
    </>
  );
}
