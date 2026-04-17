import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "SaaS Resource Builder",
      description:
        "A comprehensive platform for creating and managing SaaS resources with real-time collaboration features.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Real-time"],
      status: "In Development",
      image: "🏗️",
    },
    {
      id: 2,
      title: "Backend API System for Business Platform",
      description:
        "Scalable RESTful API architecture handling millions of requests with optimized database queries.",
      tags: ["Node.js", "Express", "MongoDB", "Redis"],
      status: "Completed",
      image: "⚙️",
    },
    {
      id: 3,
      title: "File Upload & Admin Management System",
      description:
        "Secure file management system with role-based access control and comprehensive admin dashboard.",
      tags: ["Next.js", "Prisma", "S3 Storage", "Auth"],
      status: "Completed",
      image: "📁",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4 sm:px-8 lg:px-16">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What I've Been Working On
          </h2>
          <p className="text-gray-400 text-lg">
            Recent projects showcasing my expertise in full-stack development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-linear-to-br from-slate-950/50 to-black border border-slate-800 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/5 transition-all duration-300"></div>

              <div className="relative p-6">
                {/* Project Icon/Image */}
                <div className="text-6xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  {project.image}
                </div>

                {/* Status Badge */}
                <div className="inline-block mb-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      project.status === "Completed"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded border border-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                    <ExternalLink className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm font-medium">
                    <Github className="w-4 h-4" />
                    Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Link */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
