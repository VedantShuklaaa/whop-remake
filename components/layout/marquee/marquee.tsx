"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MarqueeProps {
	children: ReactNode;
	speed?: number; 
	direction?: "left" | "right";
	pauseOnHover?: boolean;
	gap?: string; 
	className?: string;
}

export default function Marquee({
	children,
	speed = 20,
	direction = "left",
	pauseOnHover = true,
	gap = "gap-25",
	className = "",
}: MarqueeProps) {
	return (
		<div className={`relative w-full overflow-hidden ${className}`}>
			<motion.div
				className={`flex w-max ${gap} ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
				animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
				transition={{
					duration: speed,
					ease: "linear",
					repeat: Infinity,
				}}
			>
				<div className={`flex shrink-0 ${gap}`}>{children}</div>
				<div className={`flex shrink-0 ${gap}`} aria-hidden="true">
					{children}
				</div>
			</motion.div>
		</div>
	);
}