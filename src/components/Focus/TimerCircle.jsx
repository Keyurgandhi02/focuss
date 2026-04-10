export function TimerCircle({ progress }) {
  return (
    <div className="relative w-72 h-72">
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
          fill="none"
        />

        <circle
          cx="50%"
          cy="50%"
          r="45%"
          stroke="url(#gradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${progress * 2.8} 280`}
          style={{ transition: "all 0.6s ease" }}
        />

        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
