import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="px-5 sm:px-8 lg:px-16 py-12 sm:py-16 md:py-28 lg:py-32 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="About"
          title="Building software that works in production"
          description="Full-stack development focused on real-world business outcomes."
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 sm:gap-8 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-3 sm:space-y-4 max-w-full lg:max-w-none text-left"
          >
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              {profile.about.split("\n\n")[0]}
            </p>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              {profile.tagline}
            </p>
          </motion.div>

          <div className="flex justify-center lg:justify-end pt-4 sm:pt-2 lg:pt-0 w-full overflow-visible">
            <CardSwap
              width="min(100%, 500px)"
              height={340}
              cardDistance={52}
              verticalDistance={62}
              delay={4600}
              pauseOnHover
            >
              <Card customClass="p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">01 / Profile</span>
                  <h3 className="mt-8 text-3xl font-semibold leading-tight text-[var(--foreground)]">
                    Full-stack thinking from interface to deployment.
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  React, Flutter, PHP, MySQL, REST APIs, authentication, and Linux delivery in one practical workflow.
                </p>
              </Card>
              <Card customClass="p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">02 / Focus</span>
                  <h3 className="mt-8 text-3xl font-semibold leading-tight text-[var(--foreground)]">
                    Software shaped around real operations.
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  I build POS systems, learning platforms, eCommerce products, dashboards, and business software teams can rely on.
                </p>
              </Card>
              <Card customClass="p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">03 / Strength</span>
                  <h3 className="mt-8 text-3xl font-semibold leading-tight text-[var(--foreground)]">
                    Clear architecture. Secure foundations. Useful outcomes.
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  From multi-tenant data isolation to role-based access, I keep products maintainable as they move into production.
                </p>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}
