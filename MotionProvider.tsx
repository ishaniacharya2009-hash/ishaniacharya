"use client";

import { MotionConfig } from "motion/react";

/** Makes every animation on the site respect the visitor's reduced-motion setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
