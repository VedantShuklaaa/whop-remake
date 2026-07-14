"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLoaderContext } from "@/components/loader/loaderContext";
import AnimatedText from "@/components/layout/textAnimations/animatedText";
import BackgroundVideo from "@/components/layout/background/background";
import { GoArrowDown } from "react-icons/go";

const text = "WHOP";

interface HomeTextProps {
	standalone?: boolean;
}

export function Whop({ standalone = false }: HomeTextProps) {
	const ref = useRef<HTMLHeadingElement>(null);
	const isInView = useInView(ref, { once: true });
	const { loaderDone } = useLoaderContext();
	const shouldAnimate = standalone ? isInView : loaderDone;

	return (
		<h1 ref={ref} className="text-primary text-display-2xl font-brier flex overflow-hidden">
			{text.split("").map((char, i) => (
				<motion.span
					key={i}
					initial={{ opacity: 0 }}
					animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.6, delay: i * 0.1, ease: [0.65, 0, 0.35, 1] }}
					style={{ lineHeight: "0.8" }}
				>
					{char}
				</motion.span>
			))}
		</h1>
	);
}

export default function Page() {
	const { loaderDone } = useLoaderContext();
	return (
		<>
			<BackgroundVideo src="/hero/whopBg.mp4" poster="/videos/hero-bg-poster.jpg" />

			<section className="h-screen w-full">
				<motion.div
					className="h-[70vh] w-full rounded-b-[40px] bg-background flex items-end"
					initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
					animate={loaderDone ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
					transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
				>
					<div className="h-[60vh] w-full flex flex-col p-4">
						<div className="h-full w-full flex flex-col items-end gap-5">
							<AnimatedText
								as="h1"
								className="text-display-md font-garamond leading-none"
								text={"Build something\nthat people remember"}
								staggerDelay={0.06}
								align="end"
							/>
							<AnimatedText
								as="p"
								className="text-heading-lg font-garamond leading-none pr-2"
								text={"Turn bold ideas into unforgettable digital experiences\nwith design, motion, and development\nthat keeps people coming back."}
								staggerDelay={0.03}
								startDelay={0.5}
								align="end"
							/>
						</div>
						<div className="h-full w-full relative">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: loaderDone ? 1 : 0 }}
								transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
							>
								<AnimatedText
									as="h1"
									className="text-display-sm font-brier leading-none"
									text={"Earn with"}
									staggerDelay={0.06}
									align="start"
								/>
							</motion.div>
							<Whop />
							<ScrollIndicator />
						</div>
					</div>
				</motion.div>
			</section>
		</>
	)
}



export function ScrollIndicator() {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			className="absolute h-20 w-20 rounded-full border border-primary right-4 bottom-4 flex flex-col items-center justify-center overflow-hidden"
		>
			{/* Pulsing ring behind the border */}
			<motion.div
				className="absolute inset-0 rounded-full border border-primary"
				animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
				transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
			/>

			{/* Bouncing arrow */}
			<motion.div
				animate={{ y: [0, 6, 0] }}
				transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
			>
				<GoArrowDown className="h-6 w-6" />
			</motion.div>

			<motion.span
				animate={{ opacity: [1, 0.4, 1] }}
				transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
				className="text-xs mt-0.5"
			>
				Scroll
			</motion.span>
		</motion.div>
	);
}