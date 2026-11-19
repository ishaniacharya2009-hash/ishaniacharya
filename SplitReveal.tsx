"use client";

import { motion } from "motion/react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  /** Split into "words" (section headings) or "letters" (the hero name). */
  by?: "words" | "letters";
  /** Play on page load instead of waiting to scroll into view. */
  immediate?: boolean;
};

const ease = [0.22, 0.61, 0.36, 1] as const;

/**
 * A staggered text reveal: each word (or letter) rises out of a mask, once.
 * Screen readers get the plain text; reduced-motion visitors see it in place.
 */
export function SplitReveal({ text, as: Tag = "h2", className, delay = 0, by = "words", immediate = false }: Props) {
  const parts = by === "letters" ? Array.from(text) : text.split(" ");
  const step = by === "letters" ? 0.045 : 0.07;

  return (
    <Tag className={`${className ?? ""} ${by === "letters" ? "whitespace-nowrap" : ""}`} aria-label={text}>
      {parts.map((part, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            {...(immediate
              ? { animate: { y: 0 } }
              : { whileInView: { y: 0 }, viewport: { once: true, margin: "0px 0px -12% 0px" } })}
            transition={{ duration: 0.9, delay: delay + i * step, ease }}
          >
            {part}
            {by === "words" && i < parts.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
