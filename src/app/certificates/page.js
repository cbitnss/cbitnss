import React from "react";
import App from "@/components/Navbar";

const certificatesData = [
	{
		name: "Village Camp",
		poster: "/vcamp1.jpg",
		driveLink:
			"https://drive.google.com/drive/folders/1tHAFFCZOrYf8PLIx1ghGxaDMM-mMScDU?usp=sharing",
	},
	{
		name: "YUVA",
		poster: "/yuva1.jpg",
		driveLink:
			"https://drive.google.com/drive/folders/1_nrtAadXdIIVKLdZTaX_Z2_R7kbTIepE",
	},
];

export default function CertificatesPage() {
	return (
		<div>
			<App />
			<main className="container mx-auto px-4 py-8 mt-20">
				<h1 className="text-3xl font-bold mb-8 text-center">
					Collect your certificates here
				</h1>
				{certificatesData.map((event, idx) => (
					<section
						key={event.name}
						className="event-card-section fade-in-up mb-8"
						style={{ animationDelay: `${idx * 0.12}s` }}
					>
						<h2 className="text-2xl font-semibold mb-2 text-center">
							{event.name}
						</h2>
						<div className="flex flex-col items-center mb-2">
							<img
								src={event.poster}
								alt={event.name + " poster"}
								style={{
									maxWidth: 300,
									borderRadius: "1rem",
								}}
							/>
						</div>
						<div className="text-center">
							<a
								href={event.driveLink}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 underline font-medium"
							>
								Certificate Drive Link
							</a>
						</div>
					</section>
				))}
			</main>
		</div>
	);
}
