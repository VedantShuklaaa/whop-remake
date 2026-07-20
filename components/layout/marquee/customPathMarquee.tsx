"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin, useGSAP);

const TEXT = "WILDBOYS TRIBE • ";
const REPEATED = TEXT.repeat(4).split("");

export default function CurvedLetterMarquee() {
	const containerRef = useRef<HTMLDivElement>(null);
	const pathRef = useRef<SVGPathElement>(null);

	useGSAP(() => {
		if (!pathRef.current) return;

		const letters = gsap.utils.toArray<HTMLSpanElement>(".marquee-letter");

		letters.forEach((el, i) => {
			gsap.to(el, {
				motionPath: {
					path: pathRef.current!,
					align: pathRef.current!,
					alignOrigin: [0.5, 0.5],
					autoRotate: true, // letters tilt to match the curve's tangent
					start: i / letters.length,
					end: 1 + i / letters.length,
				},
				duration: 8,
				ease: "none",
				repeat: -1,
			});
		});
	}, { scope: containerRef });

	return (
		<div ref={containerRef} className="relative w-full h-[300px]">
			<svg viewBox="0 0 800 300" className="absolute inset-0 w-full h-full">
				<path
					ref={pathRef}
					d="M -50,150 C 150,30 300,270 450,150 C 600,30 750,270 900,150"
					fill="none"
					stroke="none"
				/>
			</svg>

			{REPEATED.map((char, i) => (
				<span
					key={i}
					className="marquee-letter absolute top-0 left-0 font-brier text-2xl"
				>
					{char}
				</span>
			))}
		</div>
	);
}