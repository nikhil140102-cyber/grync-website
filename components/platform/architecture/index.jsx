"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TopNav, { navItems } from "./TopNav";
import Panel from "./Panel";
import styles from "./PlatformArchitecture.module.css";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

/* Same "one shared activeId owned by the parent" pattern used by the
   Solution page's tab section — the nav and the panel below it always
   stay in sync because they both read/write this single state. */
const PlatformArchitecture = () => {
	const [activeId, setActiveId] = useState(navItems[0].id);
	const rootRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: "power3.out" },
				scrollTrigger: {
					trigger: rootRef.current,
					start: "top 82%",
					once: true,
				},
			});

			tl.from(`.${styles.eyebrow}`, { y: 18, opacity: 0, duration: 0.5 })
				.from(
					`.${styles.heading}`,
					{ y: 26, opacity: 0, duration: 0.6 },
					"-=0.25"
				)
				.from(
					`.${styles.subheading}`,
					{ y: 16, opacity: 0, duration: 0.5 },
					"-=0.3"
				);
		}, rootRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={rootRef} className={styles.section}>
			<div className={styles.header}>
				<span className={styles.eyebrow}>PLATFORM ARCHITECTURE</span>
				<h2 className={styles.heading}>
					How the platform <span className={styles.redText}>fits together</span>
				</h2>
				<p className={styles.subheading}>
					Five parts, one flow. From raw signal to finished action:
				</p>
			</div>

			<div className={styles.container}>
				<TopNav activeId={activeId} onChange={setActiveId} />
				<Panel activeId={activeId} />
			</div>
		</section>
	);
};

export default PlatformArchitecture;