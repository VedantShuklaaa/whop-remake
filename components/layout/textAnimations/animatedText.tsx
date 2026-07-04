"use client";
import { motion } from "framer-motion";
import { useLoaderContext } from "@/components/loader/loaderContext";

interface AnimatedTextProps {
	text: string;
	as?: "h1" | "h2" | "p";
	className?: string;
	staggerDelay?: number;
	startDelay?: number;
	align?: "start" | "end" | "center";
}

export default function AnimatedText({
	text,
	as = "p",
	className = "",
	staggerDelay = 0.04,
	startDelay = 0,
	align = "start",
}: AnimatedTextProps) {
	const { loaderDone } = useLoaderContext();
	const Tag = as;

	const lines = text.split("\n");
	const justifyClass =
		align === "end" ? "justify-end" : align === "center" ? "justify-center" : "justify-start";

	let wordIndex = 0;

	return (
		<Tag className={`flex flex-wrap ${justifyClass} ${className}`}>
			{lines.map((line, lineIdx) => (
				<span key={lineIdx} className={`flex flex-wrap ${justifyClass} w-full`}>
					{line
						.trim()
						.split(" ")
						.map((word) => {
							const currentIndex = wordIndex++;
							return (
								<motion.span
									key={currentIndex}
									initial={{ opacity: 0 }}
									animate={loaderDone ? { opacity: 1 } : { opacity: 0 }}
									transition={{
										duration: 0.5,
										delay: startDelay + currentIndex * staggerDelay,
										ease: [0.65, 0, 0.35, 1],
									}}
									className="inline-block mr-[0.25em]"
								>
									{word}
								</motion.span>
							);
						})}
				</span>
			))}
		</Tag>
	);
}