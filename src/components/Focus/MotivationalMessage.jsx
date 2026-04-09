"use client";

import { useEffect, useState } from "react";

const messages = {
  idle: [
    "Get ready to focus 🎯",
    "Let's build something great 🚀",
    "Time to shine ✨",
  ],
  work: [
    "Stay focused 🔥",
    "You've got this 💪",
    "Deep work mode activated 🧠",
    "One step at a time 👣",
    "Progress over perfection 📈",
  ],
  break: [
    "You earned this break 😌",
    "Recharge your energy ⚡",
    "Take a breath 🌬️",
    "Relax and reset 🧘",
    "Enjoy the moment 🌟",
  ],
  completed: [
    "Amazing work! 🎉",
    "You're crushing it 🔥",
    "Another victory 🏆",
    "Stay legendary 👑",
    "Keep the momentum 🚀",
  ],
};

export function MotivationalMessage({ sessionState }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stateMessages = messages[sessionState] || messages.idle;
    const randomMessage =
      stateMessages[Math.floor(Math.random() * stateMessages.length)];
    setMessage(randomMessage);
  }, [sessionState]);

  return (
    <p className="text-xl text-white/80 font-medium text-center animate-fadeIn">
      {message}
    </p>
  );
}
