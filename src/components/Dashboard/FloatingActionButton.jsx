'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FloatingActionButton() {
  return (
    <Link
      href="/focus"
      className="fixed bottom-8 right-8 z-40 group"
    >
      <div className="relative">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg group-hover:blur-xl opacity-75 group-hover:opacity-100 transition-all duration-300" />

        {/* Button */}
        <button className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2 active:scale-95">
          <span>Start Work</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </Link>
  );
}
