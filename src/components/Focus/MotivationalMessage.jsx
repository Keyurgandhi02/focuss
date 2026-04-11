"use client";

import { useEffect, useState, memo } from "react";

const messages = {
  idle: ["Get ready to focus!", "Let's build something great!"],
  work: ["Stay focused!", "Deep work mode!"],
  break: ["Relax 😌", "Recharge ⚡"],
  completed: ["Great job!", "Keep going!"],
};

export const MotivationalMessage = memo(function MotivationalMessage({
  sessionState,
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const arr = messages[sessionState] || messages.idle;
    setMessage(arr[Math.floor(Math.random() * arr.length)]);
  }, [sessionState]);

  return <p className="text-white/30 text-sm">{message}</p>;
});
