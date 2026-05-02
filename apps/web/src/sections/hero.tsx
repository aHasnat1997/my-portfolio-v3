import BlurText from "@/components/BlurText";
import DarkVeil from "@/components/DarkVeil";
import StaggeredMenu from "@/components/StaggeredMenu";
import ScrollVideo from "@/components/ScrollVideo";
import Link from "next/link";

export default function Hero() {
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "/" },
    { label: "Services", ariaLabel: "View our services", link: "/" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/" },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com/aHasnat1997" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/a-hasnat" },
  ];

  return (
    <section className="relative w-full min-h-svh h-svh overflow-hidden">
      <DarkVeil
        hueShift={0}
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={0.5}
        scanlineFrequency={0}
        warpAmount={0.6}
      />
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        changeMenuColorOnOpen={true}
        colors={["#B19EEF", "#5227FF"]}
        logoUrl="/logo-white.svg"
      />

      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <div className="space-y-6 sm:space-y-8 w-full sm:w-3/4 md:w-1/2 mx-auto px-4 sm:px-0">
          <div>
            <BlurText
              text="Builder of Scalable Web"
              delay={200}
              animateBy="words"
              direction="bottom"
              className="text-2xl sm:text-4xl lg:text-[4rem] text-white font-extrabold leading-tight sm:leading-relaxed"
            />
            <BlurText
              text="Applications & Platforms"
              delay={200}
              animateBy="words"
              direction="bottom"
              className="text-2xl sm:text-4xl lg:text-[4rem] text-white font-extrabold leading-tight sm:leading-relaxed"
            />
          </div>

          <BlurText
            text="I am a Node.js Developer with 2+ years of experience specializing in building scalable web applications and cloud deployment. I help businesses build fast, secure, and production-ready applications."
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-lg text-gray-300 leading-relaxed"
          />

          <div>
            <Link
              href={{ pathname: "/", hash: "projects" }}
              className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300 cursor-pointer relative z-50 inline-block"
            >
              Explore My Work
            </Link>
          </div>
        </div>

        <div>Scroll down</div>

        <ScrollVideo src="/laptop.mp4" />
      </div>
    </section>
  );
}
