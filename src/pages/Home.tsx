import { GitHubProfileCard } from "../components/ProfileCard";
import { Gallery } from "./Gallery"; // import shared gallery data

function Home() {
  return (
    <>
      {/* --- Hero Section --- */}
      <div className="bg-white">
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

      {/* GitHub profile card (centered, constrained width) */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 flex flex-wrap">
          <GitHubProfileCard />
        </div>
      </div>

      {/* --- Small Photo Gallery --- */}
      <Gallery sliceNumber={6} />
    </>
  );
}

export default Home;
