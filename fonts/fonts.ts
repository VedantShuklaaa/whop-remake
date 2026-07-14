import localFont from "next/font/local";
import { Anton, EB_Garamond } from "next/font/google";

export const MonaSans = localFont({
	src: "./Mona-Sans-SemiBold.woff2",
	variable: "--font-mona",
	display: "swap",
});


export const Brier = localFont({
	src: "./Brier-Bold.woff2",
	variable: "--font-brier",
	display: "swap",
});


export const anton = Anton({
	variable: "--font-anton",
	subsets: ["latin"],
	weight: ["400"]
})

export const garamond = EB_Garamond({
	variable: "--font-garamond",
	subsets: ["latin"],
	weight: ["400"]
});