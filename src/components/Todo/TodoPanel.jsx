"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";

export function TodoPanel() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;

    setTasks((prev) => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  return (
    <div className="h-full flex flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-2xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Tasks
        </h2>
        <span className="text-xs text-white/40">
          {tasks.filter((t) => !t.done).length} active
        </span>
      </div>

      {/* INPUT (STICKY FEEL) */}
      <div className="flex gap-2 mb-5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What’s your focus today?"
          className="flex-1 rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/20 transition"
        />
        <button
          onClick={addTask}
          className="flex items-center justify-center rounded-full bg-white text-black px-3 py-2 hover:scale-105 active:scale-95 transition"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* TASK LIST */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
        {tasks.length === 0 && (
          <p className="text-white/40 text-sm text-center mt-10">
            No tasks yet. Add your first task 🚀
          </p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`group flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300
              ${
                task.done
                  ? "bg-green-500/10 text-white/40"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
          >
            {/* CHECK ICON */}
            <div
              className={`flex items-center justify-center w-5 h-5 rounded-full border transition
                ${
                  task.done
                    ? "bg-green-500 border-green-500"
                    : "border-white/30 group-hover:border-white"
                }`}
            >
              {task.done && <Check size={12} />}
            </div>

            {/* TEXT */}
            <span
              className={`text-sm flex-1 ${task.done ? "line-through" : ""}`}
            >
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
