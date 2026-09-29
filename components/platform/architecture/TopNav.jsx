"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TopNav.module.css";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

/* Three icon states per item — default, hover, and active — swapped via
   CSS opacity (same technique as the Solution page's StickySubNav), so
   hovering doesn't trigger a re-render. Swap these placeholder paths
   for your real exported icons; point all three at the same file if
   you only have one for now. */
export const navItems = [
	{
		id: "core",
		label: "Core Competency",
		icon: "/images/platform/1.png",
		iconHover: "/images/platform/11.png",
		iconActive: "/images/platform/11.png",
	},
	{
		id: "ai-engine",
		label: "AI Intelligence Engine",
		icon: "/images/platform/2.png",
		iconHover: "/images/platform/22.png",
		iconActive: "/images/platform/22.png",
	},
	{
		id: "automation",
		label: "Automation & Workflows",
		icon: "/images/platform/3.png",
		iconHover: "/images/platform/33.png",
		iconActive: "/images/platform/33.png",
	},
	{
		id: "revenue-signals",
		label: "Revenue Signals",
		icon: "/images/platform/4.png",
		iconHover: "/images/platform/44.png",
		iconActive: "/images/platform/44.png",
	},
	{
		id: "video-audio",
		label: "Video/audio analysis",
		icon: "/images/platform/5.png",
		iconHover: "/images/platform/55.png",
		iconActive: "/images/platform/55.png",
	},
];

const TopNav = ({ activeId, onChange }) => {
	const rootRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(`.${styles.navItem}`, {
				y: 14,
				opacity: 0,
				duration: 0.5,
				stagger: 0.07,
				ease: "back.out(1.7)",
				scrollTrigger: {
					trigger: rootRef.current,
					start: "top 85%",
					once: true,
				},
			});
		}, rootRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={rootRef} className={styles.wrap}>
			<nav className={styles.navBar}>
				{navItems.map((item) => {
					const isActive = item.id === activeId;
					return (
						<button
							key={item.id}
							type="button"
							onClick={() => onChange(item.id)}
							className={`${styles.navItem} ${
								isActive ? styles.navItemActive : ""
							}`}
						>
							<span className={styles.iconStack}>
								<img
									src={item.icon}
									alt=""
									className={`${styles.navIcon} ${styles.iconDefault}`}
								/>
								<img
									src={item.iconHover}
									alt=""
									className={`${styles.navIcon} ${styles.iconHover}`}
								/>
								<img
									src={item.iconActive}
									alt=""
									className={`${styles.navIcon} ${styles.iconActiveImg}`}
								/>
							</span>
							<span className={styles.navLabel}>{item.label}</span>
						</button>
					);
				})}
			</nav>
		</div>
	);
};

export default TopNav;