import Image from "next/image";
import Link from "next/link";
import { NavLink } from "../layout/textAnimations/wordRoll";

const footerLinks = {
	Solutions: [
		{ label: "Coaching & courses", href: "/solutions/coaching" },
		{ label: "Services", href: "/solutions/services" },
		{ label: "Physical products", href: "/solutions/products" },
		{ label: "Marketplaces", href: "/solutions/marketplaces" },
		{ label: "Gig economy", href: "/solutions/gig-economy" },
		{ label: "Paid groups", href: "/solutions/paid-groups" },
		{ label: "Software", href: "/solutions/software" },
		{ label: "Telehealth", href: "/solutions/telehealth" },
		{ label: "Events", href: "/solutions/events" },
	],
	Resources: [
		{ label: "Examples", href: "/examples" },
		{ label: "Docs", href: "/docs" },
		{ label: "Help", href: "/help" },
		{ label: "Bug bounty", href: "/bug-bounty" },
	],
	Company: [
		{ label: "Blog", href: "/blog" },
		{ label: "Careers", href: "/careers" },
		{ label: "Affiliates", href: "/affiliates" },
	],
	Social: [
		{ label: "X/Twitter", href: "https://x.com" },
		{ label: "Youtube", href: "https://youtube.com" },
		{ label: "Linkedin", href: "https://linkedin.com" },
	],
};

const legalLinks = [
	{ label: "Terms", href: "/terms" },
	{ label: "Privacy policy", href: "/privacy" },
];

export default function Footer() {
	return (
		<footer className="w-full bg-[#121212] dark:bg-[#d9d9d9] text-white dark:text-black rounded-t-[80px]">
			<div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
				<div className="flex items-start justify-between">
					<div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-4 sm:gap-x-16 lg:gap-x-25">
						{Object.entries(footerLinks).map(([section, links]) => (
							<div key={section} className="flex flex-col gap-4">
								<p className="text-sm font-semibold text-white dark:text-black">{section}</p>
								<div className="flex flex-col gap-3">
									{links.map((link) => (
										<Link
											key={link.label}
											href={link.href}
											className="text-sm text-white/60 transition-colors hover:text-primary dark:text-black/60 dark:hover:text-primary"
										>
											<NavLink text={link.label}/>
										</Link>
									))}
								</div>
							</div>
						))}
					</div>

					<Link href="/" aria-label="Home" className="shrink-0 pl-8">
						<Image 
						src="/logo/logo.png"
						height={50}
						width={50}
						alt="WHOP"
						/>
					</Link>
				</div>

				<div className="mt-16 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
					<p className="text-sm text-white/50 dark:text-black/50">
						© {new Date().getFullYear()} Whop Inc. All rights reserved.
					</p>

					<div className="flex gap-6">
						{legalLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className="text-sm text-white/60 dark:text-black/60 transition-colors hover:text-white dark:hover:text-black"
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
