export type GalleryImage = {
    id: string;
    src: string;
    alt: string;
    tags: string[];
    date?: string;
};

export const galleryData: GalleryImage[] = [
    {
        id: "herzogstand-view",
        src: "https://images.unsplash.com/photo-1763032409368-d7e328013069?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2",
        alt: "Herzogstand view",
        tags: ["hike", "mountain"],
        date: "2025-09-21"
    },
    {
        id: "andechser-kloster-trail",
        src: "https://images.unsplash.com/photo-1763032122123-43f238df44f9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1",
        alt: "Andechser Kloster trail",
        tags: ["hike", "trail"],
        date: "2025-06-09"
    },
    {
        id: "jochberg-view-kochelsee",
        src: "https://images.unsplash.com/photo-1763036374984-347fc6404202?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=0",
        alt: "Jochberg view of Kochelsee",
        tags: ["hike", "mountain", "lake"],
        date: "2025-05-18"
    },
    {
        id: "porto-old-cityscape",
        src: "https://images.unsplash.com/photo-1763032568957-4092c85ae1b2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3",
        alt: "Porto old cityscape",
        tags: ["city", "porto"],
        date: "2025-03-15"
    },
    {
        id: "riederstein-winter-hike",
        src: "https://images.unsplash.com/photo-1763035344099-6634c9625ebf?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4",
        alt: "Winter hike in Riederstein",
        tags: ["hike", "winter"],
        date: "2025-01-04"
    },
    {
        id: "olympia-park-munich-night",
        src: "https://images.unsplash.com/photo-1763035510732-c6ea617393e3?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5",
        alt: "Olympia Park Munich at Night",
        tags: ["city", "munich", "night"],
        date: "2024-12-25"
    },
    {
        id: "hiking-gear-winter-tegernsee",
        src: "https://images.unsplash.com/photo-1763041066439-3c5c0a16f022?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6",
        alt: "Hiking Gear Winter Tegernsee",
        tags: ["hike", "gear", "winter"],
        date: "2024-11-23"
    }
];

// helper to get a slice of the gallery (latest first)
// now accepts optional tag to filter by before slicing
export const gallerySlice = (count = 6, tag?: string): GalleryImage[] => {
    const list = typeof tag === "string" && tag.length > 0
        ? galleryData.filter((img) => (img.tags || []).includes(tag))
        : galleryData;
    return list.slice(0, count);
};

// Helper to get gallery image src by ID
export const getGalleryImageById = (id: string): string | undefined => {
    return galleryData.find(img => img.id === id)?.src;
};