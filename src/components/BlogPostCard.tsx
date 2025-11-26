import { Link } from "react-router-dom";
import type { PostItem } from "../data/posts";

function readingTime(text: string) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export default function BlogPostCard({
  post,
  onTagClick,
}: {
  post: PostItem;
  featured?: boolean;
  onTagClick?: (tag: string) => void;
}) {
  const date = new Date(post.date);
  const formatted = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
  // console.log("Post:", post);
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:shadow-2xl h-full flex flex-col">
      {/* fixed header height with cover image background */}
      <Link to={`/blog/${post.slug}`}>
        <div
          className="flex items-end p-6 h-44 md:h-48 bg-cover bg-center relative cursor-pointer"
          style={{
            backgroundImage:
              post.coverImage
                ? `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${post.coverImage})`
                : "linear-gradient(to right, rgb(31, 41, 55), rgb(20, 184, 166))",
          }}
        >
          
        </div>
      </Link>

      {/* fixed content area height to keep uniform card size */}
      <div className="p-6 flex flex-col justify-between h-72">
         <div className="text-blue w-full relative z-10">
          <Link to={`/blog/${post.slug}`}>
            <h2 className="text-xl md:text-2xl font-bold leading-tight truncate">
              {post.title}
            </h2>
          </Link>
          <div className="mt-1 flex items-center gap-3 text-sm opacity-90">
            <span>{formatted}</span>
            <span aria-hidden className="opacity-50">
              •
            </span>
            <span>{post.readingTime ?? readingTime(post.excerpt ?? "")}</span>
          </div>
        </div>
        <p className="text-gray-700 text-lg overflow-hidden line-clamp-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-wrap gap-2">
            {(post.tags || []).map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                aria-label={`Filter by ${tag}`}
                type="button"
              >
                #{tag}
              </button>
            ))}
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="text-teal-600 px-3 py-1.5 rounded border border-gray-200 inline-flex items-center gap-2 whitespace-nowrap"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
