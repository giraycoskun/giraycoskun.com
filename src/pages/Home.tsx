import { Suspense, lazy } from "react";

import { GitHubProfileCard } from "../components/ProfileCard";
// import Gallery from "./Gallery";
import BlogPostCard from "../components/BlogPostCard";
import posts from "../data/posts";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Gallery = lazy(() => import("./Gallery"));

function Home() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Hello World,",
    "I am Giray Coskun.",
    "Follow the white rabbit!",
  ];

  useEffect(() => {
    const currentText = texts[currentIndex];

    if (!isDeleting && charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && charIndex === currentText.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentIndex((currentIndex + 1) % texts.length);
    }
  }, [charIndex, isDeleting, currentIndex]);

  return (
    <div className="flex-1 flex flex-col">
      {/* --- Hero Section --- */}
      <div className="bg-gray-200">
        <div className="container mx-auto px-6 py-24">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex-1 min-w-[300px] text-center md:text-left">
              <h1 className="relative text-5xl md:text-6xl font-extrabold text-gray-900 mb-15 min-h-[1.2em]">
                {/* Width reserver (hidden but takes up space) */}
                <span className="invisible whitespace-nowrap block">
                  {texts.reduce((a, b) => (a.length > b.length ? a : b))}
                </span>

                {/* Actual animated text */}
                <span className="absolute left-0 top-0 w-full overflow-hidden">
                  <span className="inline-block">
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </span>
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600">
                I am a Computer Scientist/Software Engineer, living in Munich.{" "}
                <br />
                I am also a CMAS 3* Scuba Diver and a hiking enthusiast. <br />
                This is my personal website to write about my projects, hobbies
                and trips.
              </p>
            </div>
            <div className="flex-shrink-0 mx-auto">
              <img
                src="https://wild-fire-136.linkyhost.com/?raw=true"
                alt="Profile"
                className="w-[300px] md:w-[400px] h-auto rounded-lg shadow-lg"
                width="400"
                height="400"
                loading="eager"
              />
            </div>
          </div>
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
      <div className="bg-gray-200 py-12">
        <Suspense fallback={<div>Loading...</div>}>
          <Gallery limit={6} random={true} />
        </Suspense>
      </div>
      {/* GitHub profile card (centered, constrained width) */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 flex flex-wrap">
          <GitHubProfileCard />
        </div>
      </div>

      {/* Spotify playlists Section (kept as the last child and pushed to bottom) */}
      <div className="bg-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <iframe
              data-testid="embed-iframe-1"
              className="w-full rounded-xl border-0"
              style={{ height: "352px" }}
              src="https://open.spotify.com/embed/playlist/5Bdj3xYsHtdaQQxbcoYZfZ"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist yan bastik"
            />

            <iframe
              data-testid="embed-iframe-2"
              className="w-full rounded-xl border-0"
              style={{ height: "352px" }}
              src="https://open.spotify.com/embed/playlist/3C29xT0NaEH7z3MGaPzsCE"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist tinilar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
