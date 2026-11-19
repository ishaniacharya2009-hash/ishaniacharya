"use client";

import { ArrowUpRight, Mic } from "lucide-react";
import { entries } from "@/lib/archive";
import { useCaseStudy } from "./CaseStudyProvider";

const podcast = entries.find((entry) => entry.layout === "audio");

/** Decorative sound-wave: bar heights in percent. It stirs only on hover. */
const wave = [22, 48, 34, 70, 42, 86, 58, 30, 64, 100, 52, 78, 40, 62, 28, 74, 46, 90, 36, 56, 24, 68, 44, 60, 30, 82, 50, 38, 72, 26, 54, 94, 42, 66, 32, 58];

/**
 * The podcast, given its own band. Nothing here pretends to play audio:
 * the real player is the official one, inside the case study.
 */
export function OnAir() {
  const { open } = useCaseStudy();
  if (!podcast) return null;

  return (
    <section id="on-air" aria-label="Podcast" className="on-forest group bg-charcoal py-16 text-ivory lg:py-20">
      <div className="page grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="mono flex items-center gap-3 text-sage">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-charcoal">
              <Mic aria-hidden="true" size={16} strokeWidth={1.5} />
            </span>
            Webwise podcast, {podcast.date}
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95]">{podcast.title}</h2>
          <p className="mt-4 text-sm font-semibold uppercase tracking-label text-sage">{podcast.role}</p>
        </div>

        <div className="lg:col-span-7">
          <div aria-hidden="true" className="flex h-24 items-center gap-[3px] sm:gap-1">
            {wave.map((height, i) => (
              <span
                key={i}
                className="w-full origin-center bg-ivory/80 transition-transform duration-700 group-hover:scale-y-[0.5] even:group-hover:scale-y-[1.3]"
                style={{ height: `${height}%`, transitionDelay: `${i * 10}ms` }}
              />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
            <p className="max-w-[46ch] text-ivory/80">{podcast.summary}</p>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => open(podcast.slug)}
              className="inline-flex items-center gap-2 bg-ivory px-6 py-3 text-sm font-medium text-charcoal transition-colors duration-300 hover:bg-sage"
            >
              Open the episode
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
