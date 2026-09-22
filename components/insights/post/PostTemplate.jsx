"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./PostTemplate.module.css";

const PostTemplate = ({ post, prevPost, nextPost }) => {
	const rootRef = useRef(null);
	const hasSections = Array.isArray(post.sections) && post.sections.length > 0;
	const [activeSectionId, setActiveSectionId] = useState(
		hasSections ? post.sections[0].id : null
	);

	/* real scroll-spy — tracks which section is actually in view and
	   highlights that TOC entry, instead of always highlighting the
	   first item regardless of scroll position */
	useEffect(() => {
		if (!hasSections) return;

		const sectionEls = post.sections
			.map((s) => document.getElementById(s.id))
			.filter(Boolean);

		if (sectionEls.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSectionId(entry.target.id);
					}
				});
			},
			{
				// a section counts as "current" once it crosses just
				// below the sticky header, and stops counting once it's
				// past the upper ~70% of the viewport
				rootMargin: "-110px 0px -70% 0px",
				threshold: 0,
			}
		);

		sectionEls.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasSections]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(`.${styles.featureImage}`, {
				y: 20,
				opacity: 0,
				scale: 0.98,
				duration: 0.7,
				ease: "power3.out",
			});
		}, rootRef);

		return () => ctx.revert();
	}, []);

	const renderBlock = (block, i) => {
		switch (block.type) {
			case "paragraph":
				return (
					<p key={i} className={styles.paragraph}>
						{block.text}
					</p>
				);

			case "subheading":
				return (
					<h3 key={i} className={styles.subheading}>
						{block.text}
					</h3>
				);

			case "quote":
				return (
					<blockquote key={i} className={styles.quote}>
						<p>&quot;{block.text}&quot;</p>
						{block.attribution && <cite>{block.attribution}</cite>}
					</blockquote>
				);

			case "highlight":
				return (
					<p key={i} className={styles.highlight}>
						{block.text}
					</p>
				);

			case "list":
				return (
					<ul key={i} className={styles.list}>
						{block.items.map((item, j) => (
							<li key={j}>{item}</li>
						))}
					</ul>
				);

			case "table":
				return (
					<div key={i} className={styles.tableWrap}>
						<table className={styles.contentTable}>
							<thead>
								<tr>
									{block.headers.map((h, j) => (
										<th key={j}>{h}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{block.rows.map((row, r) => (
									<tr key={r}>
										{row.map((cell, c) => (
											<td key={c}>{cell}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				);

			case "callouts":
				return (
					<div key={i} className={styles.calloutGrid}>
						{block.items.map((item, j) => (
							<div key={j} className={styles.calloutCard}>
								<strong>{item.title}</strong>
								<span>{item.text}</span>
							</div>
						))}
					</div>
				);

			case "faq":
				return (
					<div key={i} className={styles.faqList}>
						{block.items.map((item, j) => (
							<div key={j} className={styles.faqItem}>
								<strong>{item.question}</strong>
								<p>{item.answer}</p>
							</div>
						))}
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<article ref={rootRef} className={styles.article}>
			{/* ================= HEADER: feature image only ================= */}
			<header className={styles.header}>
				<img
					src={post.image}
					alt={post.title}
					className={styles.featureImage}
				/>
			</header>

			<div className={styles.headerDivider} />

			{/* ================= BODY: sidebar TOC + main content ================= */}
			<div className={styles.bodyLayout}>
				{hasSections ? (
					<>
						{/* sidebar — sticky, scrolls alongside the article */}
						<aside className={styles.sidebar}>
							<nav className={styles.toc}>
								<span className={styles.tocLabel}>IN THIS ARTICLE</span>
								<ol className={styles.tocList}>
									{post.sections.map((s, i) => (
										<li key={s.id}>
											<a
												href={`#${s.id}`}
												className={`${styles.tocLink} ${
													s.id === activeSectionId
														? styles.tocLinkActive
														: ""
												}`}
											>
												{i + 1}. {s.heading}
											</a>
										</li>
									))}
								</ol>
							</nav>
						</aside>

						<div className={styles.mainContent}>
							{post.sections.map((section) => (
								<section
									key={section.id}
									id={section.id}
									className={styles.section}
								>
									<h2 className={styles.sectionHeading}>
										{section.heading}
									</h2>

									{section.blocks.map((block, i) =>
										renderBlock(block, i)
									)}
								</section>
							))}
						</div>
					</>
				) : (
					<p className={styles.comingSoon}>
						Full article content coming soon.
					</p>
				)}
			</div>

			{/* ================= PREV / NEXT ================= */}
			<div className={styles.postNav}>
				{prevPost ? (
					<Link
						href={`/insights/${prevPost.slug}`}
						className={styles.navLink}
					>
						Previous article
					</Link>
				) : (
					<span />
				)}

				{nextPost ? (
					<Link
						href={`/insights/${nextPost.slug}`}
						className={`${styles.navLink} ${styles.navLinkNext}`}
					>
						Next article
					</Link>
				) : (
					<span />
				)}
			</div>
		</article>
	);
};

export default PostTemplate;