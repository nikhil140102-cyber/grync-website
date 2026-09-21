"use client";

import Link from "next/link";
import styles from "./InsightsListing.module.css";

const FeaturedArticle = ({ post }) => {
	return (
		<div className={styles.featuredCard}>
			<div className={styles.featuredImageWrap}>
				<img src={post.image} alt={post.title} className={styles.featuredImage} />
			</div>

			<div className={styles.featuredText}>
				<div className={styles.featuredMeta}>
					<span className={styles.categoryTag}>{post.category}</span>
					<span className={styles.metaSep}>
						{post.readTime} &middot; {post.date}
					</span>
				</div>

				<h2 className={styles.featuredTitle}>{post.title}</h2>

				<p className={styles.featuredExcerpt}>{post.excerpt}</p>

				<Link
					href={`/insights/${post.slug}`}
					className={styles.featuredButton}
				>
					Read Featured Article <span>→</span>
				</Link>
			</div>
		</div>
	);
};

export default FeaturedArticle;