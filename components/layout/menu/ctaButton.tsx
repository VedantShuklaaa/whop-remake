"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedButtonProps {
	label: string;
	href?: string;
	onClick?: () => void;
	variant?: "solid" | "outline";
	delay?: number;
}

const AnimatedButton = ({
	label,
	href,
	onClick,
	variant = "solid",
	delay = 0,
}: AnimatedButtonProps) => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const isSolid = variant === "solid";

	const content = (
		<motion.button
			onClick={onClick}
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay, ease: [0.65, 0, 0.35, 1] }}
			whileTap={{ scale: 0.96 }}
			className={`
				group relative overflow-hidden px-8 py-3 rounded-full font-mona text-sm tracking-wide
				transition-colors duration-300 ease-in-out
				${!mounted ? "opacity-0" : ""}
				${isSolid
					? "bg-black text-white dark:bg-white dark:text-black"
					: "bg-transparent text-black dark:text-white border border-black dark:border-white"
				}
			`}
		>
			<span
				className={`
					absolute inset-0 origin-bottom scale-y-0
					transition-transform duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)]
					group-hover:scale-y-100
					${isSolid ? "bg-white dark:bg-black" : "bg-black dark:bg-white"}
				`}
			/>
			<span
				className={`
					relative z-10 transition-colors duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)]
					${isSolid
						? "group-hover:text-black dark:group-hover:text-white"
						: "group-hover:text-white dark:group-hover:text-black"
					}
				`}
			>
				{label}
			</span>
		</motion.button>
	);

	return href ? (
		<a href={href} className="inline-block">
			{content}
		</a>
	) : (
		content
	);
}

export function CTAButtons() {
	return (
		<div className="flex gap-4">
			<AnimatedButton label="Create a business" variant="solid" delay={0.3} />
			<AnimatedButton label="Explore ways to earn" variant="outline" delay={0.45} />
		</div>
	);
}