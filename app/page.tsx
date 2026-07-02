import { ThemeToggleButton } from "@/components/theme/theme-button";




export default function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center relative">
      <h1 className="sr-only">WHOP — [your tagline here]</h1>
      {/* actual homepage content goes here */}

      <ThemeToggleButton />
    </main>
  );
}