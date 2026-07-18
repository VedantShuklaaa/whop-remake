"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MenuToggle from "@/components/layout/menu/menuToggle";
import MenuOverlay from "@/components/layout/menu/menuOverlay";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggleNavButton } from "../theme/theme-button";

const SCROLL_RANGE = 150;

export default function Navbar() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const { scrollY } = useScroll();

	const paddingX = useTransform(scrollY, [0, SCROLL_RANGE], ["1rem", "3rem"]);
	const paddingElementsX = useTransform(scrollY, [0, SCROLL_RANGE], ["1rem", "4rem"]);
	const bgOpacity = useTransform(scrollY, [0, SCROLL_RANGE], [0, 1]);

	useEffect(() => setMounted(true), []);

	return (
		<>
			<header className="fixed top-0 left-0 z-50 h-[10vh] w-full">
				{/* Background layer: tracks the same padding, fades independently */}
				<motion.div
					style={{
						left: paddingX,
						right: paddingX,
						opacity: isOpen ? 0 : bgOpacity,
					}}
					className={`absolute top-1/2 -translate-y-1/2 bottom-0 -z-10 h-[8vh] bg-card/30 rounded-[20px] backdrop-blur-xl ${isOpen ? "dark:bg-white/10" : ""}`}
				/>

				{/* Content layer: always fully visible, padded by the same value */}
				<motion.div
					style={{ paddingLeft: paddingElementsX, paddingRight: paddingElementsX }}
					className="relative h-full w-full flex items-center justify-between"
				>
					<div className="flex items-center h-full">
						{mounted ? (
							<div className="relative" style={{ height: 80, width: 80 }}>
								<AnimatePresence mode="wait">
									<motion.div
										key={isOpen ? "logo2" : theme === "dark" ? "logo-dark" : "logo2-light"}
										initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
										animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
										exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
										transition={{ duration: 0.3, ease: "easeInOut" }}
										className="absolute top-1/2 -translate-y-1/2 w-full"
									>
										<Image
											src={isOpen ? "/logo/logo2.png" : theme === "dark" ? "/logo/logo.png" : "/logo/logo2.png"}
											height={80}
											width={80}
											alt="WHOP brand mark"
											priority
										/>
									</motion.div>
								</AnimatePresence>
							</div>
						) : (
							<div style={{ height: 90, width: 90 }} />
						)}
					</div>

					<nav aria-label="Primary" className="flex gap-2 h-full py-6">
						<ThemeToggleNavButton isOpen={isOpen} />

						<MenuToggle isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
					</nav>
				</motion.div>
			</header>

			<MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
}