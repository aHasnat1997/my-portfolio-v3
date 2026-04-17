import Hero from "@/sections/hero";
import Solutions from "@/sections/solutions";
import Technologies from "@/sections/technologies";
import Projects from "@/sections/projects";
import ProfessionalJourney from "@/sections/professional-journey";
import CTA from "@/sections/cta";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <Solutions />
      <Technologies />
      <Projects />
      <ProfessionalJourney />
      <CTA />
    </main>
  );
}
