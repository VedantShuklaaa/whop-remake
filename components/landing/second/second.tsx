"use client";
import { ScrollSection } from "@/components/layout/scroll/scrollSection";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedText from "@/components/layout/textAnimations/animatedText";
import { useMagnify } from "@/components/layout/magnifier/magnify";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StackingCards from "./stackingCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);


const Stories = [
	{
		name: "Sean O Melly",
		desc: "Known for his colorful personality and dynamic fighting style, blending elite competition with an unmistakable personal brand.",
		style: { top: "4%", left: "40%", width: "320px" },
		rotate: -6,
		float: { duration: 5, delay: 0, x: [0, 14, 0], y: [0, -22, 0] },
	},
	{
		name: "Tfue",
		desc: "A competitive gamer turned full-time creator, built one of the largest audiences in gaming through elite gameplay and livestreams.",
		style: { top: "10%", left: "68%", width: "300px" },
		rotate: 4,
		float: { duration: 6, delay: 0.4, x: [0, -12, 0], y: [0, 20, 0] },
	},
	{
		name: "JasonTheWeen",
		desc: "Combines humor, livestreaming, and collaborative content to create entertaining experiences that keep viewers engaged.",
		style: { top: "36%", left: "50%", width: "310px" },
		rotate: 3,
		float: { duration: 4.5, delay: 0.8, x: [0, 16, 0], y: [0, -18, 0] },
	},
	{
		name: "Lacy",
		desc: "Known for energetic livestreams, community-driven content, and an on-camera personality that resonates with younger audiences.",
		style: { top: "40%", left: "76%", width: "290px" },
		rotate: -4,
		float: { duration: 5.5, delay: 1.2, x: [0, -14, 0], y: [0, 22, 0] },
	},
];

function StoryCard({ story, idx, isInView }: { story: typeof Stories[number]; idx: number; isInView: boolean }) {
	const { ref, bind } = useMagnify();

	return (
		<motion.div
			className="absolute"
			style={{ top: story.style.top, left: story.style.left, width: story.style.width }}
			initial={{ opacity: 0, scale: 0.85 }}
			animate={isInView ? { opacity: 1, scale: 1 } : {}}
			transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.65, 0, 0.35, 1] }}
		>
			<motion.div
				ref={ref}
				{...bind}
				className="rounded-[14px] border bg-black/5 dark:bg-white/5 backdrop-blur-xl p-6 shadow-xl flex flex-col gap-2"
				animate={{
					x: story.float.x,
					y: story.float.y,
					rotate: [story.rotate - 2, story.rotate + 2, story.rotate - 2],
				}}
				transition={{
					duration: story.float.duration,
					delay: story.float.delay,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			>
				<p className="font-brier text-heading-lg leading-none">{story.name}</p>
				<p className="font-mona text-body-md text-black/60 dark:text-white/60 leading-snug">
					{story.desc}
				</p>
			</motion.div>
		</motion.div>
	);
}

export default function Second() {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<HTMLDivElement[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	useGSAP(
		() => {
			if (!wrapperRef.current) return;

			const cards = cardRefs.current.filter(Boolean);

			cards.forEach((card, index) => {
				gsap.set(card, {
					yPercent: index === 0 ? 0 : 100,
					zIndex: index + 1,
				});
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: wrapperRef.current,
					start: "top top",
					end: () => `+=${window.innerHeight * (cards.length - 1)}`,
					pin: true,
					scrub: true, 
					anticipatePin: 1,
					invalidateOnRefresh: true,
					markers: true, 
				},
			});

			cards.slice(1).forEach((card, i) => {
				tl.to(card, {
					yPercent: 0,
					duration: 1,
					ease: "none",
					onStart: () => setActiveIndex(i + 1),
					onReverseComplete: () => setActiveIndex(i),
				});
			});

			const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

			return () => {
				clearTimeout(refreshTimer);
				tl.scrollTrigger?.kill();
				tl.kill();
			};
		},
		{ scope: wrapperRef }
	);

	return (
		<ScrollSection className="relative w-full">
			<div className="flex flex-col gap-8 w-full">
				<div className="w-full flex flex-col items-end justify-start p-8 gap-5 max-w-3xl ml-auto relative z-20">
					<AnimatedText
						as="h2"
						className="text-display-md font-garamond leading-none w-full"
						text={"Everything your next project needs."}
						align="end"
						staggerDelay={0.05}
					/>
					<AnimatedText
						as="p"
						className="text-heading-lg font-garamond leading-none w-full"
						text={
							"Whether you're starting from scratch\nor refining what already exists,\nevery decision should move your vision\ncloser to something people genuinely enjoy using."
						}
						align="end"
						staggerDelay={0.03}
						startDelay={0.5}
					/>
				</div>

				<StackingCards />
			</div>
		</ScrollSection>
	);
}