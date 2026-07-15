"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import MenuToggle from "@/components/layout/menu/menuToggle";
import MenuOverlay from "@/components/layout/menu/menuOverlay";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function Navbar() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [hidden, setHidden] = useState(false);

	const { scrollY } = useScroll();
	const lastY = useRef(0);

	useEffect(() => setMounted(true), []);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = lastY.current;
		const diff = latest - previous;

		if (Math.abs(diff) < 5) return;

		if (isOpen) {
			setHidden(false); 
		} else if (diff > 0 && latest > 100) {
			setHidden(true); 
		} else {
			setHidden(false); 
		}

		lastY.current = latest;
	});

	return (
		<>
			<motion.header
				animate={{ y: hidden ? "-100%" : "0%" }}
				transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
				className={`fixed top-0 left-0 z-50 h-[10vh] w-full flex items-center justify-between px-4 backdrop-blur-md ${isOpen ? `dark:bg-white/1` : ""}`}
			>
				<div className="flex items-center h-full">
					{mounted ? (
						<Link href="/" aria-label="WHOP home">
							<Image
								src={theme === "dark" ? "/logo/whop_3.png" : "/logo/Whop_1.png"}
								height={100}
								width={100}
								alt="WHOP wordmark logo"
								priority
							/>
						</Link>
					) : (
						<div style={{ height: 100, width: 100 }} />
					)}
				</div>

				<div className="flex items-center h-full">
					{mounted ? (
						<div className="relative" style={{ height: 90, width: 90 }}>
							<AnimatePresence mode="wait">
								<motion.div
									key={isOpen ? "logo2" : theme === "dark" ? "logo-dark" : "logo2-light"}
									initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
									animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
									exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
									transition={{ duration: 0.3, ease: "easeInOut" }}
									className="absolute top-1/2 -translate-y-1/2 left-1/2 w-full"
								>
									<Image
										src={isOpen ? "/logo/logo2.png" : theme === "dark" ? "/logo/logo.png" : "/logo/logo2.png"}
										height={90}
										width={90}
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
					<Link
						href="/store"
						className={`h-full w-30 rounded-[10px] flex items-center justify-center bg-primary font-brier text-heading-xl leading-none duration-300 ${isOpen ? "border" : ""}`}
					>
						Store
					</Link>

					<MenuToggle isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
				</nav>
			</motion.header>

			<MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)}/>
		</>
	);
}