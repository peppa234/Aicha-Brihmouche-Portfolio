import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import arrowIcon from "../assets/icons/arrow.png";
import image1 from "../assets/hackathons/image1.png";
import image2 from "../assets/hackathons/image2.png";
import image3 from "../assets/certifications/image3.png"; // Associate Data Scientist
import image4 from "../assets/certifications/image4.png"; // Web Development Internship
import image5 from "../assets/certifications/image5.png"; // Web Development Course
import dmCert from "../assets/certifications/DM.png"; // Google Digital Marketing

const AchievementsSection = () => {
  const achievements = [
    {
      title: "2nd Place – Hack&Train Hackathon",
      description:
        "As part of Team MOSAIC, I joined Hack&Train by SecAi to tackle AI and cybersecurity challenges. I co-led the AI side, developing advanced object detection models for detailed satellite image analysis.",
      img: image1,
      link: "https://www.linkedin.com/posts/activity-7283204095564279809-5GtM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEz-jN0BLv8Xpk9K2MzxEJGtM5ZMVjsGqn4",
    },
    {
      title: "1st Place – Data Bounty Hackathon",
      description:
        "I joined the Data Bounty Hackathon by CSCC Club, where our team tackled AI and cybersecurity tracks. I focused on CTF challenges, solving exploits like JWT attacks, steganography, and remote code execution.",
      img: image2,
      link: "https://www.linkedin.com/posts/activity-7337863537010040832-E1_N?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEz-jN0BLv8Xpk9K2MzxEJGtM5ZMVjsGqn4",
    },
  ];

  const certifications = [
    {
      img: image3,
      title: "Associate Data Scientist",
      subtitle: "DataCamp",
    },
    {
      img: image4,
      title: "Web Development Internship",
      subtitle: "Prodigy InfoTech",
    },
    {
      img: image5,
      title: "Web Development Course",
      subtitle: "John Hopkins University",
    },
    {
      img: dmCert,
      title: "Foundations of Digital Marketing and E-commerce",
      subtitle: "Google",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        {/* Big title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-extrabold text-white drop-shadow-[0_0_28.9px_rgba(203,37,195,0.79)] text-left mb-8 md:mb-12">
          Achievements & Certifications
        </h2>

        {/* Sub Title */}
        <h2 className="font-orbitron font-bold text-white text-2xl drop-shadow-[0_0_6.9px_rgba(222,8,212,0.79)] mt-2 mb-8 text-left">
          1. Hackathon Wins & Awards
        </h2>

        {/* Achievement Cards */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-[rgba(255,255,255,0.05)] border border-[#BF6BB3] rounded-[20px] shadow-[0_2px_15px_0_rgba(191,107,179,0.30)] overflow-hidden flex flex-col items-center p-6 max-w-[550px]"
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden rounded-[48px]">
                <img
                  src={achievement.img}
                  alt={achievement.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-orbitron font-bold text-white mt-4 mb-2 drop-shadow-[0_0_6.9px_rgba(222,8,212,0.79)] text-center">
                {achievement.title}
              </h3>

              {/* Description */}
              <p className="text-white/80 font-outfit text-center mb-6 px-4">
                {achievement.description}
              </p>

              {/* More Button */}
              <Button
                onClick={() => window.open(achievement.link, "_blank")}
                className={`${buttonVariants({
                  variant: "cosmic",
                  size: "sm",
                })} font-orbitron font-extrabold drop-shadow-[0_0_6.9px_rgba(222,8,212,0.79)] flex items-center gap-2`}
              >
                More
                <img src={arrowIcon} alt="arrow" className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

          {/* Certifications Section */}
          <h2 className="font-orbitron font-bold text-white text-2xl drop-shadow-[0_0_6.9px_rgba(222,8,212,0.79)] mt-2 mb-8 text-left">
            2. Certifications
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-[rgba(255,255,255,0.05)] border border-[#BF6BB3] rounded-[20px] shadow-[0_2px_15px_0_rgba(191,107,179,0.30)] overflow-hidden flex flex-col items-center p-6 w-[320px]"
              >
                {/* Certificate Image with Hover Animation */}
                <div className="relative w-full overflow-hidden rounded-[12px]">
                  <img
                    src={cert.img}
                    alt={cert.title}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Certificate Title */}
                <h3 className="text-lg font-orbitron font-bold text-white mt-4 mb-1 text-center">
                  {cert.title}
                </h3>

                {/* Certificate Subtitle */}
                <p className="text-white/70 font-outfit text-center text-sm">
                  {cert.subtitle}
                </p>
              </div>
            ))}
          </div>

      </div>
    </section>
  );
};

export default AchievementsSection;
