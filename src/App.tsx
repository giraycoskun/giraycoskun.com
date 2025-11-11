// src/App.jsx
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';      // Your blog post list
import Hikes from './pages/Hikes';    // The new Hikes page
import { GalleryPage } from './pages/Gallery';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="grow">
        <Routes> {/* Define all your application's routes */}
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/hikes" element={<Hikes />} />
          {/* You can add a 404 "Not Found" page later */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;