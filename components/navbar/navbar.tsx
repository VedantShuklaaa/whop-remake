"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MenuToggle from "@/components/layout/menu/menuToggle";
import MenuOverlay from "@/components/layout/menu/menuOverlay";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => setMounted(true), []);

	return (
		<>
			<header className="fixed top-0 left-0 z-50 h-[10vh] w-full flex items-center justify-between px-4 backdrop-blur-md dark:bg-white/1">
				<div className="flex items-center h-full">
					{mounted ? (
						<Link href="/" aria-label="WHOP home">
							<Image
								src={theme === "dark" ? "/logo/whop_3.png" : "/logo/whop_1.png"}
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
			</header>

			<MenuOverlay isOpen={isOpen} />
		</>
	);
}