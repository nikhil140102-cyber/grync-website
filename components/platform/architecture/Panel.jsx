"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import styles from "./Panel.module.css";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

/* Each tab is a genuinely different diagram, taken from the reference
   screenshots — not the same shape re-labeled. Only "core" carries the
   "what makes it different" comparison grid + the 3 bottom cards.
   Every diagram is now a single exported image (p1–p5), same "one
   image per tab" pattern used on the Solution page's tab diagrams. */
export const panelContent = {
	core: {
		headingPlain: "Connect the signals. See the moment. ",
		headingHighlight: "Take the action.",
		subtextPink:
			"The heart of grync.io is one capability the rest of your stack does not have, it sees across every system at once, and it acts.",
		subtextGray:
			"Sees every system at once · Spots the pattern none could see alone · Does the task, not just flags it",
		/* exported diagram image — includes its own "not just the pattern…"
		   callout baked into the bottom of the image */
		diagramImage: "/images/platform/p1.png",
		compare: {
			heading: "What makes the core different:",
			left: {
				title: "Most tools",
				items: [
					"See one system",
					"Show you what happened",
					"Wait for someone to open them",
					"Report the problem",
					"Hand your team another task",
				],
			},
			right: {
				title: "grync.io",
				items: [
					"Sees across all of them at once",
					"Recognizes what is happening now",
					"Acts without being opened",
					"Runs the response. Notify, assign, approve, write back",
					"Does the task itself, inside your rules",
				],
			},
		},
		bottomCards: [
			{
				title: "Connects",
				text: "Reads from the systems you already run, read-only, no migration, no new pipelines.",
			},
			{
				title: "Correlates",
				text: "Joins signals across systems continuously, so a pattern is caught the moment it completes, not on a batch schedule.",
			},
			{
				title: "Acts",
				text: "Doesn’t hand your team a task to remember; it does the task. Notifies, assigns, routes for approval, launches workflows, triggers campaigns and writes back, all inside the rules you define.",
			},
		],
		closingBold: "One layer that doesn’t just see what nothing else could",
		closingRed: "; it does what nothing else would.",
	},

	"video-audio": {
		headingPlain: "Your conversations are ",
		headingHighlight: "signals too",
		subtextPink:
			"The moments that matter don’t only live in your systems. They happen on calls, in meetings and in demos. grync.io turns those conversations into signals the engine can act on.",
		subtextGray:
			"Listens to calls, demos, meetings · Pulls out what matters · Feeds the same engine · A spoken signal acts like a system one",
		diagramImage: "/images/platform/p5.png",
		closingBold: "What gets said on the call now acts like every other ",
		closingRed: "signal, caught, understood, and acted on.",
	},

	"ai-engine": {
		headingPlain: "The part that decides ",
		headingHighlight: "what actually matters.",
		subtextPink:
			"Connecting signals is only half the job. The intelligence engine is what separates the moment worth acting on from the noise, and works out exactly what to do about it.",
		subtextGray:
			"Reads every signal - structured or unstructured, then asks what a good analyst would -<br> Is this real? · What caused it? · Who owns it? · How long is the window?",
		diagramImage: "/images/platform/p2.png",
		worksOut: {
			heading: "What the engine works out:",
			items: [
				{
					title: "1. Is this worth acting on?",
					text: "Filters a real pattern from noise so each alert is worth acting on instead of clearing every notification.",
				},
				{
					title: "2. What caused it?",
					text: "Identifies the root signal behind the symptom, not just the symptom itself.",
				},
				{
					title: "3. Who owns it?",
					text: "Routes the moment to the right person or team automatically.",
				},
				{
					title: "4. How long is the window?",
					text: "Calculates how much time is left to act, so the right response happens in time.",
				},
			],
		},
		closingNote:
			"The engine is agentic by design: it watches, decides and acts, rather than surfacing insights on a dashboard and waiting for someone to notice.",
		closingBold: "The difference between more ",
		closingRed: "alerts and the right action.",
	},

	"revenue-signals": {
		headingPlain: "The moments that move revenue, ",
		headingHighlight: "caught while the window is open",
		subtextPink:
			"Some signals mean revenue, and some quietly drain it. grync.io surfaces both, a customer ready to grow, an account ready to churn, and the broken process bleeding margin behind the scenes, and acts on them the same day.",
		subtextGray:
			"Usage climbing · The right people engaging · A process breaking mid-flow → Acted on while it still moves revenue",
		diagramImage: "/images/platform/p4.png",
		table: {
			heading: "The revenue moments it catches:",
			rows: [
				{
					moment: "Ready to buy",
					action:
						"Signals confirm intent. The offer fires the same day, to that customer, with the reason attached.",
				},
				{
					moment: "Ready to expand",
					action:
						"Usage and engagement cross the line. The account is flagged, and the owner is briefed to act.",
				},
				{
					moment: "About to slip",
					action:
						"Early churn cues appear. The owner is alerted before the renewal, not after the loss.",
				},
				{
					moment: "A process breaks mid-flow",
					action:
						"The broken step is caught and reassigned to an owner before it stalls revenue.",
				},
				{
					moment: "An approval stuck in the queue",
					action:
						"Routed for approval automatically, so the deal doesn’t sit waiting.",
				},
				{
					moment: "A manual step delaying response",
					action:
						"Flagged to the owner before the delay costs you the conversion.",
				},
			],
		},
		closingBold: "The revenue was already in your data. ",
		closingRed: "This is the layer that collects both.",
		closingSub: "The deals you’d have won and the margin you’d have lost.",
	},

	automation: {
		headingPlain: "Where the signal becomes ",
		headingHighlight: "the action",
		subtextPink:
			"Detecting a moment is nothing without a response. This is the part of grync.io that does the acting, and it lives inside the rules you set.",
		subtextGray:
			"Does the task, not a reminder · Assigns, approves or escalates · You choose what’s automatic · Nothing runs outside your limits",
		diagramImage: "/images/platform/p3.png",
		actions: {
			heading: "The five actions it can take:",
			/* each action carries its own accent color + icon image,
			   matching the reference (a distinct colored icon per card so
			   all 5 read as different actions, not 5 copies of one card) */
			items: [
				{
					title: "Notify",
					text: "The right owner gets a short brief, where they already work, not another dashboard to log into.",
					accent: "#f4602a",
					icon: "/images/platform/c1.png",
				},
				{
					title: "Assign, approve or escalate",
					text: "The task is assigned to an owner, held for approval where you want a human first, or escalated when it can’t wait.",
					accent: "#3b82f6",
					icon: "/images/platform/c2.png",
				},
				{
					title: "Launch workflow",
					text: "A multi-step process kicks off automatically; no one starts it by hand.",
					accent: "#17a463",
					icon: "/images/platform/c3.png",
				},
				{
					title: "Trigger workflow/campaign",
					text: "The right message goes to the right customer, on the right channel, while the moment is live.",
					accent: "#d6266f",
					icon: "/images/platform/c4.png",
				},
				{
					title: "Write back & close",
					text: "The outcome is written back into your systems, and the task is closed. Your records stay current, with nothing left open.",
					accent: "#e4e6eb",
					icon: "/images/platform/c5.png",
				},
			],
		},
		control: {
			heading: "You stay in control:",
			text: "You set the boundaries. Which actions run automatically, which need approval, who gets notified and what is off-limits entirely. Every action is logged and auditable.",
		},
		closingBold: "Automation that acts like your best operator. ",
		closingRed: "Fast, accountable, and inside the lines.",
	},
};

