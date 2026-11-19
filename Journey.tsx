"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { chapters } from "@/content/journey";
import { entries } from "@/lib/archive";
import { SectionMarker } from "./ui/SectionMarker";
import { useCaseStudy } from "./CaseStudyProvider";

const ease = [0.22, 0.61, 0.36, 1] as const;

/** Each chapter gets its own colours, so changing year changes the room. */
const themes = [
  { bg: "#244735", fg: "#F7F6F0", dark: true },
  { bg: "#F7F6F0", fg: "#222822", dark: false },
  { bg: "#DFE1D8", fg: "#222822", dark: false },
  { bg: "#222822", fg: "#F7F6F0", dark: true },
];

/**
 * The Journey: an overview by year, newest first. It names what happened
 * and how much; the full stories stay in the archive, one click away.
 */
export function Journey() {
  const { open } = useCaseStudy();
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const chapter = chapters[index];
  const theme = themes[index % themes.length];
  const inYear = entries.filter((entry) => entry.year === chapter.year);
  const tally = Object.entries(
    inYear.reduce<Record<string, number>>((acc, entry) => ({ ...acc, [entry.kind]: (acc[entry.kind] ?? 0) + 1 }), {}),
  );
  const last = chapters.length - 1;
  const chapterNumber = chapters.length - index;

  const go = (next: number, focus = false) => {
    const clamped = Math.max(0, Math.min(last, next));
    setIndex(clamped);
    if (focus) tabs.current[clamped]?.focus();
  };

  const line = theme.dark ? "border-ivory/25" : "border-charcoal/25";

  return (
    <motion.section
      id="journey"
      className={`py-20 lg:py-28 ${theme.dark ? "on-forest" : ""}`}
      initial={false}
      animate={{ backgroundColor: theme.bg, color: theme.fg }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="page">
        <SectionMarker index={3} label="Journey" onDark={theme.dark} />
        <h2 className="sr-only">My journey, year by year, starting from the most recent</h2>

        {/* Year navigation */}
        <div
          role="tablist"
          aria-label="Choose a year"
          className={`mt-10 grid border-y ${line}`}
          style={{ gridTemplateColumns: `repeat(${chapters.length}, minmax(0, 1fr))` }}
        >
          {chapters.map((item, i) => {
            const selected = i === index;
            return (
              <button
                key={item.year}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`journey-tab-${item.year}`}
                aria-selected={selected}
                aria-controls="journey-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => go(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") go(i + 1, true);
                  if (e.key === "ArrowLeft") go(i - 1, true);
                  if (e.key === "Home") go(0, true);
                  if (e.key === "End") go(last, true);
                }}
                className={`relative py-4 text-left font-mono text-sm transition-opacity duration-300 hover:opacity-100 sm:text-base ${
                  selected ? "opacity-100" : "opacity-45"
                } ${i > 0 ? `border-l pl-4 sm:pl-6 ${line}` : ""}`}
              >
                {item.year}
                {selected && (
                  <motion.span
                    layoutId="journey-marker"
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-px h-[3px]"
                    style={{ backgroundColor: "currentColor" }}
                    transition={{ duration: 0.6, ease }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          id="journey-panel"
          role="tabpanel"
          aria-labelledby={`journey-tab-${chapter.year}`}
          className="mt-10 grid gap-x-12 gap-y-12 lg:grid-cols-12"
        >
          {/* The chapter */}
          <div className="lg:col-span-7">
            <p className="mono opacity-60">
              Chapter {String(chapterNumber).padStart(2, "0")} of {String(chapters.length).padStart(2, "0")}
            </p>
            <div
              aria-hidden="true"
              className="relative mt-2 h-[0.82em] overflow-hidden font-serif text-[clamp(7.5rem,24vw,22rem)] leading-[0.82] tracking-[-0.04em] lining-nums"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={chapter.year}
                  className="absolute left-0 top-0 flex"
                  initial="from"
                  animate="to"
                  exit="gone"
                  transition={{ staggerChildren: 0.05 }}
                >
                  {Array.from(chapter.year).map((digit, i) => (
                    <motion.span
                      key={i}
                      variants={{ from: { y: "100%" }, to: { y: 0 }, gone: { y: "-100%" } }}
                      transition={{ duration: 0.6, ease }}
                    >
                      {digit}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={chapter.year}
                className="mt-8 max-w-[24ch] font-serif text-3xl italic leading-[1.1] sm:text-[2.75rem]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
              >
                {chapter.headline}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* What's in it: a tally and the names, each opening its case study */}
          <div className="lg:col-span-5 lg:pt-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={chapter.year}
                initial="hidden"
                animate="shown"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, transition: { duration: 0.2 } },
                  shown: { opacity: 1, transition: { staggerChildren: 0.05 } },
                }}
              >
                <dl className="flex flex-wrap gap-x-10 gap-y-4">
                  {tally.map(([kind, count]) => (
                    <div key={kind} className="flex items-baseline gap-3">
                      <dd className="text-5xl font-extralight leading-none tracking-[-0.04em]">{count}</dd>
                      <dt className="mono opacity-70">{kind}</dt>
                    </div>
                  ))}
                </dl>

                <ul className={`mt-8 border-t ${line}`}>
                  {inYear.map((entry) => (
                    <motion.li
                      key={entry.slug}
                      className={`border-b ${line}`}
                      variants={{ hidden: { opacity: 0, x: -10 }, shown: { opacity: 1, x: 0 } }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => open(entry.slug)}
                        className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 py-3 text-left"
                      >
                        <span className="font-mono text-xs opacity-60">{entry.number}</span>
                        <span className="font-medium underline-offset-4 group-hover:underline">{entry.title}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          size={16}
                          strokeWidth={1.5}
                          className="self-center opacity-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>

                {chapter.also && (
                  <ul className="mt-6 space-y-2 text-sm opacity-80">
                    {chapter.also.map((item) => (
                      <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-x-3">
                        <span aria-hidden="true" className="font-mono text-xs opacity-60">
                          +
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
