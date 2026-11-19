"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** "fade" lifts text into place; "image" unveils a photograph from the bottom edge. */
  variant?: "fade" | "image";
};

const ease = [0.22, 0.61, 0.36, 1] as const;

/** Reveals its children once, the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, variant = "fade" }: Props) {
  const hidden =
    variant === "image"
      ? { opacity: 0, clipPath: "inset(0 0 12% 0)" }
      : { opacity: 0, y: 14 };
  const shown =
    variant === "image"
      ? { opacity: 1, clipPath: "inset(0 0 0% 0)" }
      : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
