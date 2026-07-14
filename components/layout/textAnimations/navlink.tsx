"use client";
import { motion } from "framer-motion";

interface NavLinkProps {
	text: string;
}

export function NavLink({ text }: NavLinkProps) {
	return (
		<motion.div
			initial="rest"
			whileHover="hover"
			animate="rest"
			className="relative overflow-hidden cursor-pointer"
		>
			{/* Current text */}
			<div className="flex">
				{text.split("").map((char, i) => (
					<motion.span
						key={`top-${i}`}
						variants={{
							rest: { y: 0 },
							hover: { y: "-100%" },
						}}
						transition={{
							duration: 0.3,
							ease: "easeInOut",
							delay: i * 0.03,
						}}
						className="inline-block"
					>
						{char === " " ? "\u00A0" : char}
					</motion.span>
				))}
			</div>

			{/* Incoming text */}
			<div className="absolute inset-0 flex">
				{text.split("").map((char, i) => (
					<motion.span
						key={`bottom-${i}`}
						variants={{
							rest: { y: "100%" },
							hover: { y: 0 },
						}}
						transition={{
							duration: 0.3,
							ease: "easeInOut",
							delay: i * 0.03,
						}}
						className="inline-block"
					>
						{char === " " ? "\u00A0" : char}
					</motion.span>
				))}
			</div>
		</motion.div>
	);
}