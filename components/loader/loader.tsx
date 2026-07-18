"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
	const hasCompletedRef = useRef(false);

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
		<motion.div
			ref={containerRef}
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
			initial={{ y: "0%" }}
			animate={{ y: shutterOpen ? "-100%" : "0%" }}
			style={{ pointerEvents: shutterOpen ? "none" : "auto" }}
			transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
			onAnimationComplete={() => {
				if (shutterOpen && !hasCompletedRef.current) {
					hasCompletedRef.current = true;
					onComplete?.();
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
	);
}

export default function LoaderWrapper({ src }: { src: string }) {
	const { setLoaderDone } = useLoaderContext();
	return <Loader src={src} onComplete={() => setLoaderDone(true)} />;
}