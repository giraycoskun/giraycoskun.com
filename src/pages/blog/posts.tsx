type Post = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
};
const posts: Post[] = [
  {
    title: "Preparing for Alpine Hikes",
    excerpt:
      "Gear, training and safety tips before heading into alpine terrain.",
    date: "2025-09-10",
    slug: "preparing-for-alpine-hikes",
    tags: ["hiking"],
  },
  {
    title: "Winter Hiking on the Aueralm",
    excerpt: "Conditions, route notes and photos from a winter loop.",
    date: "2025-01-18",
    slug: "winter-hiking-aueralm",
    tags: ["hiking", "winter"],
  }
];

export default posts;