import InsightsHero from "@/components/insights/hero/Hero";
import InsightsListing from "@/components/insights/listing";
// import NewsletterCta from "@/components/insights/Newslettercta/Newslettercta";
import FinalCta from "@/components/solution/FinalCta";

// TODO: add the post listing grid component here once it's built
function Insights() {
	return (
		<>
			<InsightsHero />
            <InsightsListing/>
            {/* <NewsletterCta/> */}
			<FinalCta/>
		</>
	);
}

export default Insights;