import { TimerModule } from "@/components/Focus/TimerModule";
import { TodoPanel } from "@/components/Todo/TodoPanel";

export default function FocusPage() {
  return (
    <div className="fixed inset-0 flex bg-black/40 backdrop-blur-2xl">
      <div className="w-1/2 h-full flex items-center justify-center relative">
        <TimerModule />
      </div>

      <div className="relative w-px">
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute inset-0 blur-sm bg-white/20 opacity-30" />
      </div>

      <div className="w-1/2 h-full px-10 py-10 overflow-y-auto">
        <div className="max-w-2xl mx-auto h-full">
          <TodoPanel />
        </div>
      </div>
    </div>
  );
}
