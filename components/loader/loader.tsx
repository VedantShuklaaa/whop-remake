"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLoaderContext } from "./loaderContext";

interface LoaderProps {
	src: string;
	onComplete?: () => void;
}

export function Loader({ src, onComplete }: LoaderProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const isInView = useInView(containerRef, { once: true });

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
		if (!video || !isInView) return;
		video.play().catch(() => { });
	}, [isInView]);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		const handleEnd = () => setVideoEnded(true);
		video.addEventListener("ended", handleEnd);
		return () => video.removeEventListener("ended", handleEnd);
	}, []);

	const shutterOpen = videoEnded && pageLoaded;

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					key="loader"
					ref={containerRef}
					className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
					initial={{ y: "0%", opacity: 1 }}
					animate={shutterOpen ? { y: "-100%", opacity: 1 } : { y: "0%", opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={shutterOpen ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] } : undefined}
					onAnimationComplete={() => {
						if (shutterOpen) {
							onComplete?.();
							setVisible(false);
						}
					}}
				>
					<video
						ref={videoRef}
						src={src}
						muted
						playsInline
						className="h-[50%] w-[50%] object-cover"
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}


export default function LoaderWrapper({ src }: { src: string }) {
	const { setLoaderDone } = useLoaderContext();
	return <Loader src={src} onComplete={() => setLoaderDone(true)} />;
}