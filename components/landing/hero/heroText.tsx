"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLoaderContext } from "@/components/loader/loaderContext";
import AnimatedText from "@/components/layout/textAnimations/animatedText";
import { ScrollSection } from "@/components/layout/scroll/scrollSection";
import CyclingText from "@/components/layout/textAnimations/textCycle";

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



export default function Hero() {
	const { loaderDone } = useLoaderContext();

	return (
		<ScrollSection className="h-screen w-full flex flex-col p-4 sm:p-6 lg:p-10">
			<div className="h-full flex justify-between mt-20">
				<div className="h-full flex items-center">
					<motion.div
						className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[500px] lg:h-[500px] rounded-[10px] overflow-hidden flex-shrink-0"
						initial={{ scale: 0 }}
						animate={{ scale: loaderDone ? 1 : 0 }}
						transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
					>
						<video
							src="/hero/whop.mp4"
							autoPlay
							muted
							loop
							playsInline
							className="h-full w-full object-cover"
						/>
					</motion.div>
				</div>
				<div className="h-full w-full flex flex-col gap-5">
					<AnimatedText
						as="h1"
						className="text-display-md font-brier leading-none"
						text={"Build something\nthat people remember"}
						staggerDelay={0.06}
						align="end"
					/>
					<AnimatedText
						as="p"
						className="text-heading-lg font-brier leading-none"
						text={"Turn bold ideas into unforgettable digital experiences\nwith design, motion, and development\nthat keeps people coming back."}
						staggerDelay={0.03}
						startDelay={0.5}
						align="end"
					/>
				</div>
			</div>
			<div className="h-full flex flex-col justify-end">
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
			</div>
		</ScrollSection>
	);
}