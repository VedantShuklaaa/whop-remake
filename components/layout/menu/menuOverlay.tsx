"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { NavLink } from "../textAnimations/navlink";
import { useCursorContext } from "../cursor/cursorContext";
import { useTheme } from "next-themes";
import AnimatedText from "../textAnimations/animatedText";
import { CTAButtons } from "./ctaButton";
import { ThemeToggleNavButton } from "@/components/theme/theme-button";

gsap.registerPlugin(useGSAP);

const Links = [
	{ title: "HOME", href: "/" },
	{ title: "CREATORS", href: "/creator" },
	{ title: "DEVELOPERS", href: "/developer" },
	{ title: "PRICING", href: "/pricing" },
];

const BASE_OFFSET = 10;
const AMPLITUDE = 60;
const CLOSE_DURATION = 0.6;

interface MenuOverlayProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
	const { theme } = useTheme();
	const pathname = usePathname();
	const router = useRouter();

	const overlayRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const col1Ref = useRef<HTMLDivElement>(null);
	const col2Ref = useRef<HTMLDivElement>(null);
	const dashRefs = useRef<Map<number, HTMLSpanElement>>(new Map());

	const pendingHrefRef = useRef<string | null>(null);
	const { setVariant } = useCursorContext();

	// Drive the parallax columns manually (replaces useMotionValue/useSpring/useTransform)
	const targetY = useRef(0);
	const currentY = useRef(0);
	const rafRef = useRef<number | null>(null);

	useGSAP(() => {
		if (!overlayRef.current) return;

		// Initial state: clipped closed, hidden from interaction/a11y until open
		gsap.set(overlayRef.current, {
			clipPath: "inset(0 0 100% 0)",
			pointerEvents: "none",
		});
	}, []);

	useGSAP(() => {
		if (!overlayRef.current) return;

		const tween = gsap.to(overlayRef.current, {
			clipPath: isOpen ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
			duration: CLOSE_DURATION,
			ease: isOpen ? "power4.out" : "power3.inOut",
			pointerEvents: isOpen ? "auto" : "none",
			onComplete: () => {
				if (!isOpen && pendingHrefRef.current) {
					router.push(pendingHrefRef.current);
					pendingHrefRef.current = null;
				}
			},
		});

		return () => {
			tween.kill();
		};
	}, [isOpen]);

	const handleMouseEnter = () => {
		setVariant(theme === "dark" ? "dark-menu" : "light-menu");
	};

	const handleMouseLeave = () => {
		targetY.current = 0;
		setVariant("default");
	};

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault();
		pendingHrefRef.current = href;
		onClose();
	};

	useGSAP(() => {
		Links.forEach((item, idx) => {
			const el = dashRefs.current.get(idx);
			if (!el) return;
			const isActive = pathname === item.href;

			gsap.to(el, {
				scaleX: isActive ? 1 : 0,
				transformOrigin: isActive ? "left center" : "right center",
				duration: 0.5,
				ease: "power3.inOut",
			});
		});
	}, [pathname]);

	return (
		<div
			ref={overlayRef}
			id="mobile-menu"
			aria-hidden={!isOpen}
			className="fixed left-0 right-0 top-0 h-screen z-40 bg-primary border-t border-zinc-100 dark:border-zinc-900"
		>
			<div
				ref={containerRef}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="h-full w-full flex items-center justify-center backdrop-blur-xl"
			>
				<div
					ref={col1Ref}
					className="h-full w-full flex flex-col items-center justify-center p-8 gap-8"
				>
					<AnimatedText
						as="h1"
						className="text-display-sm font-brier leading-none text-end"
						text={"Join the future of work"}
						staggerDelay={0.06}
					/>

					<CTAButtons />
				</div>

				<div
					ref={col2Ref}
					className="h-full w-full flex flex-col items-center justify-center"
				>
					{Links.map((item, idx) => (
						<Link
							href={item.href}
							key={idx}
							onClick={(e) => handleLinkClick(e, item.href)}
							className="relative font-mona text-display-md leading-none hover:text-zinc-800 duration-300"
						>
							<NavLink text={item.title} />

							<span
								ref={(el) => {
									if (el) dashRefs.current.set(idx, el);
									else dashRefs.current.delete(idx);
								}}
								className="absolute top-1/2 left-0 right-0 h-[6px] bg-zinc-800 -translate-y-1/2 scale-x-0"
							/>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}