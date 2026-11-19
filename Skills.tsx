"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { education } from "@/content/education";
import { skillEvidence, skillLists } from "@/content/skills";
import { findEntry } from "@/lib/archive";
import { SectionMarker } from "./ui/SectionMarker";
import { useCaseStudy } from "./CaseStudyProvider";

const ease = [0.22, 0.61, 0.36, 1] as const;

/**
 * Skills with evidence: choose a skill, see the experiences behind it,
 * open any of them. Education sits underneath, kept small.
 */
export function Skills() {
  const { open } = useCaseStudy();
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = skillEvidence[index];
  const evidence = current.evidence.map(findEntry).filter((entry) => entry !== undefined);

  const go = (next: number) => {
    const wrapped = (next + skillEvidence.length) % skillEvidence.length;
    setIndex(wrapped);
    tabs.current[wrapped]?.focus();
  };

  return (
    <section id="skills" className="py-20 lg:py-28">
      <div className="page">
        <SectionMarker index={4} label="Skills, with evidence" />

        <div className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="mono text-charcoal/60">Select a skill</h2>
            <div
              role="tablist"
              aria-label="Skills"
              aria-orientation="vertical"
              className="mt-4 flex flex-wrap gap-x-6 gap-y-1 lg:flex-col lg:items-start lg:gap-0"
            >
              {skillEvidence.map((item, i) => {
                const selected = i === index;
                return (
                  <button
                    key={item.skill}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`skill-tab-${i}`}
                    aria-selected={selected}
                    aria-controls="skill-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setIndex(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown" || e.key === "ArrowRight") go(i + 1);
                      if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(i - 1);
                    }}
                    className={`group flex items-baseline gap-3 text-left text-[clamp(1.625rem,4.6vw,4rem)] leading-[1.12] tracking-[-0.035em] transition-all duration-500 ${
                      selected ? "font-medium text-forest lg:translate-x-4" : "font-light text-charcoal/35 hover:text-charcoal/70"
                    }`}
                  >
                    {item.skill}
                    <span
                      className={`font-mono text-xs tracking-normal transition-opacity duration-300 ${
                        selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {String(item.evidence.length + (item.note ? 1 : 0)).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${index}`}
            className="min-h-[19rem] lg:col-span-5 lg:pt-9"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.skill}
                initial="hidden"
                animate="shown"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, transition: { duration: 0.15 } },
                  shown: { opacity: 1, transition: { staggerChildren: 0.07 } },
                }}
              >
                <p className="mono text-forest">Where I've used it</p>
                <ul className="mt-4 border-t border-charcoal/25">
                  {evidence.map((entry) => (
                    <motion.li
                      key={entry.slug}
                      className="border-b border-charcoal/25"
                      variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => open(entry.slug)}
                        className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 py-4 text-left"
                      >
                        <span className="font-mono text-xs text-forest">{entry.number}</span>
                        <span>
                          <span className="block text-lg font-medium leading-snug transition-colors duration-300 group-hover:text-forest">
                            {entry.title}
                          </span>
                          <span className="mt-0.5 block text-sm text-charcoal/65">
                            {entry.role}
                            {entry.year ? `, ${entry.year}` : ""}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          size={18}
                          strokeWidth={1.5}
                          className="self-center text-charcoal/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest"
                        />
                      </button>
                    </motion.li>
                  ))}
                  {current.note && (
                    <motion.li
                      className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-charcoal/25 py-4"
                      variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
                    >
                      <span aria-hidden="true" className="font-mono text-xs text-forest">
                        +
                      </span>
                      <span className="text-lg leading-snug">{current.note}</span>
                    </motion.li>
                  )}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Supporting lists */}
        <dl className="mt-16 grid gap-x-12 gap-y-8 border-t border-charcoal/25 pt-8 md:grid-cols-3">
          {skillLists.map((list) => (
            <div key={list.title}>
              <dt className="mono text-charcoal/60">{list.title}</dt>
              <dd className="mt-3 text-charcoal/85">{list.items.join(", ")}</dd>
            </div>
          ))}
        </dl>

        {/* Education: deliberately small */}
        <div id="education" className="mt-16 scroll-mt-24 border-t border-charcoal/25 pt-8">
          <h2 className="mono text-charcoal/60">Education</h2>
          <ul className="mt-6 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {education.map((item) => (
              <li key={item.title}>
                <p className="font-mono text-sm text-forest">{item.dates}</p>
                <p className="mt-2 font-serif text-4xl leading-none">{item.title}</p>
                <p className="mt-2 font-medium">{item.organisation}</p>
                {item.note && <p className="mt-1 text-sm text-charcoal/65">{item.note}</p>}
                {item.areas && <p className="mt-4 max-w-[52ch] text-sm text-charcoal/65">{item.areas.join(", ")}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
