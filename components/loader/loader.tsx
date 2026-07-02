"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
	src: string;
	onComplete?: () => void;
}

export default function Loader({ src, onComplete }: LoaderProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [videoEnded, setVideoEnded] = useState(false);
	const [pageLoaded, setPageLoaded] = useState(false);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (document.readyState === "complete") {
			setPageLoaded(true);
		} else {
			const handleLoad = () => setPageLoaded(true);
			window.addEventListener("load", handleLoad);
			return () => window.removeEventListener("load", handleLoad);
		}
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		const handleEnd = () => setVideoEnded(true);
		video.addEventListener("ended", handleEnd);
		return () => video.removeEventListener("ended", handleEnd);
	}, []);

	const shutterOpen = videoEnded && pageLoaded;

	return (
		<AnimatePresence onExitComplete={() => { setVisible(false); onComplete?.(); }}>
			{visible && (
				<motion.div
					key="loader"
					className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
					animate={shutterOpen ? { y: "-100%" } : { y: "0%" }}
					transition={shutterOpen ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] } : undefined}
					onAnimationComplete={() => {
						if (shutterOpen) setVisible(false);
					}}
				>
					<video
						ref={videoRef}
						src={src}
						autoPlay
						muted
						playsInline
						className="h-[50%] w-[50%] object-cover"
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}