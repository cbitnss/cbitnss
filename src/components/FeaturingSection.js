"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const featuredEvents = [
	{
		id: "1",
		title: "Arangetra",
		imageUrl: "/arang1.jpg",
	},
	{
		id: "2",
		title: "NSS Summit",
		imageUrl: "/sum1.jpg",
	},
	{
		id: "3",
		title: "Strength in Solidarity",
		imageUrl: "/sis1.JPG",
	},
	{
		id: "5",
		title: "Be My Santa",
		imageUrl: "/santa1.jpg",
	},
	{
		id: "7",
		title: "Blood Donation",
		imageUrl: "/bd1.jpg",
	},
];

const useIntersectionObserver = (options) => {
	const [entry, setEntry] = useState(null);
	const [node, setNode] = useState(null);
	const observer = useRef(null);

	useEffect(() => {
		if (observer.current) observer.current.disconnect();
		observer.current = new window.IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setEntry(entry);
				}
			},
			options
		);
		const { current: currentObserver } = observer;
		if (node) currentObserver.observe(node);
		return () => currentObserver.disconnect();
	}, [node, options]);

	return [setNode, entry?.isIntersecting];
};

export default function FeaturingSection() {
	const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });

	return (
		<div ref={containerRef} className="w-full overflow-hidden">
			<h2
				className={`text-3xl md:text-5xl font-bold text-center mb-12 md:mb-20 transition-all duration-1000 ${
					isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
				}`}
			>
				Our Journey So Far
			</h2>
			<div className="flex overflow-x-auto space-x-8 pb-8 px-8 md:px-16 scrollbar-hide">
				{featuredEvents.map((event, index) => (
					<div
						key={index}
						className="group relative flex-shrink-0 w-80 h-96 overflow-hidden rounded-lg shadow-lg"
						style={{
							opacity: 0,
							animation: isVisible
								? `slide-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s forwards`
								: "none",
						}}
					>
						<Image
							src={event.imageUrl}
							alt={event.title}
							fill
							className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
						<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
							<a
								href={`/events#${event.id}`}
								className="text-xl font-bold flex items-center"
							>
								{event.title}
								<span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
									→
								</span>
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

