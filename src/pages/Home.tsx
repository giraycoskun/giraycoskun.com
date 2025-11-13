import { GitHubProfileCard } from "../components/ProfileCard";
import { Gallery } from "./Gallery"; // import shared gallery data
import BlogPostCard from "../components/BlogPostCard";
import posts from "../data/posts";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* --- Hero Section --- */}
      <div className="bg-gray-200">
        <div className="container mx-auto px-6 py-24 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
            Hello World,
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
            I am a Computer Scientist/Software Engineer, living in Munich.{" "}
            <br />
            I am also a CMAS 3* Scuba Diver and a hiking enthusiast. <br />
            This is my personal website to write about my hobbies and trips.
          </p>
        </div>
      </div>

      {/* --- Latest posts slice --- */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest posts</h2>
            <Link
              to="/blog"
              className="text-sm text-emerald-600 hover:underline"
            >
              View all posts →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post, i) => (
              <BlogPostCard
                key={post.slug}
                post={post}
                featured={i === 0}
                onTagClick={() => {
                  /* optional: implement tag filter/navigation if needed */
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- Small Photo Gallery --- */}
      <div className="bg-gray-200">
        <Gallery limit={5} />
      </div>
      {/* GitHub profile card (centered, constrained width) */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 flex flex-wrap">
          <GitHubProfileCard />
        </div>
      </div>
    </>
  );
}

export default Home;
