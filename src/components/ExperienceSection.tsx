import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import image8 from "../assets/JourneyImage.png";

const ExperienceSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Title with adjusted bottom margin */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-extrabold text-white drop-shadow-[0_0_28.9px_rgba(203,37,195,0.79)] text-left mb-8 md:mb-12">
          Experience / Roles
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side with improved spacing */}
          <div className="space-y-8 md:space-y-12"> 
            <div className="space-y-6">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed font-outfit text-white/90"> 
                I've held <span className="font-bold text-white">multiple roles in clubs and companies</span>, 
                working across <span className="font-bold text-white">design</span>, <span className="font-bold text-white">development</span>, 
                <span className="font-bold text-white">data</span>, and <span className="font-bold text-white">marketing</span>.
              </p>
            </div>

            {/* Button with consistent spacing */}
            <div className="pt-4 md:pt-6"> 
              <a
                href="/about"
                className="flex justify-center items-center w-full sm:w-[220px] md:w-[250px] lg:w-[274px] h-[60px] md:h-[70px] lg:h-[79px] px-4 md:px-[74px] py-2 md:py-[29px] rounded-[61px] bg-[#BF6BB3] shadow-[0_4px_37.1px_0_rgba(222,8,212,0.79)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_4px_45px_0_rgba(222,8,212,0.9)]"
              >
                <span className="whitespace-nowrap text-white font-orbitron text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold leading-normal opacity-[0.94] drop-shadow-[0_4px_4px_rgba(222,8,212,0.79)]">
                  Discover More
                </span>
              </a>
            </div>
          </div>

          {/* Right Side (unchanged) */}
          <div className="flex justify-center mt-6 lg:mt-0">
            <img
              src={image8}
              alt="Experience"
              className="w-full max-w-[500px] lg:max-w-full h-auto object-cover rounded-xl md:rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;