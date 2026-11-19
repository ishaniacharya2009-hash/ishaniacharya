"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { badminton, creativeMedia, dance } from "@/content/interests";
import type { DanceStyle } from "@/content/types";
import { SectionMarker } from "./ui/SectionMarker";

/**
 * How each dance style is set and how its letters arrive:
 *   classical  upright italic serif, letters placed one after another, precisely
 *   flowing    wide-spaced serif, letters drifting in on a curve
 *   street     heavy sans, letters dropping in at angles
 */
const voices: Record<DanceStyle["voice"], { className: string; letter: Variants; stagger: number }> = {
  classical: {
    className: "font-serif italic tracking-[-0.02em]",
    letter: {
      from: { y: "60%", opacity: 0 },
      to: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
    },
    stagger: 0.05,
  },
  flowing: {
    className: "font-serif font-light tracking-[0.12em]",
    letter: {
      from: { x: "-0.4em", y: "0.25em", rotate: -8, opacity: 0 },
      to: { x: 0, y: 0, rotate: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
    },
    stagger: 0.08,
  },
  street: {
    className: "font-sans font-black uppercase tracking-[-0.06em]",
    letter: {
      from: { y: "-70%", rotate: 14, opacity: 0 },
      to: { y: 0, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 420, damping: 16 } },
    },
    stagger: 0.035,
  },
};

/** Dance, then creative media and badminton. No photographs needed. */
export function Beyond() {
  const [active, setActive] = useState(0);
  const style = dance.styles[active];
  const voice = voices[style.voice];

  return (
    <section id="beyond" className="bg-stone/60 py-20 lg:py-28">
      <div className="page">
        <SectionMarker index={5} label="Beyond Work" />
        <h2 className="sr-only">Beyond the work</h2>

        {/* Dance */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
            <h3 className="mono text-charcoal/60">Dance, choose a style</h3>
            <div role="group" aria-label="Dance styles" className="flex flex-wrap gap-2">
              {dance.styles.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                  className={`border px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    i === active
                      ? "border-forest bg-forest text-ivory"
                      : "border-charcoal/30 hover:border-forest hover:text-forest"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* The stage: the style's name, set and moved in its own way */}
          <div className="mt-8 flex min-h-[8.5rem] items-center overflow-hidden border-y border-charcoal/25 py-6 sm:min-h-[13rem] lg:min-h-[17rem]" aria-live="polite">
            <motion.p
              key={style.name}
              aria-label={style.name}
              className={`whitespace-nowrap text-[clamp(2.75rem,13vw,13rem)] leading-none text-forest ${voice.className}`}
              initial="from"
              animate="to"
              transition={{ staggerChildren: voice.stagger }}
            >
              {Array.from(style.name).map((letter, i) => (
                <motion.span key={i} aria-hidden="true" className="inline-block" variants={voice.letter}>
                  {letter}
                </motion.span>
              ))}
            </motion.p>
          </div>

          <div className="mt-8 grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <motion.div
              key={style.name}
              className="flex items-end gap-5 lg:col-span-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {style.years && (
                <p className="flex items-end gap-3">
                  <span className="text-[5.5rem] font-extralight leading-[0.8] tracking-[-0.05em] text-forest">
                    {style.years}
                  </span>
                  <span className="mono pb-1 text-charcoal/65">
                    years
                    {style.approximate && (
                      <>
                        ,<br />
                        approx.
                      </>
                    )}
                  </span>
                </p>
              )}
              <p className="pb-0.5 font-serif text-3xl italic leading-none">{style.note}</p>
            </motion.div>
            <p className="text-charcoal/85 lg:col-span-6 lg:col-start-7">{dance.intro}</p>
          </div>
        </div>

        {/* Creative media and badminton */}
        <div className="mt-20 grid gap-px bg-charcoal/25 lg:grid-cols-2">
          <article className="bg-[#ebece5] p-6 sm:p-10">
            <h3 className="mono text-charcoal/60">{creativeMedia.title}</h3>
            <ul className="mt-6">
              {creativeMedia.items.map((item) => (
                <li
                  key={item}
                  className="origin-left font-serif text-[clamp(2rem,3.4vw,3rem)] leading-[1.15] text-charcoal/45 transition-all duration-500 hover:translate-x-3 hover:italic hover:text-forest"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="bg-forest p-6 text-ivory sm:p-10">
            <h3 className="mono text-sage">{badminton.title}</h3>
            <dl className="mt-6 grid grid-cols-3 gap-4">
              {badminton.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse">
                  <dt className="mono mt-3 text-sage">{fact.label}</dt>
                  <dd className="text-[clamp(2.75rem,5.5vw,5rem)] font-extralight leading-[0.85] tracking-[-0.05em]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-[46ch] text-ivory/85">{badminton.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
