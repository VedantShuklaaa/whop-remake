"use client";
import { createContext, useContext, useRef, useState, ReactNode } from "react";

interface MagnifyState {
	active: boolean;
	element: HTMLElement | null;
	rect: DOMRect | null;
	relX: number;
	relY: number;
}

interface MagnifyContextValue {
	state: MagnifyState;
	setState: React.Dispatch<React.SetStateAction<MagnifyState>>;
}

const MagnifyContext = createContext<MagnifyContextValue | null>(null);

const initialState: MagnifyState = {
	active: false,
	element: null,
	rect: null,
	relX: 0,
	relY: 0,
};

export function MagnifyProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<MagnifyState>(initialState);
	return (
		<MagnifyContext.Provider value={{ state, setState }}>
			{children}
		</MagnifyContext.Provider>
	);
}

export function useMagnifyContext() {
	const ctx = useContext(MagnifyContext);
	if (!ctx) throw new Error("useMagnifyContext must be used within MagnifyProvider");
	return ctx;
}

export function useMagnify<T extends HTMLElement = HTMLDivElement>() {
	const { setState } = useMagnifyContext();
	const ref = useRef<T>(null);

	const bind = {
		onMouseEnter: () => {
			if (!ref.current) return;
			setState((prev) => ({
				...prev,
				active: true,
				element: ref.current,
				rect: ref.current!.getBoundingClientRect(),
			}));
		},
		onMouseMove: (e: React.MouseEvent) => {
			if (!ref.current) return;
			const rect = ref.current.getBoundingClientRect();
			setState((prev) => ({
				...prev,
				rect,
				relX: e.clientX - rect.left,
				relY: e.clientY - rect.top,
			}));
		},
		onMouseLeave: () => {
			setState((prev) => ({ ...prev, active: false, element: null }));
		},
	};

	return { ref, bind };
}