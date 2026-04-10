"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useTodoStore } from "@/store/useTodoStore";

export function TodoPanel() {
  const [input, setInput] = useState("");

  const { tasks, addTask, toggleTask } = useTodoStore();

  const handleAdd = () => {
    if (!input.trim()) return;
    addTask(input);
    setInput("");
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return b.id - a.id;
  });

  return (
    <div className="h-full flex flex-col rounded-[28px] border border-white/10 bg-white/4 backdrop-blur-2xl p-4 sm:p-5 lg:p-6 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white tracking-tight">
          Tasks
        </h2>
        <span className="text-xs text-white/40">
          {tasks.filter((t) => !t.done).length} active
        </span>
      </div>

      {/* INPUT */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-white/6" />

        <div className="relative flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full border border-white/10">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a task..."
            className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-sm"
          />

          <button
            onClick={handleAdd}
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {sortedTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-16 text-center">
            <p className="text-white/30 text-sm">Ready to focus?</p>
            <p className="text-white/20 text-xs mt-1">
              Add a task to get started
            </p>
          </div>
        )}

        {sortedTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            title={task.text} // ✅ hover full text
            className={`
              group flex items-center gap-3 px-4 py-3 min-h-12
              rounded-2xl cursor-pointer
              transition-all duration-300
              ${
                task.done
                  ? "bg-white/3 text-white/30"
                  : "bg-white/6 hover:bg-white/10 text-white"
              }
            `}
          >
            {/* CHECK */}
            <div
              className={`
                flex items-center justify-center w-5 h-5 rounded-full border transition-all
                ${
                  task.done
                    ? "bg-white border-white"
                    : "border-white/30 group-hover:border-white"
                }
              `}
            >
              {task.done && <Check size={12} className="text-black" />}
            </div>

            {/* TEXT */}
            <span
              className={`
                text-sm flex-1 
                wrap-break-word line-clamp-2
                ${task.done ? "line-through" : ""}
              `}
            >
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
