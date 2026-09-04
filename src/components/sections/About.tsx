import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="About"
          title="Building software that works in production"
          description="Full-stack development focused on real-world business outcomes."
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 sm:gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <p className="text-[var(--muted)] leading-relaxed">
              {profile.about.split("\n\n")[0]}
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {profile.tagline}
            </p>
          </motion.div>

          <div className="flex justify-center lg:justify-end mt-12 sm:mt-16 lg:mt-0">
            <CardSwap
              width="min(100%, 500px)"
              height={340}
              cardDistance={52}
              verticalDistance={62}
              delay={4600}
              pauseOnHover
            >
              <Card customClass="p-5 sm:p-7 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[var(--muted)]">01 / Profile</span>
                  <h3 className="mt-3 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight text-[var(--foreground)]">
                    Full-stack thinking from interface to deployment.
                  </h3>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)] mt-2">
                  React, Flutter, PHP, MySQL, REST APIs, authentication, and Linux delivery in one practical workflow.
                </p>
              </Card>
              <Card customClass="p-5 sm:p-7 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[var(--muted)]">02 / Focus</span>
                  <h3 className="mt-3 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight text-[var(--foreground)]">
                    Software shaped around real operations.
                  </h3>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)] mt-2">
                  I build POS systems, learning platforms, eCommerce products, dashboards, and business software teams can rely on.
                </p>
              </Card>
              <Card customClass="p-5 sm:p-7 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[var(--muted)]">03 / Strength</span>
                  <h3 className="mt-3 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight text-[var(--foreground)]">
                    Clear architecture. Secure foundations. Useful outcomes.
                  </h3>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)] mt-2">
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
