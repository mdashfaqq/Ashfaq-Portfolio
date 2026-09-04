import { FadeIn } from '../ui/FadeIn';
import { ContactButton } from '../ui/ContactButton';
import { Magnet } from '../ui/Magnet';

export function HeroSection() {
  return (
    <section className="h-[100dvh] min-h-[520px] max-h-[960px] flex flex-col overflow-x-clip relative">
      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-between pt-16 sm:pt-20 relative min-h-0">
        {/* Hero Heading */}
        <div className="relative z-20 overflow-hidden px-2 pt-2 sm:pt-4">
          <FadeIn delay={0.15} y={30}>
            <h1 className="hero-heading text-center font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[11vw] sm:text-[11vw] md:text-[12vw] lg:text-[13vw]">
              Hi, I&apos;m Ashfaq
            </h1>
          </FadeIn>
        </div>

        {/* Hero Portrait */}
        <div className="absolute inset-x-0 bottom-10 sm:bottom-12 z-10 flex justify-center pointer-events-none">
          <Magnet padding={120} strength={2.5}>
            <div className="w-[min(88vw,480px)] sm:w-[min(46vw,520px)] pointer-events-auto">
              <FadeIn delay={0.4} y={20}>
                <img
                  src="/hero.png"
                  alt="Ashfaq portrait"
                  className="block w-full max-h-[calc(100dvh-7rem)] h-auto object-contain"
                />
              </FadeIn>
            </div>
          </Magnet>
        </div>

        {/* Full-width Running Text Bar */}
        <div className="w-full pb-3 sm:pb-6 md:pb-8 relative z-20 overflow-hidden">
          <FadeIn delay={0.35} y={20} className="w-full">
            <div className="overflow-hidden select-none py-1 w-full mask-marquee">
              <div className="running-text-track">
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className="text-[var(--muted)] font-light uppercase tracking-widest pr-10 sm:pr-14 inline-block shrink-0"
                    style={{ fontSize: 'clamp(0.8rem, 1.25vw, 1.35rem)' }}
                  >
                    Full-Stack Developer • Mobile Apps & Web Platforms • Production-Ready Software • Secure Architecture •&nbsp;
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}