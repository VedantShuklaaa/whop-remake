"use client";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { NavLink } from "../textAnimations/wordRoll";
import { ThemeToggleButton } from "@/components/theme/theme-button";
import Image from "next/image";
import { useTheme } from "next-themes";

const Links = [
	{ title: "HOME", href: "/" },
	{ title: "CREATORS", href: "/creator" },
	{ title: "DEVELOPERS", href: "/developer" },
	{ title: "PRICING", href: "/pricing" },
];

const Video1 = [
	{ src: "/menu/sean.mov", label: "SEAN O MELLY", dark: "/utils/lrn_dark.png", light: "/utils/lrn_light.png" },
	{ src: "/menu/tfue.mov", label: "TFUE", dark: "/utils/dscvr_dark.png", light: "/utils/dscvr_light.png" },
]

const Video2 = [
	{ src: "/menu/jason.mov", label: "JASON", dark: "/utils/cnct_dark.png", light: "/utils/cnct_light.png" },
	{ src: "/menu/lacy.mov", label: "LACY", dark: "/utils/ern_dark.png", light: "/utils/ern_light.png" },
]

const BASE_OFFSET = 10;
const AMPLITUDE = 60;

export default function MenuOverlay({ isOpen }: { isOpen: boolean }) {
	const { theme } = useTheme();
	const pathname = usePathname();
	const containerRef = useRef<HTMLDivElement>(null);

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

	const handleMouseLeave = () => {
		mouseY.set(0);
	};

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
					<div
						ref={containerRef}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
						className="h-full w-full flex items-center justify-center backdrop-blur-xl"
					>
						<div className="h-full w-full flex p-8 gap-3 group">
							<motion.div
								style={{ y: col1Y }}
								className="flex-1 flex flex-col gap-3"
							>
								{Video1.map((items, idx) => (
									<div
										key={idx}
										className="group/card relative h-full w-full rounded-lg overflow-hidden transition-transform duration-300 ease-out group-hover:scale-90 hover:!scale-105"
									>
										<video
											src={items.src}
											aria-label={items.label}
											autoPlay
											loop
											muted
											playsInline
											className="h-full w-full object-cover rounded-[10px]"
										/>

										<div className="absolute inset-0 overflow-hidden rounded-[10px]">
											<Image
												src={theme === "dark" ? items.dark : items.light}
												alt={items.label}
												fill
												sizes="(max-width: 1024px) 50vw, 25vw"
												className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/card:-translate-y-full pointer-event-none"
											/>
										</div>
									</div>
								))}
							</motion.div>

							{/* Right Column */}
							<motion.div
								style={{ y: col2Y }}
								className="flex-1 flex flex-col gap-3"
							>
								{Video2.map((items, idx) => (
									<div
										key={idx}
										className="group/card relative h-full w-full rounded-lg overflow-hidden transition-transform duration-300 ease-out group-hover:scale-90 hover:!scale-105"
									>
										<video
											src={items.src}
											aria-label={items.label}
											autoPlay
											loop
											muted
											playsInline
											className="h-full w-full object-cover rounded-[10px]"
										/>

										{/* Image cover that swipes up on hover */}
										<div className="absolute inset-0 overflow-hidden rounded-[10px]">
											<Image
												src={theme === "dark" ? items.dark : items.light}
												alt={items.label}
												fill
												sizes="(max-width: 1024px) 50vw, 25vw"
												className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/card:-translate-y-full pointer-event-none"
											/>
										</div>
									</div>
								))}
							</motion.div>
						</div>
						<div className="h-full w-full flex flex-col items-center justify-center">
							{Links.map((items, idx) => {
								const isActive = pathname === items.href;

								return (
									<Link
										href={items.href}
										key={idx}
										className={`relative font-mona text-display-md leading-none hover:text-zinc-800 duration-300`}
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