"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "./heroContainer";
import { useLoaderContext } from "@/components/loader/loaderContext";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Page() {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLDivElement>(null);

	const { loaderDone } = useLoaderContext();

	useGSAP(
		() => {
			if (!loaderDone) return;

			// Initial state
			gsap.set(containerRef.current, {
				scale: 0,
				transformOrigin: "center center",
			});

			gsap.set(logoRef.current, {
				opacity: 0,
			});

			// Intro animation
			const intro = gsap.timeline();

			intro.to(containerRef.current, {
				scale: 1,
				duration: 0.8,
				ease: "power4.out",
			}).to(
				logoRef.current,
				{
					opacity: 1,
					duration: 1.2,
					ease: "power1.out",
				},
				"-=0.25"
			);

			// Create ScrollTrigger after intro finishes
			intro.add(() => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: wrapperRef.current,
						start: "top top",
						end: () => "+=" + window.innerHeight * 0.2,
						pin: true,
						scrub: 1,
						pinSpacing: true,
					},
				})

				tl.to(containerRef.current, {
					top: 40,
					right: 40,
					bottom: 40,
					left: 40,
					borderRadius: 20,
					ease: "none",
				}, 0);

			});
		},
		{
			scope: wrapperRef,
			dependencies: [loaderDone],
		}
	);

	return (
		<>
			<section
				ref={wrapperRef}
				className="relative h-screen w-full overflow-hidden bg-[#d9d9d9] dark:bg-[#121212]"
			>
				<div
					ref={containerRef}
					className="absolute inset-0 flex items-center justify-center bg-card"
				>
					<Container logoRef={logoRef} />
				</div>
			</section>

			<section className="h-screen bg-[#d9d9d9] dark:bg-[#121212]" />
		</>
	);
}