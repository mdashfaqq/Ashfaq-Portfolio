import { motion } from "framer-motion";
import {
  HiCode,
  HiDeviceMobile,
  HiServer,
  HiCloud,
  HiShieldCheck,
  HiDatabase,
} from "react-icons/hi";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  stack: <HiCode size={24} />,
  mobile: <HiDeviceMobile size={24} />,
  api: <HiDatabase size={24} />,
  server: <HiServer size={24} />,
  cloud: <HiCloud size={24} />,
  shield: <HiShieldCheck size={24} />,
};

export function Services() {
  return (
    <section id="services" className="section-padding relative bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Services"
          title="What I can build for you"
          description="From mobile apps to secure APIs and production deployment."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-7 group hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/10 flex items-center justify-center text-[var(--primary)] mb-5 group-hover:scale-110 transition-transform">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
