"use client";
import { useRef } from "react";
import Card, { cards } from "./card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxZoom() {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const cameraRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: wrapperRef.current,
				start: "top top",
				end: () => "+=" + window.innerHeight * 20,
				pin: true,
				scrub: true,
				invalidateOnRefresh: true,
			},
		});

		tl.to(cameraRef.current, {
			z: 2500,
			ease: "none",
			force3D: true,
		});

		tl.to(sceneRef.current, {
			rotationX: -3,
			rotationY: 5,
			ease: "none",
			force3D: true,
		}, 0);
	}, []);

	return (
		<section
			ref={wrapperRef}
			className="relative overflow-hidden h-screen w-full bg-background"
			style={{ perspective: "1800px" }}
		>
			<div
				ref={cameraRef}
				className="relative h-full w-full"
				style={{ transformStyle: "preserve-3d" }}
			>
				<div
					ref={sceneRef}
					className="relative h-full w-full"
					style={{ transformStyle: "preserve-3d" }}
				>
					{cards.map((card) => (
						<Card
							key={card.id}
							image={card.image}
							x={card.x}
							y={card.y}
							z={card.z}
							rotateX={card.rx}
							rotateY={card.ry}
							rotateZ={card.rz}
						/>
					))}
				</div>
			</div>
		</section>
	);
}