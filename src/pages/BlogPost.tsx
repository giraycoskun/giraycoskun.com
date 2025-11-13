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
    <main className="container mx-auto px-6 py-12">
      <header className="mb-8">
        <Link to="/blog" className="text-sm text-emerald-600 hover:underline">
          ← Back to Blog
        </Link>

        <h1 className="mt-4 text-4xl font-extrabold text-gray-900 text-center">
          {post.title}
        </h1>

        <div className="mt-2 flex items-center gap-3 text-sm text-gray-600 justify-center">
          <span>{formatted}</span>
          {post.readingTime && (
            <>
              <span aria-hidden className="opacity-50">•</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>
      </header>

      <article className="prose lg:prose-lg max-w-none dark:prose-invert mx-auto">
        {post.Component ? (
          <post.Component />
        ) : (
          <p className="text-gray-700 leading-relaxed">{post.excerpt}</p>
        )}
      </article>

      <footer className="mt-12 border-t border-gray-100 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {(post.tags || []).map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <div className="text-sm text-gray-500">
            <Link to="/blog" className="hover:underline">
              Back to all posts
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}