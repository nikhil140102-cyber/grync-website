"use client";

import Link from "next/link";
import styles from "./InsightsListing.module.css";

const ArticleGrid = ({ posts, totalCount }) => {
	return (
		<div className={styles.gridSection}>
			<div className={styles.gridHeader}>
				<h3 className={styles.gridHeading}>All Perspectives</h3>
				<span className={styles.gridCount}>
					Showing {totalCount} article{totalCount === 1 ? "" : "s"}
				</span>
			</div>

			{posts.length === 0 ? (
				<p className={styles.emptyState}>No articles in this category yet.</p>
			) : (
				<div className={styles.grid}>
					{posts.map((post) => (
						<article key={post.slug} className={styles.card}>
							<img
								src={post.image}
								alt={post.title}
								className={styles.cardImage}
							/>

							<div className={styles.cardMeta}>
								<span className={styles.categoryTag}>
									{post.category}
								</span>
								<span className={styles.readTime}>{post.readTime}</span>
							</div>

							<h4 className={styles.cardTitle}>{post.title}</h4>

							<p className={styles.cardExcerpt}>{post.excerpt}</p>

							<div className={styles.cardFooter}>
								<span className={styles.cardDate}>{post.date}</span>
								<Link
									href={`/insights/${post.slug}`}
									className={styles.readLink}
								>
									Read Article <span>→</span>
								</Link>
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	);
};

export default ArticleGrid;