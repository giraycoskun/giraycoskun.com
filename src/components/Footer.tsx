function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-0">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* <a
            href="https://giraycoskun.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
            aria-label="Developer's Website"
            title="Developer's Website"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM9.41 15.41L8 14l3-3-3-3 1.41-1.41L13.83 11l-4.42 4.41zM14 14h2v2h-2v-2z" />
            </svg>
          </a> */}

          <a
            href="https://github.com/giraycoskun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.65.5.75 5.4.75 11.75c0 4.85 3.15 8.95 7.52 10.4.55.1.75-.24.75-.53 0-.26-.01-1.14-.02-2.07-3.06.67-3.71-1.48-3.71-1.48-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.07-.67.07-.67 1.09.08 1.66 1.12 1.66 1.12.98 1.68 2.57 1.2 3.2.92.1-.72.38-1.2.69-1.48-2.44-.28-5-1.22-5-5.43 0-1.2.43-2.18 1.12-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.29 3.02 1.12.88-.24 1.82-.37 2.75-.37.93 0 1.87.13 2.75.37 2.1-1.41 3.02-1.12 3.02-1.12.6 1.52.22 2.64.11 2.92.7.77 1.12 1.75 1.12 2.95 0 4.22-2.56 5.15-5 5.43.39.34.74 1.01.74 2.04 0 1.48-.01 2.67-.01 3.03 0 .29.2.64.76.53C19.1 20.7 22.25 16.6 22.25 11.75 22.25 5.4 17.35.5 12 .5z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/giraycoskun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02C6.08 7.46 7 6.58 7 5.48 7 4.38 6.08 3.5 4.98 3.5zM3.5 8.99h3v11.01h-3V8.99zM9.49 8.99h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v6.47h-3v-5.73c0-1.37-.02-3.13-1.91-3.13-1.91 0-2.2 1.5-2.2 3.03v5.83h-3V8.99z" />
            </svg>
          </a>

          <a
            href="https://instagram.com/giray_coskun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
            aria-label="Instagram"
            title="@giray_coskun"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm4.75-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
            </svg>
          </a>

          <a
            href="https://open.spotify.com/user/11151152114"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
            aria-label="Spotify"
            title="Spotify"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 168 168"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M84 0a84 84 0 1084 84A84.1 84.1 0 0084 0zm38.9 120.3a4.9 4.9 0 01-6.8 1.6c-18.6-11.4-42-14-69.5-7.5a4.9 4.9 0 11-2.9-9.5c30.6-9.3 56.3-6.1 77.7 8.7a4.9 4.9 0 01-1 6.9zm9.6-23.8a6 6 0 01-8.4 1.9c-21.4-13.2-54-17.1-79.1-9.1a6 6 0 11-4-11.4c28.7-10.1 63-5.6 87.1 10.6a6 6 0 011-1zm1.4-24.6c-25.2-15-66.9-16.4-92.1-8.7a7 7 0 01-5.1-13c28.8-11.3 75-9.6 104 10.2a7 7 0 01-6.8 12.5z" />
            </svg>
          </a>
        </div>
        <div className="text-center md:text-left">
          <p className="mb-1">
            &copy; {new Date().getFullYear()} My Personal Blog. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
