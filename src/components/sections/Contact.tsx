import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineDocumentDownload,
  HiCheckCircle,
} from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";

// const trustPoints = [
//   "6+ products shipped end-to-end",
//   "2 live production deployments",
//   "Full-stack: mobile, web, and APIs",
// ];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "visitor"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Contact"
          title="Let's build something together"
          description="Open to full-time roles, internships, and freelance projects. I typically respond within 24 hours."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="surface-card p-6 sm:p-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">Available for opportunities</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              Ready to hire or collaborate?
            </h3>
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-6">
              Whether you need a production mobile app, web platform, or secure API — I&apos;d love
              to hear about your project and how I can help ship it.
            </p>

            {/* <ul className="space-y-3 mb-8">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-white/70">
                  <HiCheckCircle size={16} className="text-emerald-400 shrink-0" />
                  {point}
                </li>
              ))}
            </ul> */}

            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all touch-manipulation group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <HiOutlineMail size={18} className="text-white/70" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Email</p>
                  <p className="text-sm text-white truncate group-hover:text-white/90">
                    {profile.email}
                  </p>
                </div>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all touch-manipulation group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <FaLinkedin size={18} className="text-white/70" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">LinkedIn</p>
                  <p className="text-sm text-white">Connect professionally</p>
                </div>
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all touch-manipulation group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <FaGithub size={18} className="text-white/70" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">GitHub</p>
                  <p className="text-sm text-white">View source code</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                  <HiOutlineLocationMarker size={18} className="text-white/50" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Location</p>
                  <p className="text-sm text-white/70">{profile.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="surface-card p-6 sm:p-8"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <HiCheckCircle size={40} className="text-emerald-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Opening your email client</h3>
                <p className="text-sm text-[var(--muted)] mb-6 max-w-xs">
                  Your message is ready to send. If your email app didn&apos;t open, reach me directly
                  at {profile.email}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-white mb-1">Send a message</h3>
                <p className="text-sm text-[var(--muted)] mb-6">
                  Tell me about your role, project, or opportunity.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-[var(--muted)] mb-1.5">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-field"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[var(--muted)] mb-1.5">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field"
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-[var(--muted)] mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input-field resize-none"
                      placeholder="I'd love to discuss a full-stack role / project..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    Send message
                  </button>
                </form>
<a
  href="/resume.pdf"
  download="Mohamed_Ashfaq_Resume.pdf"
  className="mt-4 flex items-center justify-center gap-2 text-sm text-[var(--muted)] hover:text-white transition-colors touch-manipulation"
>
  <HiOutlineDocumentDownload size={16} />
  Download Resume
</a>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
