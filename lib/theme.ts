export type AnimationVariant = "gif" | "polygon";

export type AnimationStart =
	| "top-left"
	| "top-right";

export type GifType = "1" | "2" | "3" | "custom";

export interface Animation {
	name: string;
	css: string;
}