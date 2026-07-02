import type { Animation, AnimationVariant, AnimationStart } from "./theme";

export const GIF_PRESETS: Record<"1" | "2" | "3", string> = {
	"1": "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif",
	"2": "https://media.giphy.com/media/5PncuvcXbBuIZcSiQo/giphy.gif",
	"3": "https://media.giphy.com/media/WgsVx6C4N8tjy/giphy.gif",
};

const getPolygonClipPaths = (position: AnimationStart) => {
	switch (position) {
		case "top-right":
			return {
				darkFrom: "polygon(150% -71%, 250% 71%, 250% 71%, 150% -71%)",
				darkTo: "polygon(150% -71%, 250% 71%, 50% 171%, -71% 50%)",
				lightFrom: "polygon(-71% 50%, 50% 171%, 50% 171%, -71% 50%)",
				lightTo: "polygon(-71% 50%, 50% 171%, 250% 71%, 150% -71%)",
			};
		case "top-left":
		default:
			return {
				darkFrom: "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",
				darkTo: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",
				lightFrom: "polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)",
				lightTo: "polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)",
			};
	}
};

export function createAnimation(
	variant: AnimationVariant,
	start: AnimationStart = "top-left",
	blur = false,
	gifUrl?: string
): Animation {
	if (variant === "gif") {
		const url = gifUrl ?? GIF_PRESETS["1"];
		return {
			name: `gif`,
			css: `
        ::view-transition-group(root) {
          animation-timing-function: ease-in;
        }
        ::view-transition-new(root) {
          mask: url('${url}') center / 0 no-repeat;
          animation: gif-scale 3s;
        }
        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: gif-scale 3s;
        }
        @keyframes gif-scale {
          0%   { mask-size: 0; }
          10%  { mask-size: 50vmax; }
          90%  { mask-size: 50vmax; }
          100% { mask-size: 2000vmax; }
        }
      `,
		};
	}

	// polygon
	const clipPaths = getPolygonClipPaths(start);
	const id = `polygon-${start}${blur ? "-blur" : ""}`;

	return {
		name: id,
		css: `
      ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: ease-out;
      }
      ::view-transition-new(root) {
        animation-name: reveal-light-${id};
        ${blur ? "filter: blur(2px);" : ""}
      }
      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark-${id};
        ${blur ? "filter: blur(2px);" : ""}
      }
      @keyframes reveal-dark-${id} {
        from {
          clip-path: ${clipPaths.darkFrom};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPaths.darkTo};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
      @keyframes reveal-light-${id} {
        from {
          clip-path: ${clipPaths.lightFrom};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPaths.lightTo};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
    `,
	};
}