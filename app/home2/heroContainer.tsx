'use client';
import { RefObject } from "react";
import { ScrollSection } from "@/components/layout/scroll/scrollSection";

interface TitleProps {
	logoRef: RefObject<HTMLDivElement | null>;
}

export const Title = ({ logoRef }: TitleProps) => {
	return (
		<ScrollSection>
			<h1
				ref={logoRef}
				className="font-bold font-anton text-center text-primary opacity-0 flex items-center justify-center px-4"
				style={{fontSize: "5000%"}}
			>
				Whop
			</h1>
		</ScrollSection>
	);
};



interface SubheadingProps {
	subheadingRef: RefObject<HTMLDivElement | null>,
}

export const Subheading = ({ subheadingRef }: SubheadingProps) => {
	return (
		<div className="flex flex-col px-4 font-garamond leading-none mt-20 gap-2 opacity-0" ref={subheadingRef}>
			<h2 className="text-[4rem] tracking-tight  leading-none text-[#111111]">
				The future of work
			</h2>
			<p className="text-[2rem] font-light flex flex-col">
				<span>Turn your passions, skills, and knowledge </span>
				<span>into profit.</span>
			</p>
		</div>
	)
}
