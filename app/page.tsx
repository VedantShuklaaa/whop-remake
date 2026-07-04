import Hero from "@/components/landing/hero/heroText";
import Second from "@/components/landing/second/second";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex flex-col items-end justify-start relative">
      <Hero />
      <Second />
    </main>
  );
}