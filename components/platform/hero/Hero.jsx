"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./PlatformHero.module.css";

const badges = ["No migration", "No data leaks", "Works with your stack"];

const PlatformHero = () => {
	const rootRef = useRef(null);
	const imageRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: "power3.out" },
			});

			tl.from(`.${styles.eyebrow}`, { y: 18, opacity: 0, duration: 0.55 })
				.from(
					`.${styles.headingLine}`,
					{ y: 40, opacity: 0, duration: 0.7, stagger: 0.1 },
					"-=0.25"
				)
				.from(
					`.${styles.badge}`,
					{ y: 14, opacity: 0, duration: 0.4, stagger: 0.08 },
					"-=0.3"
				)
				.from(
					`.${styles.description}`,
					{ y: 18, opacity: 0, duration: 0.55 },
					"-=0.3"
				)
				.from(
					`.${styles.ctaButton}`,
					{ y: 14, opacity: 0, duration: 0.5 },
					"-=0.3"
				)
				.from(
					imageRef.current,
					{ x: 70, opacity: 0, scale: 0.94, duration: 0.9 },
					"-=0.5"
				);
		}, rootRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={rootRef} className={styles.hero}>
			<div className={styles.container}>
				{/* ================= LEFT ================= */}
				<div className={styles.left}>
					<div className={styles.eyebrow}>PLATFORM</div>

					<h1 className={styles.heading}>
						<span className={styles.headingLine}>
							<span className={styles.orangeText}>The business signal</span>
						</span>
						<span className={styles.headingLine}>
							<span className={styles.redText}>execution layer</span> that
							sits on
						</span>
						<span className={styles.headingLine}>
							top of everything you run
						</span>
					</h1>

					<div className={styles.badgeRow}>
						{badges.map((b) => (
							<span key={b} className={styles.badge}>
								{b}
							</span>
						))}
					</div>

					<p className={styles.description}>
						grync.io connects the signals already moving through your
						systems, works out which moments matter, and takes the action
						automatically, inside the limits you set.
					</p>

					<Link href="https://bookings.cloud.microsoft/bookwithme/user/a6861de85f98441aaa5e5134a58b87a3%40grync.io/meetingtype/wDeA_LiHpEK46Qmt7Mn2FA2?anonymous&ismsaljsauthenabled" className={styles.ctaButton}>
						Book a demo <span>→</span>
					</Link>
				</div>

				{/* ================= RIGHT ================= */}
				{/* single combined image — the "executive view" dashboard
				    mockup shown in the reference is one exported asset,
				    same pattern used for the About Us / Contact hero */}
				<div className={styles.right}>
					<img
						ref={imageRef}
						src="/images/platform/hero-visual.png"
						alt="grync.io executive view showing open windows, actions fired, and revenue at risk"
						className={styles.heroImage}
					/>
				</div>
			</div>
		</section>
	);
};

export default PlatformHero;