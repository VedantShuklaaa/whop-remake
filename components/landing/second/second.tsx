"use client";
import { ScrollSection } from "@/components/layout/scroll/scrollSection";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedText from "@/components/layout/textAnimations/animatedText";
import { useMagnify } from "@/components/layout/magnifier/magnify";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "@/components/layout/marquee/marquee";

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

export default function VideoSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	useGSAP(
		() => {
			const video = videoRef.current;

			ScrollTrigger.create({
				trigger: sectionRef.current,
				start: "top top",
				end: "bottom top",
				onEnter: () => video?.play(),
				onEnterBack: () => video?.play(),
				onLeave: () => video?.pause(),
				onLeaveBack: () => video?.pause(),
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top top",
					end: "+=1000vh",
					pin: true,
					scrub: 1,
					pinSpacing: true,
					markers: true,
				},
			});

			tl.to(boxRef.current, {
				width: "100vw",
				height: "100vh",
				borderRadius: 0,
				ease: "none",
			});
		},
		{ scope: sectionRef }
	);

	return (
		<section
			ref={sectionRef}
			className="h-screen w-full bg-black flex items-center justify-center relative"
		>
			<MarqueeBackground />
			<div
				ref={boxRef}
				className="h-[40vh] w-[40vw] overflow-hidden z-11"
			>
				<video
					ref={videoRef}
					src="/videos/whop-btc-gold.mp4"
					muted
					loop
					playsInline
					className="h-full w-full object-cover"
				/>
			</div>
		</section>
	);
}


const MarqueeBackground = () => {
	return (
		<div className="h-screen w-full pointer-event-none absolute inset-0 z-10 overflow-hidden">
			<Marquee speed={60} direction="left">
				{["AGENCY", "GAMES", "EVENTS", "NEWSPAPERS"].map((text, i) => (
					<span
						key={i}
						className="font-garamond text-[11.4rem] leading-none whitespace-nowrap uppercase text-[#808080]"
					>
						{text}
					</span>
				))}
			</Marquee>

			<Marquee speed={40} direction="right">
				{["COMMUNITY", "MEMBERSHIP", "MONITIZATION", "MARKETPLACE"].map((text, i) => (
					<span
						key={i}
						className="font-garamond text-[11.4rem] leading-none whitespace-nowrap uppercase text-[#808080]"
					>
						{text}
					</span>
				))}
			</Marquee>

			<Marquee speed={60} direction="left">
				{["TRADING", "CRYPTO", "STOCKS", "FOREX"].map((text, i) => (
					<span
						key={i}
						className="font-garamond text-[11.4rem] leading-none whitespace-nowrap uppercase text-[#808080]"
					>
						{text}
					</span>
				))}
			</Marquee>

			<Marquee speed={35} direction="right">
				{["WORKFLOWS", "INTEGRATIONS", "PRODUCTIVITY", "OPTIMIZATIONS"].map((text, i) => (
					<span
						key={i}
						className="font-garamond text-[11.4rem] leading-none whitespace-nowrap uppercase text-[#808080]"
					>
						{text}
					</span>
				))}
			</Marquee>

			<Marquee speed={60} direction="left">
				{["BUILD", "LAUNCH", "SCALE", "LEARN"].map((text, i) => (
					<span
						key={i}
						className="font-garamond text-[11.4rem] leading-none whitespace-nowrap uppercase text-[#808080]"
					>
						{text}
					</span>
				))}
			</Marquee>

			<Marquee speed={60} direction="right">
				{["AUDIENCE", "GROWTH", "REVENUE", "CREATOR"].map((text, i) => (
					<span
						key={i}
						className="font-garamond text-[11.4rem] leading-none whitespace-nowrap uppercase text-[#808080]"
					>
						{text}
					</span>
				))}
			</Marquee>
		</div>
	)
}