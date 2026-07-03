"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoaderContextValue {
	loaderDone: boolean;
	setLoaderDone: (done: boolean) => void;
}

const LoaderContext = createContext<LoaderContextValue | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
	const [loaderDone, setLoaderDone] = useState(false);

	return (
		<LoaderContext.Provider value={{ loaderDone, setLoaderDone }}>
			{children}
		</LoaderContext.Provider>
	);
}

export function useLoaderContext() {
	const ctx = useContext(LoaderContext);
	if (!ctx) throw new Error("useLoaderContext must be used within LoaderProvider");
	return ctx;
}