import Header from "@/components/home/home-seven/header/one-page";
import Footer from "@/components/home/home-seven/footer";

export const metadata = {
	title: "Insights | Grync.io",
	description:
		"Short reads on why the moment gets missed, what it costs, and what closing the gap is worth.",
};

function InsightsLayout({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}

export default InsightsLayout;