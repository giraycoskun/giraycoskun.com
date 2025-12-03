import { Code2, Merge, ExternalLink } from "lucide-react";

export function GitHubProfileCard() {
  const repositories = [
    {
      id: 1,
      name: "ChewPy",
      tools: ["Python", "uv", "CLI Tool"],
      url: "https://github.com/giraycoskun/ChewPy",
    },
    {
      id: 2,
      name: "automated-reasoning",
      tools: ["Python", "Go", "FastAPI", "Docker"],
      url: "https://github.com/giraycoskun/automated-reasoning",
    },
    {
      id: 3,
      name: "server.giraycoskun.dev",
      tools: ["Nginx", "React", "TypeScript", "systemd"],
      url: "https://github.com/giraycoskun/server.giraycoskun.dev",
    },
  ];

  const tools = [
    { name: "Python", icon: "https://skillicons.dev/icons?i=python" },
    { name: "FastAPI", icon: "https://skillicons.dev/icons?i=fastapi" },
    { name: "Go", icon: "https://skillicons.dev/icons?i=go" },
    { name: "JavaScript", icon: "https://skillicons.dev/icons?i=javascript" },
    { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
    { name: "React", icon: "https://skillicons.dev/icons?i=react" },
    { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgresql" },
    { name: "Redis", icon: "https://skillicons.dev/icons?i=redis" },
    { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
    { name: "AWS", icon: "https://skillicons.dev/icons?i=aws" },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Avatar + Meta */}
      <div className="md:w-1/3 bg-linear-to-r from-purple-600 to-blue-600 p-6 flex flex-col items-start gap-4">
        <img
          src="https://avatars.githubusercontent.com/u/37620872?s=400&u=3b9d821e80e76abc209441bc88b128956e77cbd2&v=4"
          alt="giraycoskun avatar"
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
        />
        <div className="text-white">
          <h2 className="text-lg md:text-xl font-bold leading-tight">
            Giray Coskun
          </h2>
          <p className="text-purple-100 text-sm mt-1">@giraycoskun</p>
        </div>
        <p className="text-white/90 mt-3 text-sm">
          Software Engineer <br /> MSc Computer Science @ TUM <br /> Sabanci
          University @ 2022
        </p>

        {/* developer website CTA */}
        <a
          href="https://giraycoskun.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded border-2 border-white"
          title="Visit giraycoskun.dev"
          aria-label="Visit giraycoskun.dev"
        >
          Visit developer site
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Tech Stack */}
      <div className="md:w-2/3 p-6 flex flex-col justify-between items-start gap-4">
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Code2 size={16} className="text-gray-500" />
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="px-3 py-1.5 bg-linear-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-full text-sm font-medium text-gray-700 hover:shadow-md transition-shadow flex items-center gap-2"
              >
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-4 h-4"
                  loading="lazy"
                />
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Merge size={16} className="text-gray-500" />
            Interests
          </h3>
          <p>
            Discrete Optimization, Causality <br />
            Software & Cloud Architecture, Full Stack Development
          </p>
        </div>
        {/* local server CTA */}
        <div className="mb-0 flex justify-between">
          <a
            href="https://server.giraycoskun.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 text-sm bg-gray-300 hover:bg-white/20 text-gray-700 px-3 py-2 rounded border-2 border-black mr-4"
            title="Visit server.giraycoskun.dev"
            aria-label="Visit server.giraycoskun.dev"
          >
            Visit home server
            <ExternalLink size={14} />
          </a>
          <a
            href="https://status.giraycoskun.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 text-sm bg-indigo-300 hover:bg-white/20 text-gray-700 px-3 py-2 rounded border-2 border-black"
            title="Visit server.giraycoskun.dev"
            aria-label="Visit server.giraycoskun.dev"
          >
            Home server status
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Repositories */}
      <div className="md:w-2/3 p-6 flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Favourite Repositories
            </h3>
            <span className="text-sm text-gray-500">20 total</span>
          </div>

          <div className="space-y-3">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 group-hover:text-blue-700 flex items-center gap-2"
                    >
                      <span className="inline-block truncate max-w-[18rem]">
                        {repo.name}
                      </span>
                      <ExternalLink
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </h4>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="font-medium">{repo.tools.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-6 mt-6">
            <a
              href="https://github.com/giraycoskun?tab=repositories"
              className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all repositories →
            </a>
            <a
              href="https://giraycoskun.github.io/"
              className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View repository docs →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
