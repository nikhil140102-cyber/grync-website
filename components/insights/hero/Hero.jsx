"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./InsightsHero.module.css";

const InsightsHero = () => {
	const rootRef = useRef(null);
	const imageRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: "power3.out" },
			});

			tl.from(`.${styles.eyebrow}`, { y: 18, opacity: 0, duration: 0.55 })
				.from(
					`.${styles.heading}`,
					{ y: 30, opacity: 0, duration: 0.65 },
					"-=0.25"
				)
				.from(
					`.${styles.description}`,
					{ y: 16, opacity: 0, duration: 0.5 },
					"-=0.3"
				)
				.from(
					imageRef.current,
					{ x: 60, opacity: 0, scale: 0.95, duration: 0.9 },
					"-=0.4"
				);
		}, rootRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={rootRef} className={styles.hero}>
			<div className={styles.container}>
				{/* ================= LEFT ================= */}
				<div className={styles.left}>
					<div className={styles.eyebrow}>INSIGHTS</div>

					<h1 className={styles.heading}>
						Insights worth <span className={styles.redText}>acting on</span>
					</h1>

					<p className={styles.description}>
						Short reads on why the moment gets missed, what it costs,
						and what closing the gap is worth
					</p>
				</div>

				{/* ================= RIGHT ================= */}
				{/* single combined image — photo + decorative shapes are
				    already composited into one exported asset, same
				    pattern used for the Contact Us and About Us heroes */}
				<div className={styles.right}>
					<img
						ref={imageRef}
						src="/images/insights/hero-visual.png"
						alt="grync.io insights"
						className={styles.heroImage}
					/>
				</div>
			</div>
		</section>
	);
};

export default InsightsHero;