import { useRouter } from "next/navigation";

export default function EmptyState({
  icon: Icon,
  title = "No data yet",
  subtitle = "Start your first focus session to see insights",
  buttonText = "Start Focus",
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-10">
      {/* Icon */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
        {Icon && <Icon size={28} className="text-white/70" />}
      </div>

      {/* Title */}
      <h3 className="text-white text-lg font-medium">{title}</h3>

      {/* Subtitle */}
      <p className="text-white/50 text-sm max-w-xs">{subtitle}</p>

      {/* CTA */}
      <button
        onClick={() => router.push("/focus")}
        className="mt-2 px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition-all duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
}