const Panel = ({ activeId }) => {
	const panelRef = useRef(null);
	const hasEnteredRef = useRef(false);
	const data = panelContent[activeId] || panelContent.core;

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: "power3.out" },
				scrollTrigger: {
					trigger: panelRef.current,
					start: "top 80%",
					once: true,
				},
				onComplete: () => {
					hasEnteredRef.current = true;
				},
			});

			tl.from(`.${styles.introHeading}`, { y: 20, opacity: 0, duration: 0.6 })
				.from(
					`.${styles.introSubPink}`,
					{ y: 14, opacity: 0, duration: 0.45 },
					"-=0.3"
				)
				.from(
					`.${styles.introSubGray}`,
					{ y: 14, opacity: 0, duration: 0.45 },
					"-=0.3"
				)
				.from(
					`.${styles.diagramImage}`,
					{ y: 30, opacity: 0, duration: 0.6 },
					"-=0.2"
				);
		}, panelRef);

		return () => ctx.revert();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!hasEnteredRef.current || !panelRef.current) return;
		gsap.fromTo(
			panelRef.current,
			{ opacity: 0, y: 12 },
			{ opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
		);
	}, [activeId]);

	return (
		<div ref={panelRef} className={styles.panel}>
			{/* ================= INTRO ================= */}
			<h3 className={styles.introHeading}>
				{data.headingPlain}
				<span className={styles.orangeText}>{data.headingHighlight}</span>
			</h3>
			<p className={styles.introSubPink}>{data.subtextPink}</p>
			<p
				className={styles.introSubGray}
				dangerouslySetInnerHTML={{ __html: data.subtextGray }}
			/>

			{/* ================= CORE ================= */}
			{activeId === "core" && (
				<>
					<img
						src={data.diagramImage}
						alt="Each tool sees one slice — grync.io joins them and acts"
						className={styles.diagramImage}
					/>

					<h3 className={styles.compareHeading}>{data.compare.heading}</h3>
					<div className={styles.compareGrid}>
						<div className={`${styles.compareCard} ${styles.compareCardMuted}`}>
							<h4 className={styles.compareCardTitle}>
								{data.compare.left.title}
							</h4>
							<ul className={styles.compareList}>
								{data.compare.left.items.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</ul>
						</div>
						<div className={`${styles.compareCard} ${styles.compareCardPink}`}>
							<h4 className={styles.compareCardTitle}>
								{data.compare.right.title}
							</h4>
							<ul className={styles.compareList}>
								{data.compare.right.items.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</ul>
						</div>
					</div>

					<div className={styles.bottomGrid}>
						{data.bottomCards.map((c) => (
							<div key={c.title} className={styles.bottomCard}>
								<h4 className={styles.bottomCardTitle}>{c.title}</h4>
								<p className={styles.bottomCardText}>{c.text}</p>
							</div>
						))}
					</div>

					<div className={styles.closingCallout}>
						<p>
							<strong>{data.closingBold}</strong>
							<span className={styles.calloutRed}>{data.closingRed}</span>
						</p>
						<span className={styles.calloutStar}>
							<Star size={18} fill="#f4a83a" strokeWidth={0} />
						</span>
					</div>
				</>
			)}

			{/* ================= VIDEO / AUDIO ================= */}
			{activeId === "video-audio" && (
				<>
					<img
						src={data.diagramImage}
						alt="A conversation turns into a readiness cue, a risk cue, a request or a hand-off"
						className={styles.diagramImage}
					/>

					<div className={styles.diagramCallout}>
						<p>
							<strong>{data.closingBold}</strong>
							<span className={styles.calloutRed}>{data.closingRed}</span>
						</p>
						<span className={styles.calloutStar}>
							<Star size={16} fill="#f4a83a" strokeWidth={0} />
						</span>
					</div>
				</>
			)}

			{/* ================= AI ENGINE ================= */}
			{activeId === "ai-engine" && (
				<>
					<img
						src={data.diagramImage}
						alt="The engine decides whether and how to act on a signal"
						className={styles.diagramImage}
					/>

					<h3 className={styles.compareHeading}>{data.worksOut.heading}</h3>
					<div className={styles.worksOutGrid}>
						{data.worksOut.items.map((item) => (
							<div key={item.title} className={styles.worksOutCard}>
								<strong className={styles.worksOutTitle}>{item.title}</strong>
								<p className={styles.worksOutText}>{item.text}</p>
							</div>
						))}
					</div>

					<p className={styles.closingNote}>{data.closingNote}</p>

					<div className={styles.diagramCallout}>
						<p>
							<strong>{data.closingBold}</strong>
							<span className={styles.calloutRed}>{data.closingRed}</span>
						</p>
						<span className={styles.calloutStar}>
							<Star size={16} fill="#f4a83a" strokeWidth={0} />
						</span>
					</div>
				</>
			)}

			{/* ================= REVENUE SIGNALS ================= */}
			{activeId === "revenue-signals" && (
				<>
					<img
						src={data.diagramImage}
						alt="grync.io connects revenue signals and fires the right play"
						className={styles.diagramImage}
					/>

					<h3 className={styles.compareHeading}>{data.table.heading}</h3>
					<div className={styles.tableCard}>
						<div className={styles.tableHeaderRow}>
							<span className="tablehead1">The moment</span>
							<span>What grync.io does</span>
						</div>
						{data.table.rows.map((row, i) => (
							<div key={i} className={styles.tableRow}>
								<span className={styles.tableMoment}>{row.moment}</span>
								<span className={styles.tableAction}>{row.action}</span>
							</div>
						))}
					</div>

					<div className={styles.diagramCallout}>
						<p>
							<strong>{data.closingBold}</strong>
							{data.closingSub && (
								<>
									<br />
									<strong>{data.closingSub} </strong>
								</>
							)}
							<span className={styles.calloutRed}>{data.closingRed}</span>
						</p>
						<span className={styles.calloutStar}>
							<Star size={16} fill="#f4a83a" strokeWidth={0} />
						</span>
					</div>
				</>
			)}

			{/* ================= AUTOMATION ================= */}
			{activeId === "automation" && (
				<>
					<img
						src={data.diagramImage}
						alt="The workflow layer carries out the moment — automatically or with approval"
						className={styles.diagramImage}
					/>

					<h3 className={styles.compareHeading}>{data.actions.heading}</h3>
					<div className={styles.actionsGrid}>
						{data.actions.items.map((a) => (
							<div
								key={a.title}
								className={styles.actionCard}
								style={{ "--accent": a.accent }}
							>
								<img src={a.icon} alt="" className={styles.actionIcon} />
								<strong className={styles.actionCardTitle}>{a.title}</strong>
								<p className={styles.actionCardText}>{a.text}</p>
							</div>
						))}
					</div>

					<div className={styles.controlCard}>
						<h4 className={styles.controlHeading}>{data.control.heading}</h4>
						<p className={styles.controlText}>{data.control.text}</p>
					</div>

					<div className={styles.diagramCallout}>
						<p>
							<strong>{data.closingBold}</strong>
							<span className={styles.calloutRed}>{data.closingRed}</span>
						</p>
						<span className={styles.calloutStar}>
							<Star size={16} fill="#f4a83a" strokeWidth={0} />
						</span>
					</div>
				</>
			)}
		</div>
	);
};

export default Panel;