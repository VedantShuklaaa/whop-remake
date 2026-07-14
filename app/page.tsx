import Hero from "@/components/landing/hero/heroText";
import VideoSection from "@/components/landing/second/second";
import Third from "@/components/landing/third/third";


export default function Home() {
  return (
    <main className="flex flex-col items-end justify-start relative">
      <Hero />
      <div  className="h-[30vh] w-full"/>
      <VideoSection />
      <Third />
    </main>
  );
}