import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import posts from "../data/posts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate("/404", { replace: true });
    }
  }, [post, navigate]);

  if (!post) return null;

  const date = new Date(post.date);
  const formatted = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

  return (
    <main className="w-full mx-auto px-6 py-12 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <Link to="/blog" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
            ← Back to Blog
          </Link>

          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100 text-center">
            {post.title}
          </h1>

          <div className="mt-2 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 justify-center">
            <span>{formatted}</span>
            {post.readingTime && (
              <>
                <span aria-hidden className="opacity-50">•</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>
        </header>

        <article className="prose lg:prose-lg prose-neutral max-w-none dark:prose-invert mx-auto text-black dark:text-gray-100">
          {post.Component ? (
            <post.Component />
          ) : (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{post.excerpt}</p>
          )}
        </article>

        <footer className="mt-12 border-t border-gray-100 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {(post.tags || []).map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              <Link to="/blog" className="hover:underline dark:text-emerald-400">
                Back to all posts
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}