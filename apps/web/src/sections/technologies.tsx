export default function Technologies() {
  const techCategories = [
    {
      category: "Backend Development",
      icon: "⚙️",
      technologies: ["Node.js", "Express", "TypeScript", "PostgreSQL"],
    },
    {
      category: "Frontend Development",
      icon: "🎨",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Database & DevOps",
      icon: "🗄️",
      technologies: ["MongoDB", "PostgreSQL", "Docker", "AWS"],
    },
    {
      category: "Tools & Libraries",
      icon: "🔧",
      technologies: ["Git", "REST APIs", "GraphQL", "Prisma ORM"],
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4 sm:px-8 lg:px-16">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technologies I Work With
          </h2>
          <p className="text-gray-400 text-lg">
            A comprehensive toolkit for building modern applications
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-linear-to-br from-purple-950/20 to-black border border-purple-900/30 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/5 rounded-lg transition-all duration-300"></div>

              <div className="relative">
                <div className="text-3xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-bold text-white mb-4">
                  {category.category}
                </h3>

                <ul className="space-y-2">
                  {category.technologies.map((tech, techIndex) => (
                    <li
                      key={techIndex}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-green-400">
              20+
            </div>
            <p className="text-gray-400 mt-2">Technologies Mastered</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-green-400">
              10
            </div>
            <p className="text-gray-400 mt-2">Years Experience</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-green-400">
              50+
            </div>
            <p className="text-gray-400 mt-2">Projects Completed</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-green-400">
              100%
            </div>
            <p className="text-gray-400 mt-2">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
