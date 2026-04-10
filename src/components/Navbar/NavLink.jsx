"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTimerStore } from "@/store/useTimerStore";
import { useUIStore } from "@/store/useUIStore";
import useModalStore from "@/store/useModalStore";

export default function NavLink({ href, children }) {
  const path = usePathname();
  const router = useRouter();

  const { resetSession, sessionState, setSelectedMode } = useTimerStore();

  const { openModal } = useModalStore();

  const isSessionRunning = sessionState === "work" || sessionState === "break";

  const handleClick = () => {
    if (path === href) return;

    if (isSessionRunning) {
      openModal({
        title: "Focus Mode Active",
        description: `You're in a ${sessionState} session. Leaving will be ended your ${sessionState} session.`,
        onConfirm: () => {
          resetSession();
          router.push(href);
        },
      });

      return;
    }

    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative px-4 py-2 text-sm font-medium rounded-xl
        transition-all duration-300 cursor-pointer
        ${
          path === href
            ? "text-white bg-white/10 shadow-inner"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }
      `}
    >
      {children}
    </button>
  );
}
