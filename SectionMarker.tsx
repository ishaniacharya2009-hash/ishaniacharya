"use client";

import { motion } from "motion/react";

type Props = {
  /** Position of this section on the page, e.g. 2. */
  index: number;
  total?: number;
  label: string;
  onDark?: boolean;
};

/**
 * Opens a section: a rule draws across the page, with the section's
 * position ("02 / 06") and name. Doubles as a progress marker.
 */
export function SectionMarker({ index, total = 6, label, onDark = false }: Props) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div>
      <motion.div
        aria-hidden="true"
        className={`h-px origin-left ${onDark ? "bg-ivory/30" : "bg-charcoal/25"}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
      />
      <p className={`mono mt-4 flex gap-6 ${onDark ? "text-sage" : "text-forest"}`}>
        <span className="tabular-nums" aria-hidden="true">
          {pad(index)} / {pad(total)}
        </span>
        <span>{label}</span>
      </p>
    </div>
  );
}
