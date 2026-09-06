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

        {/* Tagline Bar: Centered on Mobile, Marquee on Desktop */}
        <div className="w-full pb-6 sm:pb-7 md:pb-10 relative z-20 overflow-hidden">
          <FadeIn delay={0.35} y={20} className="w-full">
            {/* Mobile View (<md): Clean, centered text with horizontal padding, wrapping naturally */}
            <div className="block md:hidden px-5 sm:px-8 text-center select-none">
              <p
                className="text-[var(--muted)] font-light uppercase tracking-wide leading-relaxed mx-auto max-w-[340px]"
                style={{ fontSize: 'clamp(0.7rem, 2.6vw, 0.85rem)' }}
              >
                Full-Stack Developer • Mobile Apps & Web Platforms • Production-Ready Software
              </p>
            </div>

            {/* Desktop View (md+): Full-width marquee loop unchanged */}
            <div className="hidden md:block overflow-hidden select-none py-1 w-full mask-marquee">
              <div className="running-text-track">
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className="text-[var(--muted)] font-light uppercase tracking-widest pr-14 inline-block shrink-0"
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