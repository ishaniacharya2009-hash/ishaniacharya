"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Mic, X } from "lucide-react";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { entries, total, type NumberedEntry } from "@/lib/archive";
import { hasPhoto, Photo } from "./ui/Photo";

const ease = [0.22, 0.61, 0.36, 1] as const;

type Props = {
  entry: NumberedEntry;
  onClose: () => void;
  onNavigate: (slug: string) => void;
};

/**
 * The full-screen case study. The top of the page changes with the entry's
 * `layout` (photo, type, audio or process); the body underneath is shared.
 */
export function CaseStudy({ entry, onClose, onNavigate }: Props) {
  const previous = entries[(entry.index - 1 + entries.length) % entries.length];
  const next = entries[(entry.index + 1) % entries.length];
  const photos = [entry.cover, ...(entry.gallery ?? [])].filter(hasPhoto) as string[];
  const dark = entry.layout === "audio";

  return (
    <article className={dark ? "min-h-dvh bg-charcoal text-ivory on-forest" : "min-h-dvh"}>
      {/* Bar: where you are in the archive, and the way out */}
      <header
        className={`sticky top-0 z-10 border-b ${
          dark ? "border-ivory/15 bg-charcoal" : "border-stone bg-ivory"
        }`}
      >
        <div className="page flex h-14 items-center justify-between gap-4">
          <p className="mono">
            <span className={dark ? "text-sage" : "text-forest"}>{entry.number}</span> / {total}
            <span className="ml-4 hidden opacity-60 sm:inline">{entry.kind}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onNavigate(previous.slug)}
              className="flex h-11 w-11 items-center justify-center transition-opacity duration-300 hover:opacity-60"
            >
              <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.5} />
              <span className="sr-only">Previous: {previous.title}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(next.slug)}
              className="flex h-11 w-11 items-center justify-center transition-opacity duration-300 hover:opacity-60"
            >
              <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
              <span className="sr-only">Next: {next.title}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 flex h-11 items-center gap-2 pl-3 text-sm font-medium transition-opacity duration-300 hover:opacity-60"
            >
              Close
              <X aria-hidden="true" size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        {entry.layout === "photo" && <PhotoLead entry={entry} cover={photos[0]} />}
        {entry.layout === "type" && <TypeLead entry={entry} />}
        {entry.layout === "audio" && <AudioLead entry={entry} />}
        {entry.layout === "process" && <ProcessLead entry={entry} />}

        <Body entry={entry} dark={dark} photos={entry.layout === "photo" ? photos.slice(1) : photos} />

        {/* On to the next one */}
        <button
          type="button"
          onClick={() => onNavigate(next.slug)}
          className={`group block w-full border-t text-left transition-colors duration-500 ${
            dark
              ? "border-ivory/15 hover:bg-ivory hover:text-charcoal"
              : "border-stone hover:bg-forest hover:text-ivory"
          }`}
        >
          <span className="page flex items-center justify-between gap-6 py-10">
            <span>
              <span className="mono block opacity-60">Next, {next.number}</span>
              <span className="mt-2 block font-serif text-4xl leading-none sm:text-6xl">{next.title}</span>
            </span>
            <ArrowRight
              aria-hidden="true"
              size={32}
              strokeWidth={1}
              className="shrink-0 transition-transform duration-500 group-hover:translate-x-2"
            />
          </span>
        </button>
      </motion.div>
    </article>
  );
}

/* ───────────────────────── Leads: one per layout ───────────────────────── */

