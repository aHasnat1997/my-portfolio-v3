import BlurText from "@/components/BlurText";
import DarkVeil from "@/components/DarkVeil";
import StaggeredMenu from "@/components/StaggeredMenu";
// import Image from "next/image";
// import MyImage from "../../public/my-image2.png";
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

      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
        {/* <BlurText
          text="A HASNAT"
          delay={0}
          animateBy="words"
          direction="bottom"
          className="text-[12rem] font-extrabold text-white"
        /> */}

        <div className="space-y-8 w-1/2 mx-auto">
          <div>
            <BlurText
              text="Builder of Scalable Web"
              delay={200}
              animateBy="words"
              direction="bottom"
              className="text-[4rem] text-white font-extrabold leading-relaxed"
            />

            <BlurText
              text="Applications & Platforms"
              delay={200}
              animateBy="words"
              direction="bottom"
              className="text-[4rem] text-white font-extrabold leading-relaxed"
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
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300 cursor-pointer relative z-50">
              Explore My Work
            </button>
          </div>
        </div>

        {/* <div className="absolute bottom-0 right-0">
          <Image
            src={MyImage}
            alt="A Hasnat - Full Stack Developer"
            className="w-full h-200"
            width={500}
            height={500}
          />
        </div> */}
      </div>
    </section>
  );
}
