'use client';
import { ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxWrapperProps {
	children: ReactNode;
	className?: string;
	yPercent?: number;
	start?: string;
	end?: string;
	dependencies?: unknown[];
}

export default function ParallaxWrapper({
	children,
	className = "",
	yPercent = -15,
	start = "top bottom",
	end = "bottom top",
	dependencies = [],
}: ParallaxWrapperProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!containerRef.current) return;

		gsap.to(containerRef.current, {
			yPercent,
			ease: "none",
			scrollTrigger: {
				trigger: containerRef.current,
				start,
				end,
				scrub: true,
			},
		});
	}, { scope: containerRef, dependencies });

	return (
		<div ref={containerRef} className={cn(className)}>
			{children}
		</div>
	);
}