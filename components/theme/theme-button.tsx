"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import type { AnimationVariant, AnimationStart } from "@/lib/theme";

interface ThemeToggleNavButtonProps {
	variant?: AnimationVariant;
	start?: AnimationStart;
	blur?: boolean;
	gifUrl?: string;
	className?: string;
	isOpen?: boolean;
}

export function ThemeToggleNavButton({
	variant = "polygon",
	start = "top-left",
	blur = false,
	gifUrl,
	className,
	isOpen = false,
}: ThemeToggleNavButtonProps) {
	const { isDark, toggleTheme } = useThemeToggle({ variant, start, blur, gifUrl });

	return (
		<motion.div
			role="button"
			tabIndex={0}
			aria-label="Toggle theme"
			onClick={toggleTheme}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					toggleTheme();
				}
			}}
			whileTap={{ scale: 0.95 }}
			className={cn(
				`h-full w-15 rounded-[10px] flex items-center justify-center  duration-300 cursor-pointer overflow-hidden border`,
				className
			)}
		>
			<span className="sr-only">Toggle theme</span>
			<AnimatePresence mode="wait" initial={false}>
				<motion.div
					key={isDark ? "moon" : "sun"}
					initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
					animate={{ opacity: 1, rotate: 0, scale: 1 }}
					exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
					transition={{ duration: 0.35, ease: "easeInOut" }}
				>
					{isDark ? (
						<Moon className="size-7" strokeWidth={1.5} />
					) : (
						<Sun className="size-7" strokeWidth={1.5} />
					)}
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
}