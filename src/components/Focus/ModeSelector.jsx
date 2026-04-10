import useModalStore from "@/store/useModalStore";
import { useTimerStore } from "@/store/useTimerStore";

const MODE_OPTIONS = [
  { id: "focus", label: "Focus" },
  { id: "shortBreak", label: "Short Break" },
  { id: "longBreak", label: "Long Break" },
];

export function ModeSelector() {
  const { selectedMode, setSelectedMode, resetSession, sessionState } =
    useTimerStore();
  const { openModal } = useModalStore();

  const isSessionRunning = sessionState === "work" || sessionState === "break";

  const handleModeChange = (modeId) => {
    if (isSessionRunning) {
      openModal({
        title: "Change Mode?",
        description: `You're in a ${sessionState} session. Leaving will be ended your ${sessionState} session.`,
        onConfirm: () => {
          resetSession();
          setSelectedMode(modeId);
        },
      });
    } else {
      setSelectedMode(modeId);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {MODE_OPTIONS.map((mode) => {
        const active = selectedMode === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode.id)}
            className={`
            relative px-6 py-2.5 rounded-full
            text-sm md:text-base font-medium
            transition-all duration-300 ease-out
            whitespace-nowrap cursor-pointer
            ${
              active
                ? `
               bg-white/10 text-white  
                scale-105
                border border-white/10
              `
                : `
                text-white/40
                bg-white/5 
                hover:text-white
                hover:bg-white/10
              `
            }
          `}
          >
            {mode.label}

            {active && (
              <span className="absolute inset-0 rounded-full blur-xl opacity-40" />
            )}
          </button>
        );
      })}
    </div>
  );
}
