"use client";

interface BackgroundVideoProps {
	src: string;
	poster?: string;
	overlayClassName?: string;
	className?: string;
}

export default function BackgroundVideo({
	src,
	poster,
	overlayClassName = "bg-black/40",
	className = "",
}: BackgroundVideoProps) {
	return (
		<div
			className={`fixed inset-0 -z-10 h-screen w-screen overflow-hidden pointer-events-none ${className}`}
			aria-hidden="true"
		>
			<video
				src={src}
				poster={poster}
				autoPlay
				muted
				loop
				playsInline
				preload="auto"
				disablePictureInPicture
				controlsList="nodownload nofullscreen noremoteplayback"
				className="h-full w-full object-cover pointer-events-none select-none"
			/>
			{overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
		</div>
	);
}