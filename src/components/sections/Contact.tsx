import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Contact"
          title="Let's build something great"
          description="Open to internships, freelance projects, and full-time opportunities."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden neon-glow"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[var(--primary)]/20 blur-[80px]" />

          <div className="relative">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Ready to collaborate?
            </h3>
            <p className="text-[var(--muted)] max-w-lg mx-auto mb-10">
              Whether you need a full-stack application, mobile app, or secure API — I&apos;d love to hear about your project.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--primary)] text-[#020617] font-semibold hover:shadow-[0_0_40px_rgba(56,189,248,0.4)] transition-shadow w-full sm:w-auto justify-center"
              >
                <HiOutlineMail size={22} />
                {profile.email}
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-8 py-4 rounded-full font-semibold text-white w-full sm:w-auto text-center hover:border-[var(--primary)]/40 transition-colors"
              >
                Download Resume
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-[var(--muted)] text-sm mb-8">
              <HiOutlineLocationMarker className="text-[var(--primary)]" />
              {profile.location}
            </div>

            <div className="flex justify-center gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass rounded-2xl text-[var(--muted)] hover:text-white hover:border-[var(--primary)]/30 transition-all"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass rounded-2xl text-[var(--muted)] hover:text-white hover:border-[var(--primary)]/30 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
