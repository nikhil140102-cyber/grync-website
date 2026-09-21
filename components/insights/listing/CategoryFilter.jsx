"use client";

import styles from "./InsightsListing.module.css";

const CategoryFilter = ({ categories, activeCategory, onChange }) => {
	return (
		<nav className={styles.filterRow}>
			{categories.map((c) => (
				<button
					key={c.slug}
					type="button"
					onClick={() => onChange(c.slug)}
					className={`${styles.filterPill} ${
						c.slug === activeCategory ? styles.filterPillActive : ""
					}`}
				>
					{c.label}
				</button>
			))}
		</nav>
	);
};

export default CategoryFilter;