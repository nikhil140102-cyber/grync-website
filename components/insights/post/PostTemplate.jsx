"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./PostTemplate.module.css";

const PostTemplate = ({ post, prevPost, nextPost }) => {
	const rootRef = useRef(null);
	const hasSections = Array.isArray(post.sections) && post.sections.length > 0;

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

			tl.from(`.${styles.headerMeta}`, { y: 14, opacity: 0, duration: 0.5 })
				.from(
					`.${styles.title}`,
					{ y: 24, opacity: 0, duration: 0.6 },
					"-=0.25"
				)
				.from(
					`.${styles.excerpt}`,
					{ y: 14, opacity: 0, duration: 0.5 },
					"-=0.3"
				)
				.from(
					`.${styles.authorRow}`,
					{ opacity: 0, duration: 0.4 },
					"-=0.2"
				);
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
			{/* ================= HEADER ================= */}
			<header className={styles.header}>
				<div className={styles.headerMeta}>
					<span className={styles.categoryTag}>{post.category}</span>
					<span className={styles.metaSep}>&middot; {post.readTime}</span>
				</div>

				<h1 className={styles.title}>{post.title}</h1>

				<p className={styles.excerpt}>{post.excerpt}</p>

				{post.author && (
					<div className={styles.authorRow}>
						<img
							src={post.author.avatar}
							alt={post.author.name}
							className={styles.authorAvatar}
						/>
						<strong>{post.author.name}</strong>
						<span className={styles.metaSep}>
							&middot; {post.author.publishedDate}
						</span>
					</div>
				)}
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
											<a href={`#${s.id}`} className={styles.tocLink}>
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