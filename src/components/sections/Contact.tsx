import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineDocumentDownload,
  HiCheckCircle,
  HiOutlineClipboardCopy,
  HiCheck,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";
import { sendContactEmail } from "@/services/email";

// const trustPoints = [
//   "6+ products shipped end-to-end",
//   "2 live production deployments",
//   "Full-stack: mobile, web, and APIs",
// ];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      await sendContactEmail({
        name: form.name,
        email: form.email,
        message: form.message,
        subject: `Portfolio Inquiry from ${form.name || "Visitor"}`,
      });
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error("Failed to send message via Resend:", err);
      setErrorMessage(
        err.message || "Failed to send message. Please try again or email directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="pt-20 sm:pt-28 pb-6 sm:pb-10 px-5 sm:px-8 lg:px-16">
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
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all group">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 min-w-0 flex-1 touch-manipulation"
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

                {/* Copy Email Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="ml-2 px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.1] text-xs text-white/70 hover:text-white transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[11px]"
                      >
                        <HiCheck size={14} />
                        <span>Copied</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1 font-mono text-[11px]"
                      >
                        <HiOutlineClipboardCopy size={14} />
                        <span className="hidden sm:inline">Copy</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

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
                <HiCheckCircle size={48} className="text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Message sent successfully!</h3>
                <p className="text-sm text-[var(--muted)] mb-6 max-w-xs leading-relaxed">
                  Thank you for reaching out. Your email has been delivered via Resend directly to {profile.email}.
                  I will get back to you shortly.
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

                {errorMessage && (
                  <div className="mb-4 p-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 text-xs flex items-start gap-2.5">
                    <HiOutlineExclamationCircle size={18} className="shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

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
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending message...</span>
                      </>
                    ) : (
                      "Send message"
                    )}
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
