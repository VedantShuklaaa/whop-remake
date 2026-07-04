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
					style={{lineHeight: "0.8"}}
				>
					{char}
				</motion.span>
			))}
		</h1>
	);
}



export default function Hero() {
	return (
		<ScrollSection className="h-screen w-full flex flex-col  p-4 sm:p-6 lg:p-10">
			<div className="h-full flex flex-col items-end py-20 gap-5">
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
			<div className="h-full flex flex-col justify-end">
				<CyclingText />
				<Whop />
			</div>
		</ScrollSection>
	);
}