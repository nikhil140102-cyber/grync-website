"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { AlertCircle } from "lucide-react";
import styles from "./NewsletterCta.module.css";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO: create a dedicated "newsletter signup" template in EmailJS
// (this one only needs an {{email}} variable, unlike the CTA form's
// template) and swap this placeholder in. The service ID can stay the
// same as the CTA form's — one connected Gmail account can send
// through multiple templates.
const EMAILJS_SERVICE_ID = "service_rkyf9cm";
const EMAILJS_NEWSLETTER_TEMPLATE_ID = "REPLACE_WITH_NEWSLETTER_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "1yfQ3FikQwRL2GUbo";

const NewsletterCta = () => {
	const rootRef = useRef(null);

	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [status, setStatus] = useState("idle"); // idle | submitting | success | error

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: "power3.out" },
				scrollTrigger: {
					trigger: rootRef.current,
					start: "top 80%",
					once: true,
				},
			});

			tl.from(`.${styles.eyebrow}`, { y: 16, opacity: 0, duration: 0.5 })
				.from(
					`.${styles.heading}`,
					{ y: 24, opacity: 0, duration: 0.6 },
					"-=0.25"
				)
				.from(
					`.${styles.description}`,
					{ y: 16, opacity: 0, duration: 0.5 },
					"-=0.35"
				)
				.from(
					`.${styles.card}`,
					{ x: 30, opacity: 0, duration: 0.6 },
					"-=0.4"
				);
		}, rootRef);

		return () => ctx.revert();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const trimmed = email.trim();
		if (!trimmed) {
			setError("Please enter your work email.");
			return;
		}
		if (!EMAIL_RE.test(trimmed)) {
			setError("Please enter a valid email address.");
			return;
		}

		setError("");
		setStatus("submitting");

		try {
			await emailjs.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_NEWSLETTER_TEMPLATE_ID,
				{ email: trimmed },
				{ publicKey: EMAILJS_PUBLIC_KEY }
			);

			setStatus("success");
			setEmail("");
		} catch (err) {
			console.error("Newsletter signup: EmailJS send failed:", err);
			setError("Something went wrong. Please try again.");
			setStatus("error");
		}
	};

	const isSubmitting = status === "submitting";

	return (
		<section ref={rootRef} className={styles.section}>
			<div className={styles.container}>
				{/* ================= LEFT ================= */}
				<div className={styles.left}>
					<div className={styles.eyebrow}>STAY INFORMED</div>

					<h2 className={styles.heading}>Get the signals that matter.</h2>

					<p className={styles.description}>
						Occasional insights on intelligence, revenue, operations, and
						the systems changing how businesses work.
					</p>
				</div>

				{/* ================= RIGHT: FORM CARD ================= */}
				<div className={styles.card}>
					{status === "success" ? (
						<div className={styles.successState}>
							<h3>You&apos;re subscribed</h3>
							<p>We&apos;ll send the next one straight to your inbox.</p>
						</div>
					) : (
						<form className={styles.form} onSubmit={handleSubmit} noValidate>
							<label htmlFor="newsletter-email">Work email</label>
							<input
								id="newsletter-email"
								type="email"
								placeholder="you@company.com"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									if (error) setError("");
								}}
								disabled={isSubmitting}
								className={error ? styles.inputError : ""}
							/>
							{error && (
								<span className={styles.errorText}>
									<AlertCircle size={13} />
									{error}
								</span>
							)}

							<button
								type="submit"
								className={styles.submitButton}
								disabled={isSubmitting}
							>
								{isSubmitting
									? "Subscribing\u2026"
									: "Subscribe to Grync Insights"}
							</button>
						</form>
					)}
				</div>
			</div>
		</section>
	);
};

export default NewsletterCta;