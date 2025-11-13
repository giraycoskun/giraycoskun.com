import { useMemo, useState } from "react";
import BlogPostCard from "../components/BlogPostCard";
import posts from "../data/posts";

export default function Blog() {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  // sort posts newest first
  const sorted = useMemo(
    () =>
      [...posts].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }),
    []
  );

  const allTags = useMemo(() => {
    const s = new Set<string>();
    posts.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, []);

  const filtered = useMemo(() => {
    return sorted.filter((p) => {
      if (selectedTag && !(p.tags || []).includes(selectedTag)) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [sorted, selectedTag, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  const onTagClick = (tag: string) => {
    setSelectedTag((t) => (t === tag ? null : tag));
    setPage(1);
  };

  return (
    <main className="container mx-auto px-6 py-12">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Blog</h1>
        <p className="text-sm text-gray-600 mt-2">
          Articles and notes — search, filter by tag or click a post to read
          more.
        </p>
      </header>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start">
        <div className="flex-1 min-w-0">
          <label className="sr-only">Search posts</label>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by title, excerpt or tag..."
            className="w-full px-4 py-2 border border-gray-200 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
            aria-label="Search posts"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => {
              setSelectedTag(null);
              setPage(1);
            }}
            className={`text-sm px-3 py-1 rounded ${selectedTag ? "bg-white border" : "bg-emerald-600 text-white"}`}
            aria-pressed={!selectedTag}
            type="button"
          >
            All
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`text-sm px-3 py-1 rounded ${selectedTag === tag ? "bg-emerald-600 text-white" : "bg-white border"}`}
              aria-pressed={selectedTag === tag}
              type="button"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paginated.length ? (
          paginated.map((p) => (
            <BlogPostCard key={p.slug} post={p} onTagClick={onTagClick} />
          ))
        ) : (
          <div className="md:col-span-3 p-6 bg-white rounded-lg shadow text-gray-600">
            No posts found. Try a different search or clear filters.
          </div>
        )}
      </section>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => setPage((n) => Math.max(1, n - 1))}
          disabled={page === 1}
          className="px-3 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-40"
        >
          Prev
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`px-3 py-2 rounded ${n === page ? "bg-emerald-600 text-white" : "bg-white border"}`}
            >
              {n}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage((n) => Math.min(totalPages, n + 1))}
          disabled={page === totalPages}
          className="px-3 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </main>
  );
}