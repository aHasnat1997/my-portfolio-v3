import BlurText from "@/components/BlurText";
import DarkVeil from "@/components/DarkVeil";
import StaggeredMenu from "@/components/StaggeredMenu";

export default function Home() {
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
    <main className="relative w-full h-screen">
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

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div>
          <BlurText
            text="👋Hello, I'm"
            delay={200}
            animateBy="words"
            direction="top"
            // onAnimationComplete={handleAnimationComplete}
            className="text-8xl font-extrabold text-white text-center leading-40"
          />
          <BlurText
            text="Full-Stack Developer"
            delay={350}
            animateBy="words"
            direction="top"
            // onAnimationComplete={handleAnimationComplete}
            className="text-6xl font-extrabold text-white text-center leading-40"
          />
        </div>
      </div>
    </main>
  );
}
