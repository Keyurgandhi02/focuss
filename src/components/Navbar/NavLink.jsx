"use client";

import useAppStore from "@/store/useAppStore";
import useModalStore from "@/store/useModalStore";
import { usePathname, useRouter } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  const router = useRouter();
  const { isFocusMode, setFocusMode, pauseSession } = useAppStore();
  const { openModal } = useModalStore();

  const handleClick = () => {
    if (isFocusMode) {
      openModal({
        title: "Focus Mode Active",
        description:
          "You're currently in a focus session. Are you sure you want to leave?",
        onConfirm: () => {
          pauseSession();
          setFocusMode(false);
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
      className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-white/80 transition-colors duration-300 ${path === href ? "bg-white/10 text-white" : "hover:bg-white/10"}`}
    >
      {children}
    </button>
  );
}
