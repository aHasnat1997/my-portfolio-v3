export default function ProfessionalJourney() {
  const journey = [
    {
      year: "2024 - Present",
      title: "Senior Full-Stack Developer",
      company: "Tech Innovators Inc.",
      description:
        "Leading development of scalable web applications and mentoring junior developers.",
      highlights: ["Team Lead", "Architecture Design", "10+ Projects"],
    },
    {
      year: "2022 - 2024",
      title: "Full-Stack Developer",
      company: "Digital Solutions Ltd.",
      description:
        "Developed robust backend systems and modern frontend interfaces for enterprise clients.",
      highlights: ["API Development", "Database Design", "20+ Projects"],
    },
    {
      year: "2020 - 2022",
      title: "Junior Developer",
      company: "StartUp Labs",
      description:
        "Started my professional journey building web applications and learning best practices.",
      highlights: ["Web Development", "Problem Solving", "15+ Projects"],
    },
  ];

  const skills = [
    { category: "Backend", level: 95 },
    { category: "Frontend", level: 85 },
    { category: "DevOps", level: 75 },
    { category: "Database Design", level: 90 },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4 sm:px-8 lg:px-16">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Professional Journey
        </h2>
        <p className="text-gray-400 text-center mb-16">
          My path to becoming a full-stack developer
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {journey.map((item, index) => (
                <div key={index} className="relative">
                  {/* Timeline connector */}
                  {index !== journey.length - 1 && (
                    <div className="absolute left-6 top-20 w-0.5 h-12 bg-linear-to-b from-indigo-500 to-transparent"></div>
                  )}

                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="shrink-0 flex items-start pt-1">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-4 border-black">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="grow pt-2">
                      <div className="text-indigo-400 font-semibold text-sm mb-1">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 mb-3">{item.company}</p>
                      <p className="text-gray-300 mb-4">{item.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((highlight, hIndex) => (
                          <span
                            key={hIndex}
                            className="text-xs bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/20"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills aside */}
          <div className="bg-linear-to-br from-indigo-950/30 to-black border border-indigo-900/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-8">
              Skills Proficiency
            </h3>

            {skills.map((skill, index) => (
              <div key={index} className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">
                    {skill.category}
                  </span>
                  <span className="text-indigo-400 text-sm">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}

            <div className="mt-12 p-6 bg-indigo-500/5 border border-indigo-400/30 rounded-lg">
              <p className="text-gray-300 text-sm">
                "Every project is an opportunity to learn and grow. I'm
                committed to continuous improvement."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
