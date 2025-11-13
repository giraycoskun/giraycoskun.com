// src/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Desktop links */}
          <div className="hidden md:flex items-center font-bold text-xl">
            
            {/* separator */}
            <div className="w-px h-6 bg-white opacity-30 mx-3" aria-hidden="true" />

            <Link to="/" className="text-white hover:text-emerald-200 px-3">
              Home
            </Link>

            {/* separator */}
            <div className="w-px h-6 bg-white opacity-30 mx-3" aria-hidden="true" />

            <Link to="/gallery" className="text-white hover:text-emerald-200 px-3">
              Gallery
            </Link>

            {/* separator */}
            <div className="w-px h-6 bg-white opacity-30 mx-3" aria-hidden="true" />

            <Link to="/blog" className="text-white hover:text-emerald-200 px-3">
              Blog
            </Link>

            {/* separator */}
            <div className="w-px h-6 bg-white opacity-30 mx-3" aria-hidden="true" />

            <Link to="/library" className="text-white hover:text-emerald-200 px-3">
              Library
            </Link>
            
            {/* separator */}
            <div className="w-px h-6 bg-white opacity-30 mx-3" aria-hidden="true" />

            <Link to="/hikes" className="text-white hover:text-emerald-200 px-3">
              Hikes
            </Link>

            {/* separator */}
            <div className="w-px h-6 bg-white opacity-30 mx-3" aria-hidden="true" />
          </div>
          
          {/* The logo/brand should also be a Link */}
          <Link to="/" className="text-xl font-medium text-white">
            giraycoskun
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
          >
            <span className="sr-only">Open main menu</span>
            {open ? (
              /* X icon */
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu — collapsible */}
        <div
          id="mobile-menu"
          className={`md:hidden mt-3 space-y-2 transition-max-h duration-200 ease-in-out overflow-hidden ${open ? 'max-h-96' : 'max-h-0'}`}
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-emerald-500"
          >
            Home
          </Link>
          <Link
            to="/hikes"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-emerald-500"
          >
            Hikes
          </Link>
          <Link
            to="/blog"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-emerald-500"
          >
            Blog
          </Link>

        </div>
      </nav>
    </header>
  );
}

export default Header;