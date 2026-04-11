let audio = null;
let currentMode = null;

const SOUND_MAP = {
  study: "/sounds/study.mp3",
  deep: "/sounds/deep.mp3",
  normal: "/sounds/normal.mp3",
  energy: "/sounds/energy.mp3",
};

export function playSound(mode) {
  if (!mode || mode === "off") return;

  // ✅ prevent restart
  if (audio && currentMode === mode) return;

  const src = SOUND_MAP[mode];
  if (!src) return;

  if (audio) {
    fadeOut(audio);
  }

  const newAudio = new Audio(src);
  newAudio.loop = true;
  newAudio.volume = 0;

  newAudio.play().catch(() => {});
  fadeIn(newAudio);

  audio = newAudio;
  currentMode = mode;
}

export function stopSound() {
  if (audio) {
    fadeOut(audio);
    audio = null;
    currentMode = null;
  }
}

function fadeIn(audio) {
  let vol = 0;
  const interval = setInterval(() => {
    if (vol >= 0.5) {
      clearInterval(interval);
    } else {
      vol += 0.05;
      audio.volume = vol;
    }
  }, 100);
}

function fadeOut(audio) {
  let vol = audio.volume;

  const interval = setInterval(() => {
    if (vol <= 0.05) {
      audio.pause();
      clearInterval(interval);
    } else {
      vol -= 0.05;
      audio.volume = vol;
    }
  }, 100);
}
