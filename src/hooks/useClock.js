"use client";

import { useEffect, useState } from "react";

export function useClock() {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );

      if (hours >= 5 && hours < 12) setGreeting("Good morning!");
      else if (hours < 17) setGreeting("Good afternoon!");
      else if (hours < 21) setGreeting("Good evening!");
      else setGreeting("Good night!");
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return { time, greeting };
}
