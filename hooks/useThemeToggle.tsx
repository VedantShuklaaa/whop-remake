"use client";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { createAnimation } from "../lib/createAnimation";
import type { AnimationVariant, AnimationStart } from "@/lib/theme";

const STYLE_ID = "theme-transition-styles";

function injectStyles(css: string) {
	if (typeof window === "undefined") return;
	let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
	if (!el) {
		el = document.createElement("style");
		el.id = STYLE_ID;
		document.head.appendChild(el);
	}
	el.textContent = css;
}

interface UseThemeToggleOptions {
	variant?: AnimationVariant;
	start?: AnimationStart;
	blur?: boolean;
	gifUrl?: string;
}

export function useThemeToggle({
	variant = "polygon",
	start = "top-left",
	blur = false,
	gifUrl,
}: UseThemeToggleOptions = {}) {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		setIsDark(resolvedTheme === "dark");
	}, [resolvedTheme]);

	const runTransition = useCallback(
		(next: "light" | "dark") => {
			const { css } = createAnimation(variant, start, blur, gifUrl);
			injectStyles(css);

			const switchTheme = () => setTheme(next);

			if (!document.startViewTransition) {
				switchTheme();
				return;
			}
			document.startViewTransition(switchTheme);
		},
		[variant, start, blur, gifUrl, setTheme]
	);

	const toggleTheme = useCallback(() => {
		const next = theme === "light" ? "dark" : "light";
		setIsDark(next === "dark");
		runTransition(next);
	}, [theme, runTransition]);

	const setLight = useCallback(() => {
		setIsDark(false);
		runTransition("light");
	}, [runTransition]);

	const setDark = useCallback(() => {
		setIsDark(true);
		runTransition("dark");
	}, [runTransition]);

	return { isDark, toggleTheme, setLight, setDark };
}