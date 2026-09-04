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
  stack: <HiCode size={20} />,
  mobile: <HiDeviceMobile size={20} />,
  api: <HiDatabase size={20} />,
  server: <HiServer size={20} />,
  cloud: <HiCloud size={20} />,
  shield: <HiShieldCheck size={20} />,
};

export function Services() {
  return (
    <section id="services" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Services"
          title="Useful software, not just interfaces"
          description="I build the systems behind real operations: products that manage people, workflows, data, and the work that happens after launch."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="surface-card p-5 sm:p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/70 mb-4">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-base font-medium text-white mb-1.5">{service.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
