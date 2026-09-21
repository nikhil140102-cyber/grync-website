import { notFound } from "next/navigation";
import { posts } from "@/data/insights";
import PostTemplate from "@/components/insights/post/PostTemplate";

export function generateStaticParams() {
	return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
	const post = posts.find((p) => p.slug === params.slug);
	if (!post) return {};
	return {
		title: `${post.title} | Grync.io Insights`,
		description: post.excerpt,
	};
}

function InsightPost({ params }) {
	const index = posts.findIndex((p) => p.slug === params.slug);
	if (index === -1) notFound();

	const post = posts[index];
	const prevPost = index > 0 ? posts[index - 1] : null;
	const nextPost = index < posts.length - 1 ? posts[index + 1] : null;

	return <PostTemplate post={post} prevPost={prevPost} nextPost={nextPost} />;
}

export default InsightPost;