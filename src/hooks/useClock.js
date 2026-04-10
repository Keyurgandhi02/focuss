"use client";

import { useEffect, useState } from "react";

export function useClock() {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours24 = now.getHours();

      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(now);

      setTime(formattedTime);

      if (hours24 >= 5 && hours24 < 12) {
        setGreeting("Good morning!");
      } else if (hours24 >= 12 && hours24 < 17) {
        setGreeting("Good afternoon!");
      } else if (hours24 >= 17 && hours24 < 21) {
        setGreeting("Good evening!");
      } else {
        setGreeting("Good night!");
      }
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return { time, greeting };
}
