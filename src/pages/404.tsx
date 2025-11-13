import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="container mx-auto px-6 py-24 text-center">
      {/* Public folder image */}
      <img
        src="/404.png"
        alt="Not found"
        className="mx-auto rounded-lg shadow-md mb-8 w-64 object-cover"
      />

      <p className="text-lg text-gray-600 mb-8">
        The link may be broken or the page has been moved.
      </p>

      <div className="flex items-center justify-center gap-4">
        <Link
          to="/"
          className="px-4 py-2 bg-emerald-600 text-white rounded shadow hover:bg-emerald-700"
        >
          Go home
        </Link>
        <Link
          to="/gallery"
          className="px-4 py-2 bg-white border border-gray-200 text-gray-800 rounded hover:bg-gray-50"
        >
          Go to Gallery
        </Link>
        <Link
          to="/blog"
          className="px-4 py-2 bg-white border border-gray-200 text-gray-800 rounded hover:bg-gray-50"
        >
          Go to Blog
        </Link>

        <Link
          to="/hikes"
          className="px-4 py-2 bg-white border border-gray-200 text-gray-800 rounded hover:bg-gray-50"
        >
          Go to Hikes
        </Link>
      </div>
    </main>
  );
}
