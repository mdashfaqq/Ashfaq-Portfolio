import { FadeIn } from '../ui/FadeIn';
import { Magnet } from '../ui/Magnet';

export function HeroSection() {
  return (
    <section id="home" className="h-[100dvh] min-h-[560px] md:min-h-[580px] flex flex-col overflow-x-clip relative">
      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-end relative min-h-0">
        {/* Hero Heading */}
        <div className="relative z-20 overflow-hidden px-2 mb-2 sm:mb-0">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading text-center font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[12vw] sm:text-[11vw] md:text-[12vw] lg:text-[13vw] mt-16 sm:mt-8 md:-mt-5">
              Hi, I&apos;m Ashfaq
            </h1>
          </FadeIn>
        </div>

        {/* Hero Portrait */}
        <div className="absolute inset-x-0 bottom-36 sm:bottom-28 md:bottom-0 z-10 flex justify-center pointer-events-none">
          <Magnet padding={150} strength={3}>
            <div className="w-[min(88vw,420px)] sm:w-[min(70vw,460px)] md:w-[min(42vw,520px)] pointer-events-auto">
              <FadeIn delay={0.6} y={30}>
                <img
                  src="/hero.png"
                  alt="Ashfaq portrait"
                  className="block w-full max-h-[calc(76dvh-2rem)] sm:max-h-[calc(86dvh-2.5rem)] md:max-h-[calc(100vh-2.5rem)] h-auto object-contain mx-auto"
                />
              </FadeIn>
            </div>
          </Magnet>
        </div>

        {/* Tagline Bar: Static Clean Centered Subtitle */}
        <div className="w-full pb-6 sm:pb-7 md:pb-10 relative z-20 overflow-hidden">
          <FadeIn delay={0.35} y={20} className="w-full">
            <div className="px-5 sm:px-8 text-center select-none">
              <p
                className="text-[var(--muted)] font-light uppercase tracking-widest leading-relaxed mx-auto max-w-4xl"
                style={{ fontSize: 'clamp(0.72rem, 1.2vw, 1.02rem)' }}
              >
                Full-Stack Developer • Cybersecurity Specialist • Mobile Apps & Web Platforms • Production-Ready Software
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}