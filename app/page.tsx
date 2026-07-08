import Hero from "@/components/landing/hero/heroText";
import Second from "@/components/landing/second/second";


export default function Home() {
  return (
    <main className="flex flex-col items-end justify-start relative">
      <Hero />
      <Second />
      <div className="h-screen w-full"></div>
    </main>
  );
}