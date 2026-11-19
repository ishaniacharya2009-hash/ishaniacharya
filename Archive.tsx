"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Mic } from "lucide-react";
import { entries, kinds } from "@/lib/archive";
import { SectionMarker } from "./ui/SectionMarker";
import { SplitReveal } from "./ui/SplitReveal";
import { hasPhoto, Photo } from "./ui/Photo";
import { useCaseStudy } from "./CaseStudyProvider";

const ease = [0.22, 0.61, 0.36, 1] as const;

/**
 * The centrepiece: a numbered index of every experience. Filter it by kind,
 * hover a row to preview how its story opens, select it for the full case study.
 */
export function Archive() {
  const { open } = useCaseStudy();
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const shown = entries.filter((entry) => kind === "All" || entry.kind === kind);

  return (
    <section id="archive" className="border-t border-stone py-20 lg:py-28">
      <div className="page">
        <SectionMarker index={2} label="Experience Archive" />

        <div className="mt-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <SplitReveal
            text="The archive."
            className="display text-[clamp(3.5rem,10vw,9rem)] leading-[0.86]"
          />

          <div role="group" aria-label="Filter the archive" className="flex flex-wrap gap-2">
            {kinds.map((name) => {
              const selected = name === kind;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setKind(name)}
                  className={`border px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    selected
                      ? "border-forest bg-forest text-ivory"
                      : "border-charcoal/30 hover:border-forest hover:text-forest"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        <ol className="mt-12 border-t border-charcoal/25" aria-live="polite">
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((entry) => (
              <motion.li
                key={entry.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="border-b border-charcoal/25"
              >
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => open(entry.slug)}
                  className="group relative grid w-full grid-cols-[2.75rem_1fr_auto] gap-x-4 px-0 py-6 text-left transition-[background-color,color,padding] duration-500 hover:bg-forest hover:px-4 hover:text-ivory focus-visible:bg-forest focus-visible:px-4 focus-visible:text-ivory sm:gap-x-8 lg:grid-cols-[4.5rem_minmax(0,5fr)_minmax(0,5fr)_5rem_1.5rem] lg:items-start lg:py-7 lg:hover:px-6 lg:focus-visible:px-6"
                >
                  <span className="font-mono text-sm text-forest transition-colors duration-500 group-hover:text-sage group-focus-visible:text-sage lg:pt-1.5">
                    {entry.number}
                  </span>

                  <span>
                    <span className="flex items-center gap-3 text-[1.375rem] font-medium leading-tight tracking-tight sm:text-[1.75rem]">
                      {entry.title}
                      {entry.layout === "audio" && (
                        <Mic aria-label="Podcast" size={18} strokeWidth={1.5} className="shrink-0" />
                      )}
                    </span>
                    <span className="mt-2 block text-sm opacity-70">
                      {[entry.organisation !== entry.title && entry.organisation, entry.role]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </span>

                  {/* The one sentence. On hover it gives way to the case study's opening line. */}
                  <span
                    className={`relative col-span-2 col-start-2 mt-3 block lg:col-span-1 lg:col-start-auto lg:mt-1 ${
                      ""
                    }`}
                  >
                    <span className="block opacity-80 transition-opacity duration-300 lg:group-hover:opacity-0 lg:group-focus-visible:opacity-0">
                      {entry.summary}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 hidden translate-y-2 font-serif text-2xl italic leading-tight opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 lg:block ${
                        hasPhoto(entry.cover) ? "xl:pr-44" : ""
                      }`}
                    >
                      {entry.opening}
                    </span>
                  </span>

                  <span className="col-start-3 row-start-1 font-mono text-sm opacity-70 lg:col-start-auto lg:row-start-auto lg:pt-1.5">
                    {entry.year || "–"}
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.5}
                    className="hidden opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 lg:mt-1 lg:block"
                  />

                  {/* On hover a small photograph is unveiled in a fixed 3:2 frame, squared to the row */}
                  {hasPhoto(entry.cover) && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-5 right-[12.5rem] top-5 hidden aspect-[3/2] overflow-hidden transition-[clip-path] duration-700 ease-out [clip-path:inset(0_0_0_100%)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)] xl:block"
                    >
                      <Photo id={entry.cover} frame={3 / 2} sizes="12rem" className="h-full [&>div]:h-full" />
                    </span>
                  )}
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>

      </div>
    </section>
  );
}
