export type GalleryImage = {
    id: string;
    unsplashId: string;
    alt: string;
    tags: string[];
    date?: string;
};

export const galleryData: GalleryImage[] = [
    {
        id: "schellschlicht-mountain-trail",
        unsplashId: "1763469595015-2222aa32ea01",
        alt: "Schellschlicht Mountain Trail",
        tags: ["hike", "trail" ],
        date: "2025-10-15"
    },
    {
        id: "schellschlicht-ridge-trail",
        unsplashId: "1763469716176-94fa9eb2d252",
        alt: "Schellschlicht Ridge Trail",
        tags: ["hike", "trail" ],
        date: "2025-10-15"
    },
    {
        id: "schellschlicht-summit-view",
        unsplashId: "1763469762647-def023cb33d3",
        alt: "Schellschlicht Summit View",
        tags: ["hike", "summit" ],
        date: "2025-10-15"
    },
    {
        id: "herzogstand-view",
        unsplashId: "1763032409368-d7e328013069",
        alt: "Herzogstand view",
        tags: ["hike", "mountain"],
        date: "2025-09-21"
    },
    {
        id: "andechser-kloster-trail",
        unsplashId: "1763032122123-43f238df44f9",
        alt: "Andechser Kloster trail",
        tags: ["hike", "trail"],
        date: "2025-06-09"
    },
    {
        id: "jochberg-view-kochelsee",
        unsplashId: "1763036374984-347fc6404202",
        alt: "Jochberg view of Kochelsee",
        tags: ["hike", "mountain", "lake"],
        date: "2025-05-18"
    },
    {
        id: "porto-old-cityscape",
        unsplashId: "1763032568957-4092c85ae1b2",
        alt: "Porto old cityscape",
        tags: ["city", "porto"],
        date: "2025-03-15"
    },
    {
        id: "riederstein-winter-hike",
        unsplashId: "1763035344099-6634c9625ebf",
        alt: "Winter hike in Riederstein",
        tags: ["hike", "winter"],
        date: "2025-01-04"
    },
    {
        id: "olympia-park-munich-night",
        unsplashId: "1763035510732-c6ea617393e3",
        alt: "Olympia Park Munich at Night",
        tags: ["city", "munich", "night"],
        date: "2024-12-25"
    },
    {
        id: "hiking-gear-winter-tegernsee",
        unsplashId: "1763041066439-3c5c0a16f022",
        alt: "Hiking Gear Winter Tegernsee",
        tags: ["hike", "gear", "winter"],
        date: "2024-11-23"
    },
    {
        id: "scuba-diving",
        unsplashId: "1763161940665-d9fa2daa4e36",
        alt: "Divers Underwater",
        tags: ["scuba", "underwater"],
        date: "2022-09-22"
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

// Helper to get gallery image URL by ID
export const getGalleryImageById = (id: string): string | undefined => {
    const unsplashId = galleryData.find(img => img.id === id)?.unsplashId;
    return unsplashId ? getUnsplashUrl(unsplashId) : undefined;
};

// Helper function to construct Unsplash URL
export function getUnsplashUrl(unsplashId: string): string {
  return `https://images.unsplash.com/photo-${unsplashId}?q=80&w=1200&auto=format&fit=crop`;
}