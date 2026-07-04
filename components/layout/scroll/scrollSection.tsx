"use client";
import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollSectionProps {
	children: ReactNode;
	className?: string;
	fadeRange?: [number, number, number, number];
	yDistance?: number;
}

export function ScrollSection({
	children,
	className,
	fadeRange = [0, 0.25, 0.75, 1],
	yDistance = 80,
}: ScrollSectionProps) {
	const ref = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const opacity = useTransform(scrollYProgress, fadeRange, [0, 1, 1, 0]);
	const y = useTransform(
		scrollYProgress,
		fadeRange,
		[yDistance, 0, 0, -yDistance]
	);

	return (
		<motion.div ref={ref} style={{ opacity, y }} className={className}>
			{children}
		</motion.div>
	);
}