import BlurText from "@/components/BlurText";
import DarkVeil from "@/components/DarkVeil";
import StaggeredMenu from "@/components/StaggeredMenu";
// import TextType from "@/components/TextType";

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
    <section className="relative w-full h-screen">
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
        <div className="max-w-4xl space-y-8">
          <BlurText
            text="Builder of Scalable Web Applications & Platforms"
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-4xl font-extrabold text-white text-center"
          />

          <BlurText
            text="I am a Node.js Developer with 2+ years of experience specializing in building scalable web applications and cloud deployment. I help businesses build fast, secure, and production-ready applications."
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-2xl text-white"
          />

          {/* <TextType
            text={[
              "I am a Node.js Developer with 2+ years of experience specializing in building scalable web applications and cloud deployment. I help businesses build fast, secure, and production-ready applications.",
            ]}
            className="text-2xl text-white"
            loop={false}
            typingSpeed={20}
            pauseDuration={1500}
            showCursor
            cursorCharacter="█"
            cursorClassName={"text-[#FFFFFF]"}
            deletingSpeed={50}
            cursorBlinkDuration={0.5}
          /> */}
        </div>
      </div>
    </section>
  );
}
