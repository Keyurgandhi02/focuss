"use client";

import { memo } from "react";
import { SoundSelector } from "./SoundSelector";

export const SoundSelectorWrapper = memo(
  ({ soundMode, setSoundMode, triggerAutoSave }) => {
    return (
      <div className="flex justify-center w-full mt-5">
        <SoundSelector
          soundMode={soundMode}
          onChange={(mode) => {
            setSoundMode(mode);
            triggerAutoSave();
          }}
        />
      </div>
    );
  },
);
