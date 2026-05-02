import { CheckCircle2 } from "lucide-react";

export default function Solutions() {
  const solutions = [
    {
      icon: "🚀",
      title: "Backend Development",
      description: "Robust server-side solutions with modern frameworks",
    },
    {
      icon: "⚡",
      title: "Real-Time Systems",
      description: "Dynamic applications with live data processing",
    },
    {
      icon: "🔒",
      title: "Security & Performance",
      description: "Optimized, secure architectures for scalability",
    },
  ];

  const benefits = [
    "Scalable architecture design",
    "Code optimization & refactoring",
    "API development & integration",
    "Database design & management",
  ];

  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4 sm:px-8 lg:px-16">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Title and solutions */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Crafting Digital Solutions
            </h2>
            <p className="text-xl text-green-400 font-semibold mb-12">
              With Skill & Precision
            </p>

            <div className="space-y-8">
              {solutions.map((solution, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-3xl shrink-0">{solution.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-gray-400">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Benefits list */}
          <div className="bg-linear-to-br from-green-950/30 to-black border border-green-900/30 rounded-lg p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-white mb-8">
              What I Bring to Your Projects
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-gray-200">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 p-6 bg-green-500/5 border border-green-400/30 rounded-lg">
              <p className="text-gray-300 italic">
                "I focus on building systems that not only work today but scale
                for tomorrow's demands."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
