import { ArrowRight, Mail, Linkedin, Github } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4 sm:px-8 lg:px-16 flex items-center">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's Build Something
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-green-400">
              Great Together
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'm always excited to
            work on challenging problems and help businesses achieve their
            goals.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <button className="px-8 py-4 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group">
            Get In Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 border-2 border-gray-600 hover:border-gray-400 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-gray-900">
            Download Resume
          </button>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Email */}
          <div className="bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-8 hover:border-yellow-500/30 transition-all duration-300 text-center group">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                <Mail className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <a
              href="mailto:hello@ahasnat.com"
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              hello@ahasnat.com
            </a>
          </div>

          {/* LinkedIn */}
          <div className="bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-8 hover:border-blue-500/30 transition-all duration-300 text-center group">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Linkedin className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
            <a
              href="https://linkedin.com/in/a-hasnat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Connect with me
            </a>
          </div>

          {/* GitHub */}
          <div className="bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-8 hover:border-gray-400/30 transition-all duration-300 text-center group">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gray-500/10 rounded-lg flex items-center justify-center group-hover:bg-gray-500/20 transition-colors">
                <Github className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">GitHub</h3>
            <a
              href="https://github.com/aHasnat1997"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              View my work
            </a>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="text-center border-t border-gray-800 pt-12">
          <p className="text-gray-500 italic max-w-2xl mx-auto">
            "The only way to do great work is to love what you do." — Steve Jobs
          </p>
        </div>
      </div>
    </section>
  );
}
