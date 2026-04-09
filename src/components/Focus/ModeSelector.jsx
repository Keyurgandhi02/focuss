import { Button } from "@/components/ui/Button";
import useAppStore from "@/store/useAppStore";
import useModalStore from "@/store/useModalStore";

const MODE_OPTIONS = [
  { id: "focus", label: "Focus" },
  { id: "shortBreak", label: "Short Break" },
  { id: "longBreak", label: "Long Break" },
];

export function ModeSelector() {
  const { selectedMode, setSelectedMode, isPlaying, resetSession } =
    useAppStore();

  const { openModal } = useModalStore();

  const handleModeChange = (modeId) => {
    if (isPlaying) {
      openModal({
        title: "Change Mode?",
        description: "Your current session will be ended.",
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
    <div className="w-full max-w-4xl text-center">
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {MODE_OPTIONS.map((mode) => (
          <Button
            key={mode.id}
            variant={selectedMode === mode.id ? "primary" : "secondary"}
            size="md"
            className="rounded-full px-6 py-3"
            onClick={() => handleModeChange(mode.id)}
          >
            {mode.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
