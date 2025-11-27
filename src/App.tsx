// src/App.jsx
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';      // Your blog post list
import Hikes from './pages/Hikes';    // The new Hikes page
import { Gallery } from './pages/Gallery';
import Blog from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/404';
import Library from './pages/Library'; // added import
import WorkPage from './pages/Work';
import ProjectPage from './pages/projects/project-one';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="grow flex flex-col">
        <Routes> {/* Define all your application's routes */}
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/hikes" element={<Hikes />} />
          <Route path="/library" element={<Library />} />
          <Route path="/work/project-one" element={<ProjectPage />} />
          {/* explicit 404 route for testing */}
          <Route path="/404" element={<NotFound />} />

          {/* catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;