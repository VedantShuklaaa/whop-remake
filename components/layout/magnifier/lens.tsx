"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMagnifyContext } from "./magnify";

const LENS_SIZE = 140;
const ZOOM = 1.8;

export function MagnifyLens() {
	const { state } = useMagnifyContext();
	const lensRef = useRef<HTMLDivElement>(null);
	const [clone, setClone] = useState<HTMLElement | null>(null);

	const x = useMotionValue(-200);
	const y = useMotionValue(-200);
	const springConfig = { damping: 30, stiffness: 400, mass: 0.4 };
	const lensX = useSpring(x, springConfig);
	const lensY = useSpring(y, springConfig);

	useEffect(() => {
		const move = (e: MouseEvent) => {
			x.set(e.clientX);
			y.set(e.clientY);
		};
		window.addEventListener("mousemove", move);
		return () => window.removeEventListener("mousemove", move);
	}, [x, y]);

	useEffect(() => {
		if (!state.active || !state.element) {
			setClone(null);
			return;
		}
		const node = state.element.cloneNode(true) as HTMLElement;
		node.style.position = "absolute";
		node.style.top = "0";
		node.style.left = "0";
		node.style.margin = "0";
		node.style.pointerEvents = "none";
		setClone(node);
	}, [state.active, state.element]);

	if (!state.rect) return null;

	const { rect, relX, relY } = state;

	const tx = LENS_SIZE / 2 - relX * ZOOM;
	const ty = LENS_SIZE / 2 - relY * ZOOM;

	return (
		<motion.div
			ref={lensRef}
			className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full overflow-hidden border-2 border-primary bg-black"
			style={{
				x: lensX,
				y: lensY,
				translateX: "-50%",
				translateY: "-50%",
			}}
			animate={{
				width: state.active ? LENS_SIZE : 32,
				height: state.active ? LENS_SIZE : 32,
				opacity: state.active ? 1 : 0,
			}}
			transition={{ type: "spring", damping: 22, stiffness: 300 }}
		>
			{clone && (
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: rect.width,
						height: rect.height,
						transform: `translate(${tx}px, ${ty}px) scale(${ZOOM})`,
						transformOrigin: "top left",
					}}
					ref={(el) => {
						if (el && clone && el.firstChild !== clone) {
							el.innerHTML = "";
							el.appendChild(clone);
						}
					}}
				/>
			)}
		</motion.div>
	);
}