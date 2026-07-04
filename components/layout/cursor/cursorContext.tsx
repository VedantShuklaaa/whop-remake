"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CursorVariant = "default" | "dark-menu" | "light-menu";

interface CursorContextValue {
	variant: CursorVariant;
	setVariant: (v: CursorVariant) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
	const [variant, setVariant] = useState<CursorVariant>("default");
	return (
		<CursorContext.Provider value={{ variant, setVariant }}>
			{children}
		</CursorContext.Provider>
	);
}

export function useCursorContext() {
	const ctx = useContext(CursorContext);
	if (!ctx) throw new Error("useCursorContext must be used within CursorProvider");
	return ctx;
}

export function useCursorVariant(variant: CursorVariant) {
	const { setVariant } = useCursorContext();

	const bind = {
		onMouseEnter: () => setVariant(variant),
		onMouseLeave: () => setVariant("default"),
	};

	return { bind };
}