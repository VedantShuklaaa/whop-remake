"use client";
import { ScrollSection } from "@/components/layout/scroll/scrollSection";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import AnimatedText from "@/components/layout/textAnimations/animatedText";

const Stories = [
	{
		src: "/menu/sean.mov",
		name: "Sean O Melly",
		desc: "Known for his colorful personality and dynamic fighting style, Sean O'Malley blends elite competition with an unmistakable personal brand.",
		description: "Sean O'Malley has become one of the most recognizable names in mixed martial arts through a combination of technical striking, highlight-reel performances, and strong engagement with fans. Outside the cage, he shares training, podcasts, and behind-the-scenes moments that have helped him build a loyal online following. His ability to combine sport, entertainment, and personal branding has made him a standout figure in combat sports.",
	},
	{
		src: "/menu/tfue.mov",
		name: "Tfue",
		desc: "A competitive gamer turned full-time creator, Tfue built one of the largest audiences in gaming through elite gameplay, livestreams, and a no-nonsense personality.",
		description: "Tfue rose to prominence during the competitive battle royale era, earning recognition for his mechanical skill and consistent high-level performance. Beyond tournaments, he expanded into content creation with livestreams, challenge videos, and collaborations that attracted millions of viewers. His influence extends beyond competitive gaming, making him one of the defining personalities of modern livestream culture.",
	},
	{
		src: "/menu/jason.mov",
		name: "JasonTheWeen",
		desc: "JasonTheWeen combines humor, livestreaming, and collaborative content to create entertaining experiences that keep viewers engaged.",
		description: "JasonTheWeen has grown his audience through consistent livestreaming, creator collaborations, and personality-driven content. Rather than relying on a single niche, his streams often mix gaming, casual conversations, reaction content, and community interaction. This variety, combined with an approachable style, has helped establish a dedicated fanbase across multiple social platforms.",
	},
	{
		src: "/menu/lacy.mov",
		name: "Lacy",
		desc: "Lacy is known for energetic livestreams, community-driven content, and an entertaining on-camera personality that resonates with younger audiences.",
		description: "Lacy has built a growing online presence through interactive livestreams, collaborations with fellow creators, and content centered around gaming, conversation, and internet culture. A large part of the appeal comes from spontaneous moments and strong audience interaction, creating a community that actively participates in every stream rather than simply watching from the sidelines.",
	},
];

function StoryVideoPlayer() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		setProgress(0);
		video.currentTime = 0;
		video.play().catch(() => { });

		const handleTimeUpdate = () => {
			if (video.duration) {
				setProgress((video.currentTime / video.duration) * 100);
			}
		};

		const handleEnded = () => {
			setActiveIndex((prev) => (prev + 1) % Stories.length);
		};

		video.addEventListener("timeupdate", handleTimeUpdate);
		video.addEventListener("ended", handleEnded);

		return () => {
			video.removeEventListener("timeupdate", handleTimeUpdate);
			video.removeEventListener("ended", handleEnded);
		};
	}, [activeIndex]);

	// pause progress/playback while the description panel is open, resume on leave
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		if (isHovered) {
			video.pause();
		} else {
			video.play().catch(() => { });
		}
	}, [isHovered]);

	const current = Stories[activeIndex];

	return (
		<div
			className="relative h-full w-full rounded-[10px] overflow-hidden border"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<video
				ref={videoRef}
				src={current.src}
				muted
				playsInline
				className="h-full w-full object-cover"
			/>

			<div className="absolute bottom-0 left-0 right-0 flex gap-1.5 p-2 z-20">
				{Stories.map((_, idx) => (
					<div
						key={idx}
						className="h-[3px] flex-1 rounded-full bg-white/30 backdrop-blur-md overflow-hidden"
					>
						<motion.div
							className="h-full bg-white rounded-full"
							initial={{ width: "0%" }}
							animate={{
								width:
									idx < activeIndex
										? "100%"
										: idx === activeIndex
											? `${progress}%`
											: "0%",
							}}
							transition={{ ease: "linear", duration: idx === activeIndex ? 0.1 : 0.3 }}
						/>
					</div>
				))}
			</div>

			<div className="absolute bottom-4 left-0 right-0 p-2 z-20">
				<div className="rounded-[8px] bg-black/30 backdrop-blur-md p-3 flex flex-col gap-1">
					<motion.p
						key={`title-${activeIndex}`}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
						className="text-white font-brier text-display-sm leading-none"
					>
						{current.name}
					</motion.p>
					<motion.p
						key={`desc-${activeIndex}`}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.05, ease: [0.65, 0, 0.35, 1] }}
						className="text-white/70 font-mona text-body-md"
					>
						{current.desc}
					</motion.p>
				</div>
			</div>

			<AnimatePresence>
				{isHovered && (
					<motion.div
						key="description-panel"
						initial={{ clipPath: "inset(0 0 100% 0)" }}
						animate={{ clipPath: "inset(0 0 0% 0)" }}
						exit={{ clipPath: "inset(0 0 100% 0)" }}
						transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
						className="absolute inset-0 z-30 bg-black/50 backdrop-blur-xl flex flex-col justify-center p-6"
					>
						<motion.p
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 12 }}
							transition={{ duration: 0.4, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
							className="text-white font-brier text-display-lg leading-none mb-3"
						>
							{current.name}
						</motion.p>
						<motion.p
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 12 }}
							transition={{ duration: 0.4, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
							className="text-white/80 font-mona text-body-md leading-relaxed"
						>
							{current.description}
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default function Second() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<ScrollSection className="h-screen w-full flex">
			<div ref={ref} className="h-full w-full flex flex-col items-start justify-start p-8 gap-5">
				<AnimatedText
					as="h2"
					className="text-display-md font-brier leading-none"
					text={"Everything your next project needs."}
					staggerDelay={0.05}
				/>

				<AnimatedText
					as="p"
					className="text-heading-lg font-brier leading-none"
					text={"Whether you're starting from scratch\nor refining what already exists,\nevery decision should move your vision\ncloser to something people genuinely enjoy using."}
					staggerDelay={0.03}
					startDelay={0.5}
				/>
			</div>

			<div className="h-full w-full p-4">
				<div className="h-full w-full rounded-[10px] border bg-black/1 dark:bg-white/1 backdrop-blur-xl p-2">
					<StoryVideoPlayer />
				</div>
			</div>
		</ScrollSection>
	);
}