"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursorContext } from "./cursorContext";
import { useMagnifyContext } from "../magnifier/magnify";

const VARIANT_COLORS = {
	default: "var(--color-primary)",
	"dark-menu": "#d9d9d9",
	"light-menu": "#121212",
} as const;

export function CursorDot() {
	const [isVisible, setIsVisible] = useState(false);
	const [isPointer, setIsPointer] = useState(false);
	const { variant } = useCursorContext();
	const { state: magnifyState } = useMagnifyContext();

	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
	const dotX = useSpring(cursorX, springConfig);
	const dotY = useSpring(cursorY, springConfig);

	const ringSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 };
	const ringX = useSpring(cursorX, ringSpringConfig);
	const ringY = useSpring(cursorY, ringSpringConfig);

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
			if (!isVisible) setIsVisible(true);
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const isInteractive = target.closest(
				"a, button, [role='button'], input, textarea, select"
			);
			setIsPointer(!!isInteractive);
		};

		const handleMouseLeave = () => setIsVisible(false);
		const handleMouseEnter = () => setIsVisible(true);

		window.addEventListener("mousemove", moveCursor);
		window.addEventListener("mouseover", handleMouseOver);
		document.documentElement.addEventListener("mouseleave", handleMouseLeave);
		document.documentElement.addEventListener("mouseenter", handleMouseEnter);

		return () => {
			window.removeEventListener("mousemove", moveCursor);
			window.removeEventListener("mouseover", handleMouseOver);
			document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
			document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
		};
	}, [cursorX, cursorY, isVisible]);

	const activeColor = VARIANT_COLORS[variant];

	return (
		<>
			<motion.div
				className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
				style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
				animate={{
					width: isPointer ? 12 : 8,
					height: isPointer ? 12 : 8,
					opacity: isVisible && !magnifyState.active ? 1 : 0,
					backgroundColor: activeColor,
				}}
				transition={{
					width: { duration: 0.2, ease: "easeOut" },
					height: { duration: 0.2, ease: "easeOut" },
					opacity: { duration: 0.2, ease: "easeOut" },
					backgroundColor: { duration: 0.35, ease: "easeInOut" },
				}}
			/>

			<motion.div
				className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
				style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
				animate={{
					width: isPointer ? 48 : 32,
					height: isPointer ? 48 : 32,
					opacity: isVisible && !magnifyState.active ? (isPointer ? 0.5 : 0.3) : 0,
					borderColor: activeColor,
				}}
				transition={{
					width: { duration: 0.2, ease: "easeOut" },
					height: { duration: 0.2, ease: "easeOut" },
					opacity: { duration: 0.2, ease: "easeOut" },
					borderColor: { duration: 0.35, ease: "easeInOut" },
				}}
			/>
		</>
	);
}