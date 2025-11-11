function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <a
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
          </a>

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
