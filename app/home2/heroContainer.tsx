'use client';
import { RefObject } from "react";
import { useLoaderContext } from "@/components/loader/loaderContext";
import { ScrollSection } from "@/components/layout/scroll/scrollSection";

interface ContainerProps {
	logoRef: RefObject<HTMLDivElement | null>;
}

export const Container = ({ logoRef }: ContainerProps) => {
	const { loaderDone } = useLoaderContext();

	return (
		<ScrollSection>
			<h1
				ref={logoRef}
				className="text-[14rem] font-bold font-brier text-center text-primary opacity-0"
			>
				Whop
			</h1>
		</ScrollSection>
	);
};