// components/CyclingText.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["agency", "game", "service business", "social network", "shopping platform"];

const HOLD_DURATION = 3000;
const WORD_DURATION = 0.5;

interface CyclingTextProps {
	className?: string;
	loaderDone?: boolean;
}

export default function CyclingText({ className = "", loaderDone = true }: CyclingTextProps) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (!loaderDone) return;

		const timeout = setTimeout(() => {
			setIndex((prev) => (prev + 1) % words.length);
		}, HOLD_DURATION);

		return () => clearTimeout(timeout);
	}, [index, loaderDone]);

	const currentWord = words[index];

	return (
		<span className={`relative inline-flex overflow-hidden ${className}`}>
			<AnimatePresence mode="wait">
				<motion.span
					key={currentWord}
					className="inline-block font-mona text-display-md leading-none"
					initial={{ y: "100%", opacity: 0 }}
					animate={{ y: loaderDone ? "0%" : "100%", opacity: loaderDone ? 1 : 0 }}
					exit={{ y: "-100%", opacity: 0 }}
					transition={{
						duration: WORD_DURATION,
						ease: [0.65, 0, 0.35, 1],
					}}
				>
					{currentWord}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}