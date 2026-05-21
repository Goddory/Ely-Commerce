"use client";

import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

/* ─── Classic FadeIn ─── */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialY = shouldReduceMotion ? 0 : directions[direction].y;
  const initialX = shouldReduceMotion ? 0 : directions[direction].x;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: shouldReduceMotion ? 0.3 : 0.7, delay: shouldReduceMotion ? 0 : delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger Container + Item ─── */
export function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: shouldReduceMotion ? 0.02 : 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0.25 : 0.5, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Zipline-inspired: Text Reveal (word-by-word) ─── */
export function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.5, delay }}
        className={className}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.5,
                delay: delay + i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── Zipline-inspired: Scroll-linked Parallax ─── */
export function ParallaxSection({
  children,
  className = "",
  speed = 0.3,
}: {
  children?: ReactNode;
  className?: string;
  speed?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const yNormal = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const yStatic = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const y = shouldReduceMotion ? yStatic : yNormal;

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Zipline-inspired: Scale-on-Scroll ─── */
export function ScaleOnScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const scaleNormal = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);
  const scaleStatic = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const scale = shouldReduceMotion ? scaleStatic : scaleNormal;

  const opacityNormal = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.6]);
  const opacityStatic = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const opacity = shouldReduceMotion ? opacityStatic : opacityNormal;

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Zipline-inspired: Reveal Mask (clip-path reveal on scroll) ─── */
export function RevealOnScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  if (shouldReduceMotion) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Zipline-inspired: Stacking Cards ─── */
export function StackCard({
  children,
  index,
  className = "",
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  
  const yOffsetNormal = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const yOffsetStatic = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const yOffset = shouldReduceMotion ? yOffsetStatic : yOffsetNormal;

  return (
    <motion.div
      ref={ref}
      style={{ y: yOffset, zIndex: index + 1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
