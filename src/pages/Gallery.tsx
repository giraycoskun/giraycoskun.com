import { useState } from "react";

export const gallery_data = [
	{
		src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1",
		alt: "Mountain trail",
		tags: ["hike", "trail"],
	},
	{
		src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2",
		alt: "Summit view",
		tags: ["hike", "mountain"],
	},
	{
		src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3",
		alt: "Forest path",
		tags: ["hike", "trail"],
	},
	{
		src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4",
		alt: "Lake at dusk",
		tags: ["hike", "dusk"],
	},
	{
		src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5",
		alt: "Rocky ridge",
		tags: ["rock", "ridge"],
	},
	{
		src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6",
		alt: "Trail markers",
		tags: ["trail", "markers"],
	},
	{
		src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2",
		alt: "Summit view 2",
		tags: ["summit", "mountain"],
	},
	{
		src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3",
		alt: "Forest path 2",
		tags: ["forest"],
	},
	{
		src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4",
		alt: "Lake at dusk 2",
		tags: ["lake"],
	},
	{
		src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5",
		alt: "Rocky ridge 2",
		tags: ["rock"],
	},
	{
		src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6",
		alt: "Trail markers 2",
		tags: ["trail"],
	},
	// add more images here for the full gallery page
];

export function Gallery({
	sliceNumber,
	filterTag,
}: {
	sliceNumber?: number;
	filterTag?: string;
}) {
	const [lightbox, setLightbox] = useState<string | null>(null);

	// filter by tag when provided, otherwise use full dataset
	const filtered = filterTag
		? gallery_data.filter((g) => (g.tags || []).includes(filterTag))
		: gallery_data;

	const gallerySlice = filtered.slice(0, sliceNumber ?? filtered.length);

	return (
		<div className="container mx-auto px-6 py-12">
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[120px] md:auto-rows-[160px]">
				{gallerySlice.map((img, idx) => {
					const mosaic = [
						"col-span-2 md:col-span-2 md:row-span-2", // large hero tile
						"col-span-2 md:col-span-1",
						"col-span-1 md:col-span-1",
						"col-span-2 md:col-span-1",
						"col-span-1 md:col-span-1",
						"col-span-1 md:col-span-1",
					];
					const cls = mosaic[idx] ?? "col-span-1";
					return (
						<button
							key={img.src + idx}
							onClick={() => setLightbox(img.src)}
							className={`${cls} relative overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
							aria-label={`Open photo: ${img.alt}`}
						>
							<img
								src={img.src}
								alt={img.alt}
								className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition"
								loading="lazy"
							/>
						</button>
					);
				})}
			</div>

			{/* lightbox */}
			{lightbox && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
					role="dialog"
					aria-modal="true"
					aria-label="Image preview"
					onClick={() => setLightbox(null)}
				>
					<div className="relative max-w-[90vw] max-h-[90vh]">
						<img
							src={lightbox}
							alt="Selected"
							className="w-full h-auto rounded-lg shadow-lg"
						/>
						<button
							onClick={() => setLightbox(null)}
							className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full p-2 shadow focus:outline-none"
							aria-label="Close"
						>
							✕
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export function GalleryPage() {
	return (
		<main className="container mx-auto px-6 py-12">
			<header className="mb-6">
				<h1 className="text-3xl font-bold text-gray-800">Photo Gallery</h1>
				<p className="text-sm text-gray-600 mt-2">
					A curated collection of recent photos. Use filterTag prop to show a
					subset.
				</p>
			</header>

			<Gallery sliceNumber={gallery_data.length} />
		</main>
	);
}
