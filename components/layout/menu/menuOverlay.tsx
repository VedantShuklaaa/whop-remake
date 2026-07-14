"use client";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { NavLink } from "../textAnimations/navlink";
import { ThemeToggleButton } from "@/components/theme/theme-button";
import { useCursorContext } from "../cursor/cursorContext";
import { useTheme } from "next-themes";
import AnimatedText from "../textAnimations/animatedText";
import { CTAButtons } from "./ctaButton";

const Links = [
	{ title: "HOME", href: "/" },
	{ title: "CREATORS", href: "/creator" },
	{ title: "DEVELOPERS", href: "/developer" },
	{ title: "PRICING", href: "/pricing" },
];

const BASE_OFFSET = 10;
const AMPLITUDE = 60;
const CLOSE_DURATION = 0.6; // keep in sync with the transition below

interface MenuOverlayProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
	const { theme } = useTheme();
	const pathname = usePathname();
	const router = useRouter();
	const containerRef = useRef<HTMLDivElement>(null);

	const { setVariant } = useCursorContext();
	const mouseY = useMotionValue(0);
	const springY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.5 });

	const col1Y = useTransform(springY, [-1, 1], [BASE_OFFSET + AMPLITUDE, BASE_OFFSET - AMPLITUDE]);
	const col2Y = useTransform(springY, [-1, 1], [-BASE_OFFSET - AMPLITUDE, -BASE_OFFSET + AMPLITUDE]);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = containerRef.current?.getBoundingClientRect();
		if (!rect) return;
		const relativeY = (e.clientY - rect.top) / rect.height;
		mouseY.set(relativeY * 2 - 1);
	};

	const handleMouseEnter = () => {
		setVariant(theme === "dark" ? "dark-menu" : "light-menu");
	};

	const handleMouseLeave = () => {
		mouseY.set(0);
		setVariant("default");
	};

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault();
		onClose(); // triggers the rolled-up exit animation via isOpen flipping false

		setTimeout(() => {
			router.push(href);
		}, CLOSE_DURATION * 1000);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					id="mobile-menu"
					initial={{ clipPath: "inset(0 0 100% 0)" }}
					animate={{ clipPath: "inset(0 0 0% 0)" }}
					exit={{ clipPath: "inset(0 0 100% 0)" }}
					transition={{ duration: CLOSE_DURATION, ease: [0.65, 0, 0.35, 1] }}
					className="fixed left-0 right-0 h-screen z-40 bg-primary border-t border-zinc-100 dark:border-zinc-900"
				>
					<div
						ref={containerRef}
						onMouseMove={handleMouseMove}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className="h-full w-full flex items-center justify-center backdrop-blur-xl"
					>
						<div className="h-full w-full flex flex-col items-center justify-center p-8 gap-8">
							<AnimatedText
								as="h1"
								className="text-display-sm font-brier leading-none text-end"
								text={"Join the future of work"}
								staggerDelay={0.06}
							/>

							<CTAButtons />
						</div>
						<div className="h-full w-full flex flex-col items-center justify-center">
							{Links.map((items, idx) => {
								const isActive = pathname === items.href;

								return (
									<Link
										href={items.href}
										key={idx}
										onClick={(e) => handleLinkClick(e, items.href)}
										className="relative font-mona text-display-md leading-none hover:text-zinc-800 duration-300"
									>
										<NavLink text={items.title} />

										<AnimatePresence>
											{isActive && (
												<motion.span
													key={`dash-${idx}`}
													variants={{
														initial: { scaleX: 0, originX: 0 },
														animate: { scaleX: 1, originX: 0 },
														exit: { scaleX: 0, originX: 1 },
													}}
													initial="initial"
													animate="animate"
													exit="exit"
													className="absolute top-1/2 left-0 right-0 h-[6px] bg-zinc-800 -translate-y-1/2"
													transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
												/>
											)}
										</AnimatePresence>
									</Link>
								);
							})}
						</div>
					</div>

					<ThemeToggleButton className="absolute right-4 bottom-4" />
				</motion.div>
			)}
		</AnimatePresence>
	);
}