function Meta({ entry, dark = false }: { entry: NumberedEntry; dark?: boolean }) {
  const items = [
    { label: "Role", value: entry.role },
    { label: "With", value: entry.organisation },
    { label: "When", value: entry.date },
    { label: "Where", value: entry.location },
  ].filter((item) => item.value);

  return (
    <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className={`border-t pt-3 ${dark ? "border-ivory/25" : "border-charcoal/25"}`}>
          <dt className="mono opacity-60">{item.label}</dt>
          <dd className="mt-1.5 font-medium leading-snug">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Photography-led: title, then the cover at full width (or one large word until it exists). */
function PhotoLead({ entry, cover }: { entry: NumberedEntry; cover?: string }) {
  return (
    <div>
      <div className="page pb-10 pt-12 lg:pt-20">
        <h2 className="display max-w-[14ch] text-[clamp(3rem,9vw,8.5rem)] leading-[0.9]">{entry.title}</h2>
        <p className="mt-8 max-w-[30ch] font-serif text-2xl italic leading-snug text-forest sm:text-3xl">
          {entry.opening}
        </p>
      </div>

      {cover ? (
        <motion.div
          className="page"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
        >
          <Photo id={cover} frame={16 / 9} sizes="(min-width: 1440px) 80rem, 100vw" showCaption priority />
        </motion.div>
      ) : (
        entry.motif && (
          <div aria-hidden="true" className="overflow-hidden bg-forest">
            <motion.p
              className="page whitespace-nowrap py-6 font-serif text-[clamp(5rem,19vw,17rem)] italic leading-[0.95] text-ivory"
              initial={{ x: "8%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease }}
            >
              {entry.motif}
            </motion.p>
          </div>
        )
      )}

      <div className="page pt-10">
        <Meta entry={entry} />
      </div>
    </div>
  );
}

/** Typography-led: the opening statement, set large on forest green. */
function TypeLead({ entry }: { entry: NumberedEntry }) {
  return (
    <div className="on-forest bg-forest text-ivory">
      <div className="page pb-12 pt-12 lg:pb-16 lg:pt-20">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">{entry.title}</h2>
        <p className="mt-8 max-w-[18ch] font-serif text-[clamp(2.75rem,7.5vw,7rem)] italic leading-[0.98]">
          {entry.opening}
        </p>
        <div className="mt-14">
          <Meta entry={entry} dark />
        </div>
      </div>
    </div>
  );
}

/** Audio-led: artwork drawn in CSS, the episode details, and the official player on request. */
function AudioLead({ entry }: { entry: NumberedEntry }) {
  const [playerLoaded, setPlayerLoaded] = useState(false);

  return (
    <div className="page grid items-center gap-x-16 gap-y-12 pb-12 pt-12 lg:grid-cols-12 lg:pt-20">
      {/* Episode artwork: an illustration, not a photograph or a player */}
      <div
        aria-hidden="true"
        className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden bg-forest lg:col-span-5 lg:max-w-none"
      >
        {[92, 72, 52, 32].map((size, i) => (
          <motion.span
            key={size}
            className="absolute left-1/2 top-1/2 rounded-full border border-ivory/30"
            style={{ width: `${size}%`, height: `${size}%`, x: "-50%", y: "-50%" }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1 * (3 - i), ease }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 flex h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-forest">
          <Mic size={28} strokeWidth={1.5} />
        </span>
        <span className="mono absolute left-5 top-5 text-ivory/80">Casting the Net</span>
        <span className="mono absolute bottom-5 right-5 text-ivory/80">Webwise</span>
      </div>

      <div className="lg:col-span-7">
        <p className="mono text-sage">Podcast episode, {entry.date}</p>
        <h2 className="display mt-5 text-[clamp(2.75rem,6.5vw,6rem)] leading-[0.92]">{entry.title}</h2>
        <p className="mt-6 max-w-[26ch] font-serif text-2xl italic leading-snug text-sage sm:text-3xl">
          {entry.opening}
        </p>

        {entry.embed && (
          <div className="mt-10">
            {playerLoaded ? (
              <>
                <iframe
                  title={`${entry.title} on ${entry.embed.provider}`}
                  src={entry.embed.src}
                  width="100%"
                  height="152"
                  loading="lazy"
                  allow="encrypted-media; clipboard-write"
                  className="block border-0"
                />
                <p className="mt-3 text-sm text-ivory/60">
                  Player not showing?{" "}
                  <a
                    href={entry.embed.fallbackHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-ivory"
                  >
                    Open the episode on {entry.embed.provider}
                  </a>
                  .
                </p>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setPlayerLoaded(true)}
                className="inline-flex items-center gap-3 bg-ivory px-6 py-3.5 text-sm font-medium text-charcoal transition-colors duration-300 hover:bg-sage"
              >
                <span aria-hidden="true" className="h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-forest" />
                Load the {entry.embed.provider} player
              </button>
            )}
          </div>
        )}

        <div className="mt-12">
          <Meta entry={entry} dark />
        </div>
      </div>
    </div>
  );
}

/** Process-led: an explanatory diagram the visitor can step through. */
function ProcessLead({ entry }: { entry: NumberedEntry }) {
  const steps = entry.process?.steps ?? [];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="page pb-10 pt-12 lg:pt-20">
        <h2 className="display max-w-[16ch] text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92]">{entry.title}</h2>
        <p className="mt-8 max-w-[32ch] font-serif text-2xl italic leading-snug text-forest sm:text-3xl">
          {entry.opening}
        </p>
      </div>

      {steps.length > 0 && (
        <div className="bg-stone/60 py-10 lg:py-14">
          <div className="page">
            <p className="mono text-charcoal/60">{entry.process?.caption}</p>

            <div
              data-arrow-keys
              role="tablist"
              aria-label="Steps of a training day"
              className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {steps.map((step, i) => {
                const selected = i === active;
                const reached = i <= active;
                return (
                  <button
                    key={step.name}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="process-panel"
                    id={`process-tab-${i}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      const move = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
                      if (!move) return;
                      const nextIndex = Math.max(0, Math.min(steps.length - 1, i + move));
                      setActive(nextIndex);
                      document.getElementById(`process-tab-${nextIndex}`)?.focus();
                    }}
                    className={`relative border p-5 text-left transition-colors duration-500 ${
                      selected
                        ? "border-forest bg-forest text-ivory"
                        : reached
                          ? "border-forest bg-ivory text-forest"
                          : "border-charcoal/25 bg-ivory hover:border-forest"
                    }`}
                  >
                    <span className="mono block opacity-70">Step {i + 1}</span>
                    <span className="mt-6 block text-xl font-medium tracking-tight">{step.name}</span>
                    {i < steps.length - 1 && (
                      <ArrowRight
                        aria-hidden="true"
                        size={16}
                        strokeWidth={1.5}
                        className="absolute right-4 top-5 hidden opacity-60 lg:block"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div
              id="process-panel"
              role="tabpanel"
              aria-labelledby={`process-tab-${active}`}
              className="mt-8 min-h-[6.5rem]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active}
                  className="max-w-[32ch] font-serif text-3xl leading-[1.1] sm:text-4xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {steps[active].text}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      <div className="page pt-10">
        <Meta entry={entry} />
      </div>
    </div>
  );
}

/* ───────────────────────────── Shared body ───────────────────────────── */

/** One photograph on its own: landscape ones run wide, portrait ones sit in a neat 4:5 frame. */
function SinglePhoto({ id, dark }: { id: string; dark: boolean }) {
  const portrait = (images[id]?.ratio ?? 1) < 1;
  return portrait ? (
    <div className="mt-5 w-full max-w-sm">
      <Photo id={id} frame={4 / 5} sizes="24rem" showCaption onDark={dark} />
    </div>
  ) : (
    <div className="mt-5 max-w-4xl">
      <Photo id={id} frame={3 / 2} sizes="(min-width: 1024px) 56rem, 100vw" showCaption onDark={dark} />
    </div>
  );
}

function Body({ entry, dark, photos }: { entry: NumberedEntry; dark: boolean; photos: string[] }) {
  const rule = dark ? "border-ivory/20" : "border-charcoal/20";
  const soft = dark ? "text-ivory/80" : "text-charcoal/85";
  const aboutWebwise = entry.organisation.includes("Webwise");

  return (
    <div className="page py-14 lg:py-20">
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <section className="lg:col-span-6">
          <h3 className="mono opacity-60">What I contributed</h3>
          <ol className={`mt-5 border-t ${rule}`}>
            {entry.contributed.map((line, i) => (
              <li key={line} className={`grid grid-cols-[2.5rem_1fr] border-b py-4 ${rule}`}>
                <span className={`mono pt-1.5 ${dark ? "text-sage" : "text-forest"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg leading-snug">{line}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="space-y-12 lg:col-span-5 lg:col-start-8">
          <section>
            <h3 className="mono opacity-60">What it involved</h3>
            <p className={`mt-5 text-lg leading-relaxed ${soft}`}>{entry.involved}</p>
          </section>

          <section>
            <h3 className="mono opacity-60">Skills demonstrated</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {entry.skills.map((skill) => (
                <li key={skill} className={`border px-3 py-1.5 text-sm ${dark ? "border-ivory/30" : "border-charcoal/30"}`}>
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          {entry.links && (
            <section>
              <h3 className="mono opacity-60">Official sources</h3>
              <ul className="mt-4 space-y-2">
                {entry.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium underline decoration-sage underline-offset-[5px] transition-colors duration-300 hover:decoration-current"
                    >
                      {link.label}
                      <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {entry.reflection && (
        <blockquote className={`mt-16 border-t pt-10 font-serif text-3xl italic leading-snug sm:text-5xl ${rule}`}>
          {entry.reflection}
        </blockquote>
      )}

      {/* Photographs: a sideways sequence, each in its own proportions, never cropped */}
      {photos.length > 0 && (
        <section className="mt-16">
          <h3 className="mono opacity-60">Photographs</h3>
          {photos.length === 1 ? (
            <SinglePhoto id={photos[0]} dark={dark} />
          ) : (
            <ul
              data-arrow-keys
              tabIndex={0}
              aria-label="Photographs, scroll sideways for more"
              className="mt-5 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto pb-4"
            >
              {photos.map((id) => (
                <li key={id} className="w-[86%] shrink-0 snap-start sm:w-[62%] lg:w-[46%]">
                  <Photo id={id} frame={3 / 2} sizes="(min-width: 1024px) 46vw, 86vw" showCaption onDark={dark} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {aboutWebwise && (
        <aside className={`mt-16 grid gap-x-16 gap-y-4 border-t pt-8 lg:grid-cols-12 ${rule}`}>
          <h3 className="mono opacity-60 lg:col-span-4">About the Webwise Youth Advisory Panel</h3>
          <p className={`lg:col-span-8 ${soft}`}>{site.webwise}</p>
        </aside>
      )}
    </div>
  );
}
