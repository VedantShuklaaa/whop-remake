"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "../textAnimations/wordRoll";

const Links = [
	{ title: "HOME", href: "/" },
	{ title: "CREATORS", href: "/creator" },
	{ title: "DEVELOPERS", href: "/developer" },
	{ title: "PRICING", href: "/pricing" },
];

export default function MenuOverlay({ isOpen }: { isOpen: boolean }) {
	const pathname = usePathname();

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					id="mobile-menu"
					initial={{ clipPath: "inset(0 0 100% 0)" }}
					animate={{ clipPath: "inset(0 0 0% 0)" }}
					exit={{ clipPath: "inset(0 0 100% 0)" }}
					transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
					className="fixed left-0 right-0 h-screen z-40 bg-primary border-t border-zinc-100 dark:border-zinc-900"
				>
					<div className="h-full w-full flex items-center justify-center backdrop-blur-xl">
						<div className="h-full w-full"></div>
						<div className="h-full w-full flex flex-col items-center justify-center gap-4">
							{Links.map((items, idx) => {
								const isActive = pathname === items.href;

								return (
									<Link
										href={items.href}
										key={idx}
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
				</motion.div>
			)}
		</AnimatePresence>
	);
}