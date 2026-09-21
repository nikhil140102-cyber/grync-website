"use client";

import { useState } from "react";
import { categories, posts } from "@/data/insights";
import CategoryFilter from "./CategoryFilter";
import FeaturedArticle from "./FeaturedArticle";
import ArticleGrid from "./ArticleGrid";
import styles from "./InsightsListing.module.css";

/* Owns the single shared "which category is active" state, so the
   filter pills, the featured article, and the grid below all stay in
   sync with each other. */
const InsightsListing = () => {
	const [activeCategory, setActiveCategory] = useState("all");

	const filtered =
		activeCategory === "all"
			? posts
			: posts.filter((p) => p.categorySlug === activeCategory);

	const featuredPost = filtered.find((p) => p.featured);
	const gridPosts = filtered.filter((p) => !p.featured);
	const totalCount = filtered.length;

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<CategoryFilter
					categories={categories}
					activeCategory={activeCategory}
					onChange={setActiveCategory}
				/>

				{featuredPost && <FeaturedArticle post={featuredPost} />}

				<ArticleGrid posts={gridPosts} totalCount={totalCount} />
			</div>
		</section>
	);
};

export default InsightsListing;