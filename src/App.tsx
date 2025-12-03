import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Home from "./pages/Home"; // Your blog post list
// import Hikes from "./pages/Hikes"; // The new Hikes page
// import { Gallery } from './pages/Gallery';
// import Blog from "./pages/BlogIndex";
// import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/404";
// import Library from "./pages/Library"; // added import
// import WorkPage from "./pages/Work";

const Home = lazy(() => import("./pages/Home"));
const WorkPage = lazy(() => import("./pages/Work"));
const Hikes = lazy(() => import("./pages/Hikes"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Blog = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="grow flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Define all your application's routes */}
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/hikes" element={<Hikes />} />
            {/* <Route path="/library" element={<Library />} /> */}
            {/* explicit 404 route for testing */}
            <Route path="/404" element={<NotFound />} />
            {/* catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
