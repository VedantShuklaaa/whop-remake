"use client";
import { useEffect, useRef } from "react";

const VIDEOS = [
	"/menu/jason.MOV",
	"/menu/sean.MOV",
	"/menu/jason.MOV",
	"/menu/sean.MOV",
	"/menu/jason.MOV",
	"/menu/sean.MOV",
	"/menu/sean.MOV",
	"/menu/sean.MOV",
];

const PANELS = [
	{ left: "4vw", top: "6vh", w: 400, h: 600, z: -260, rot: 14 },
	{ left: "22vw", top: "68vh", w: 300, h: 450, z: -120, rot: 8 },
	{ left: "38vw", top: "12vh", w: 500, h: 320, z: -60, rot: -4 },
	{ left: "58vw", top: "62vh", w: 220, h: 370, z: -40, rot: 3 },
	{ left: "72vw", top: "8vh", w: 200, h: 340, z: -180, rot: -10 },
	{ left: "84vw", top: "54vh", w: 180, h: 300, z: -280, rot: -14 },
];

export default function VideoWallBackground() {
	const shuffled = useRef<string[]>([]);
	if (shuffled.current.length === 0) {
		shuffled.current = [...VIDEOS].sort(() => Math.random() - 0.5);
	}

	const wrapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = wrapRef.current;
		if (!el) return;

		const onMove = (e: MouseEvent) => {
			const { innerWidth: w, innerHeight: h } = window;
			const x = (e.clientX / w - 0.5) * 2;
			const y = (e.clientY / h - 0.5) * 2;
			el.style.setProperty("--rx", `${(-y * 4).toFixed(2)}deg`);
			el.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
		};

		window.addEventListener("mousemove", onMove);
		return () => window.removeEventListener("mousemove", onMove);
	}, []);

	return (
		<div className="absolute inset-0 -z-10 overflow-hidden bg-[#08070d] pointer-events-none">
			<div
				aria-hidden
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(ellipse at 50% 40%, rgba(120,80,255,0.25), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,80,180,0.15), transparent 60%)",
				}}
			/>

			<div className="absolute inset-0" style={{ perspective: "1400px", perspectiveOrigin: "50% 45%" }}>
				<div
					ref={wrapRef}
					className="relative h-full w-full transition-transform duration-300 ease-out"
					style={{
						transformStyle: "preserve-3d",
					}}
				>
					{PANELS.map((p, i) => (
						<div
							key={i}
							className="absolute overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
							style={{
								left: p.left,
								top: p.top,
								width: p.w,
								height: p.h,
								transform: `translateZ(${p.z}px) rotateY(${p.rot}deg)`,
								transformStyle: "preserve-3d",
							}}
						>
							<video
								src={shuffled.current[i % shuffled.current.length]}
								autoPlay
								loop
								muted
								playsInline
								className="h-full w-full object-cover"
							/>
							<div
								aria-hidden
								className="pointer-events-none absolute inset-0"
								style={{
									background:
										"linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
								}}
							/>
						</div>
					))}
				</div>
			</div>

			<div
				aria-hidden
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(ellipse at 50% 50%, rgba(8,7,13,0.15) 0%, rgba(8,7,13,0.85) 75%)",
				}}
			/>
		</div>
	);
}