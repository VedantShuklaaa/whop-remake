"use client";

import { motion } from "framer-motion";

function MenuIcon({ isOpen }: { isOpen: boolean }) {
	return (
		<svg width="30" height="30" viewBox="0 0 20 20">
			<motion.line
				x1="3"
				y1="5"
				x2="17"
				y2="5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				animate={
					isOpen
						? { x1: 4, y1: 4, x2: 16, y2: 16 }
						: { x1: 3, y1: 5, x2: 17, y2: 5 }
				}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			/>
			<motion.line
				x1="3"
				y1="10"
				x2="17"
				y2="10"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				animate={{ opacity: isOpen ? 0 : 1 }}
				transition={{ duration: 0.2, ease: "easeInOut" }}
			/>
			<motion.line
				x1="3"
				y1="15"
				x2="17"
				y2="15"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				animate={
					isOpen
						? { x1: 4, y1: 16, x2: 16, y2: 4 }
						: { x1: 3, y1: 15, x2: 17, y2: 15 }
				}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			/>
		</svg>
	);
}

export default function MenuToggle({
	isOpen,
	onClick,
}: {
	isOpen: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={isOpen ? "Close menu" : "Open menu"}
			aria-expanded={isOpen}
			aria-controls="mobile-menu"
			className="group relative h-full w-15 overflow-hidden border border-zinc-100 dark:border-zinc-900 rounded-[10px] flex items-center justify-center cursor-pointer"
		>
			<div className="absolute inset-0 bg-primary origin-top scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100 rounded-[10px]" />
			<div className="relative z-10 text-foreground transition-colors duration-300 group-hover:text-primary-foreground">
				<MenuIcon isOpen={isOpen} />
			</div>
		</button>
	);
}