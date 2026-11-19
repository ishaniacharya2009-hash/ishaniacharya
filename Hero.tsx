"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { site } from "@/content/site";
import { Photo } from "./ui/Photo";
import { SplitReveal } from "./ui/SplitReveal";
import { Modal } from "./ui/Modal";

const ease = [0.22, 0.61, 0.36, 1] as const;

/**
 * The last word of the headline. It runs once through a few facets
 * ("youth voice.", "media."…) and then settles on "everything." for good.
 */
function Everything() {
  const reduceMotion = useReducedMotion();
  const { facets, headlineEnd } = site.hero;
  const words = [...facets, headlineEnd];
  const [step, setStep] = useState(reduceMotion ? words.length - 1 : -1);
  const settled = step >= words.length - 1;

  useEffect(() => {
    if (reduceMotion || settled) return;
    const timer = setTimeout(() => setStep((s) => s + 1), step === -1 ? 1500 : 1050);
    return () => clearTimeout(timer);
  }, [step, settled, reduceMotion]);

  const word = step === -1 ? headlineEnd : words[step];

  if (reduceMotion) return <span className="block italic text-forest">{headlineEnd}</span>;

  return (
    <span className="relative block h-[1.02em] overflow-hidden">
      <span className="sr-only">{headlineEnd}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`${step}-${word}`}
          aria-hidden="true"
          className={`absolute left-0 top-0 whitespace-nowrap italic ${settled || step === -1 ? "text-forest" : "text-sage"}`}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** A typography-led opening: no portrait, one headline, one invitation. */
export function Hero() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const { hero } = site;

  return (
    <section id="home" className="page flex min-h-[calc(100svh-4rem)] flex-col justify-between pb-10 pt-8 sm:pt-12">
      <motion.div
        className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="flex items-center gap-4">
          <Photo
            id={site.profileImage}
            priority
            sizes="3.5rem"
            className="h-14 w-14 shrink-0 overflow-hidden rounded-full"
          />
          <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">{site.name}</h1>
        </div>
        <p className="mono text-charcoal/70">
          {site.studying}
          <span className="mx-3 text-sage">/</span>
          {site.location}
        </p>
      </motion.div>

      <div className="py-14 lg:py-20">
        <p className="display text-[clamp(3.5rem,14.5vw,15rem)] leading-[0.86]" aria-label={`${hero.headlineStart} ${hero.headlineEnd}`}>
          <SplitReveal as="span" immediate text={hero.headlineStart} className="block" delay={0.15} />
          <motion.span
            className="block"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Everything />
          </motion.span>
        </p>
      </div>

      <motion.div
        className="grid items-end gap-x-10 gap-y-8 border-t border-charcoal/25 pt-6 lg:grid-cols-12"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease }}
      >
        <p className="max-w-[44ch] text-lg text-charcoal/85 lg:col-span-4">{hero.supporting}</p>

        {/* Contact, up front */}
        <ul className="space-y-1.5 text-sm lg:col-span-3">
          <li>
            <a href={`mailto:${site.contact.email}`} className="link inline-flex items-center gap-2 break-all font-medium">
              <Mail aria-hidden="true" size={14} strokeWidth={1.75} className="shrink-0 text-forest" />
              {site.contact.email}
            </a>
          </li>
          <li>
            <a
              href={site.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-2 font-medium"
            >
              <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.75} className="shrink-0 text-forest" />
              LinkedIn
            </a>
          </li>
        </ul>

        <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
          <a href={hero.cta.href} className="btn group">
            {hero.cta.label}
            <ArrowDown
              aria-hidden="true"
              size={16}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
          {site.contact.cv && (
            <a href={site.contact.cv} download className="btn-quiet">
              <Download aria-hidden="true" size={16} strokeWidth={1.75} />
              Download CV
            </a>
          )}
          <button type="button" aria-haspopup="dialog" onClick={() => setAboutOpen(true)} className="btn-quiet">
            About me
          </button>
        </div>
      </motion.div>

      <Modal open={aboutOpen} onClose={() => setAboutOpen(false)} label="About me">
        <article className="px-6 pb-16 pt-20 sm:px-12">
          <Photo id={site.profileImage} sizes="14rem" className="mb-8 w-40 sm:w-56" />
          <p className="mono text-forest">About me</p>
          <div className="mt-8 space-y-6">
            {site.about.paragraphs.map((paragraph, i) => (
              <p
                key={paragraph}
                className={i === 0 ? "font-serif text-3xl leading-[1.15] sm:text-4xl" : "text-lg text-charcoal/85"}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </Modal>
    </section>
  );
}
