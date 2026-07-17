'use client';
import { RefObject, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface ContainerProps {
	logoRef: RefObject<HTMLVideoElement | null>;
}

export const Container = ({ logoRef }: ContainerProps) => {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const src =
		resolvedTheme === "dark"
			? "/videos/Whop_logo_art_dark.webm"
			: "/videos/Whop_logo_art_dark.webm";

	return (
		<motion.video
			key={src}
			ref={logoRef}
			src={src}
			height={900}
			width={900}
			className="object-cover"
			autoPlay
			muted
			loop
			playsInline
			preload="auto"
		/>
	);
};