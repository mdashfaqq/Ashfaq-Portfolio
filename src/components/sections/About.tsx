import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import BounceCards from "@/components/ui/BounceCards";
import { profile } from "@/data/profile";

const desktopTransforms = [
  "rotate(-6deg) translate(-105px, 8px)",
  "rotate(0deg) translate(0px, -6px)",
  "rotate(6deg) translate(105px, 12px)",
];

const mobileTransforms = [
  "rotate(-5deg) translate(-22px, -8px)",
  "rotate(0deg) translate(0px, 0px)",
  "rotate(5deg) translate(22px, 8px)",
];

const cardsData = [
  {
    tag: "01 / Velocity",
    label: "Velocity",
    title: "Idea to live URL at terminal velocity.",
    desc: "React frontends, Linux servers, zero code review drama.",
    image: "/profile.jpg",
  },
  {
    tag: "02 / Stability",
    label: "Stability",
    title: "Built so stable your on-call can sleep.",
    desc: "High-speed POS engines that never choke on peak traffic.",
    image: "/focus.gif",
  },
  {
    tag: "03 / Security",
    label: "Security",
    title: "Protecting data like the company vault.",
    desc: "Multi-tenant isolation, zero leaks, 99.9% uptime.",
    image: "/strength.jpg",
  },
];

export function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transformStyles = isMobile ? mobileTransforms : desktopTransforms;

  return (
    <section id="about" className="px-5 sm:px-8 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 items-center">
          <div className="text-left">
            <SectionHeader
              label="About"
              title="Building software that works in production"
              description="Full-stack development focused on real-world business outcomes."
              className="!mb-5 sm:!mb-6"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-3 sm:space-y-4 max-w-full text-left"
            >
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                {profile.about.split("\n\n")[0]}
              </p>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                {profile.tagline}
              </p>
            </motion.div>
          </div>

          <div className="flex justify-center lg:justify-end w-full overflow-visible py-2 mt-4 sm:mt-6 lg:mt-0">
            {/* Stacked BounceCards (both Desktop and Mobile) */}
            <BounceCards
              className="about-bounce-cards"
              containerWidth={isMobile ? 330 : 560}
              containerHeight={isMobile ? 290 : 360}
              cardWidth={isMobile ? 305 : 370}
              cardHeight={isMobile ? 250 : 285}
              animationDelay={0.35}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.6)"
              transformStyles={transformStyles}
              enableHover={true}
              pushDistance={isMobile ? 55 : 120}
            >
              {cardsData.map((card) => (
                <div
                  key={card.tag}
                  className="w-full h-full flex flex-col justify-between relative overflow-hidden rounded-[20px]"
                >
                  <img
                    src={card.image}
                    alt={card.tag}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35 rounded-[20px] pointer-events-none z-[5]" />
                  <div className="relative z-10 p-5 sm:p-6 lg:p-7 h-full flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {card.tag}
                      </span>
                      <h3 className="mt-2.5 sm:mt-3 text-lg sm:text-xl lg:text-2xl font-semibold leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-white mt-auto pt-2 sm:pt-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </BounceCards>
          </div>
        </div>
      </div>
    </section>
  );
}
