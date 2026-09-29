import Header from "@/components/home/home-seven/header/one-page";
import Footer from "@/components/home/home-seven/footer";

export const metadata = {
	title: "Platform | Grync.io",
	description:
		"The business signal execution layer that sits on top of everything you run. grync.io connects the signals already moving through your systems and takes action automatically.",
};

function PlatformLayout({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}

export default PlatformLayout;