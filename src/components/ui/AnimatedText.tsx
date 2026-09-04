import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

function AnimatedChar({ 
  char, 
  index, 
  total, 
  scrollProgress 
}: { 
  char: string; 
  index: number; 
  total: number;
  scrollProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollProgress, [start, end], [0.2, 1]);
  
  return (
    <motion.span
      style={{ 
        opacity,
        display: char === ' ' ? 'inline' : 'inline-block'
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

export function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  return (
    <p ref={containerRef} className={className} style={style}>
      {text.split('').map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          index={i}
          total={text.length}
          scrollProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}