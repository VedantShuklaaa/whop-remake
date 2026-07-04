"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Learn", "Discover", "Connect", "Earn"];

const HOLD_DURATION = 3000;
const LETTER_STAGGER = 0.03;
const LETTER_DURATION = 0.5;

interface CyclingTextProps {
	className?: string;
}

export default function CyclingText({ className = "" }: CyclingTextProps) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIndex((prev) => (prev + 1) % words.length);
		}, HOLD_DURATION);

		return () => clearTimeout(timeout);
	}, [index]);

	const currentWord = words[index];
	const letters = currentWord.split("");

	return (
		<span className={`relative inline-flex overflow-hidden ${className}`}>
			<AnimatePresence mode="wait">
				<motion.span key={currentWord} className="inline-flex">
					{letters.map((letter, i) => (
						<motion.span
							key={`${currentWord}-${i}`}
							className="inline-block font-brier text-display-md"
							initial={{ y: "100%", opacity: 0 }}
							animate={{ y: "0%", opacity: 1 }}
							exit={{ y: "-100%", opacity: 0 }}
							transition={{
								duration: LETTER_DURATION,
								delay: i * LETTER_STAGGER,
								ease: [0.65, 0, 0.35, 1],
							}}
						>
							{letter}
						</motion.span>
					))}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}