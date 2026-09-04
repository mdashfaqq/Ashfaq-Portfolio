import { motion } from 'framer-motion';
import { ReactNode, HTMLAttributes } from 'react';

interface FadeInProps extends HTMLAttributes<'div'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

const easing = [0.25, 0.1, 0.25, 1] as const;

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.7, 
  x = 0, 
  y = 30,
  ...props 
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: easing }}
      {...props}
    >
      {children}
    </motion.div>
  );
}