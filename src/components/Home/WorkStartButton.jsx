"use client";

import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

export default function WorkStartButton() {
  const router = useRouter();

  return (
    <div className="flex justify-center mt-6">
      <Button
        onClick={() => router.push("/focus")}
        variant="secondary"
        size="lg"
      >
        <span className="relative z-10 flex items-center gap-1 text-white/80 group-hover:text-white transition font-medium text-sm">
          Start Focus
          <span className="group-hover:translate-x-1 transition">→</span>
        </span>
      </Button>
    </div>
  );
}
