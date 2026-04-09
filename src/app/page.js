import HomeClock from "@/components/Home/HomeClock";
import WorkStartButton from "@/components/Home/WorkStartButton";

export default function Home() {
  return (
    <div className="h-screen relative overflow-hidden text-white flex items-center justify-center">
      <div className="relative z-10 text-center space-y-12">
        <HomeClock />
        <p className="text-white/50">Time to focus. Make this hour count.</p>
        <WorkStartButton />
      </div>
    </div>
  );
}
