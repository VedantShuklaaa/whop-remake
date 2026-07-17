import Image from "next/image";

interface CardProps {
	image: string;
	x: number;
	y: number;
	z: number;
	rotateX: number;
	rotateY: number;
	rotateZ: number;
}

export default function Card({
	image,
	x,
	y,
	z,
	rotateX,
	rotateY,
	rotateZ,
}: CardProps) {
	return (
		<div
			className="absolute w-80 aspect-[16/10] overflow-hidden rounded-2xl top-1/2 left-1/2"
			style={{
				transform: `
					translate(-50%, -50%)
					translate3d(${x}px, ${y}px, ${z}px)
					rotateX(${rotateX}deg)
					rotateY(${rotateY}deg)
					rotateZ(${rotateZ}deg)
				`,
				willChange: "transform",
				backfaceVisibility: "hidden",
			}}
		>
			<Image
				src={image}
				alt=""
				fill
				sizes="320px"
				className="object-cover"
			/>
		</div>
	);
}

export const cards = [
	{ id: 1, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", x: -450, y: -250, z: 400, rx: 8, ry: -0, rz: 0 },
	{ id: 2, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", x: 380, y: -120, z: 150, rx: -6, ry: 0, rz: -0 },
	{ id: 3, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", x: -250, y: 180, z: -100, rx: 12, ry: -0, rz: 0 },
	{ id: 4, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", x: 400, y: 220, z: -350, rx: -8, ry: 0, rz: -0 },
	{ id: 5, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", x: 40, y: -340, z: 600, rx: 10, ry: 0, rz: 0 },
	{ id: 6, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", x: -520, y: 320, z: -550, rx: -10, ry: -0, rz: 0 },
];