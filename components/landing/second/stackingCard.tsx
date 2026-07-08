"use client";
import { useMagnify } from "@/components/layout/magnifier/magnify";
import { useRef } from "react";

const cards = [
	{
		title: "Design",
		subtitle: "Crafted with intention",
		description:
			"Every pixel considered. Typography, spacing, and rhythm come together to create interfaces that feel effortless.",
	},
	{
		title: "Build",
		subtitle: "Engineered to last",
		description:
			"Robust foundations, clean architecture, and modern tooling. Ship faster without cutting corners.",
	},
];

export default function StackingCards() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { ref, bind } = useMagnify();

	return (
		<section ref={containerRef} className="relative w-full">
			<div className="relative">
				{cards.map((card, i) => (
					<div
						key={card.title}
						className="sticky top-0 h-screen flex items-end justify-center"
					>
						<article
							className="flex w-full flex-col justify-between overflow-hidden p-10 shadow-2xl sm:p-14 rounded-t-[80px] bg-[#121212] dark:bg-[#d9d9d9] text-[#d9d9d9] dark:text-[#121212]"
							style={{
								height: `85vh`,
							}}
							ref={ref}
							{...bind}
						>
							<header className="flex items-center justify-between">
								<span className="text-sm font-medium uppercase tracking-widest opacity-70">
									{String(i + 1).padStart(2, "0")} /{" "}
									{String(cards.length).padStart(2, "0")}
								</span>
								<span className="text-sm font-medium uppercase tracking-widest opacity-70">
									{card.subtitle}
								</span>
							</header>

							<div className="h-full flex">
								<div className="h-full w-full border"></div>
								<div className="h-full w-full flex flex-col items-end justify-end text-end">
									<h3 className="text-6xl font-semibold tracking-tight sm:text-8xl">
										{card.title}
									</h3>
									<p className="mt-6 max-w-xl text-lg opacity-80 sm:text-xl">
										{card.description}
									</p>
								</div>
							</div>
						</article>
					</div>
				))}
			</div>
		</section>
	);
}