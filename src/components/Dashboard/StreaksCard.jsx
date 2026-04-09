export default function StreaksCard({ streak }) {
  const days = Array.from({ length: 7 });

  return (
    <div className="space-y-5">
      <h3 className="text-white text-sm">Streak</h3>

      {/* 🔥 Numbers */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white/50 text-xs">Current</p>
          <p className="text-2xl text-orange-400">{streak?.current || 0} 🔥</p>
        </div>

        <div>
          <p className="text-white/50 text-xs">Best</p>
          <p className="text-2xl text-yellow-400">{streak?.best || 0}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {days.map((_, i) => {
          const active = i < (streak?.current || 0);

          return (
            <div
              key={i}
              className={`h-3 w-3 rounded-full ${
                active ? "bg-orange-400" : "bg-white/10"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
