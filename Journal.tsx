"use client";

import { useState } from "react";
import { journal } from "@/content/journal";
import { site } from "@/content/site";
import type { JournalArticle } from "@/content/types";
import { SectionHeading } from "./ui/SectionHeading";
import { Modal } from "./ui/Modal";

const visible = journal.filter(
  (article) => article.status === "published" || site.journal.showDrafts,
);

export function Journal() {
  const [selected, setSelected] = useState<JournalArticle | null>(null);

  // With nothing to show, the whole section is left out of the page.
  if (visible.length === 0) return null;

  return (
    <section id="journal" className="border-t border-stone py-24 lg:py-36">
      <div className="page">
        <SectionHeading
          label="Journal"
          title="Notes & Perspectives."
          intro="Short reflections on youth participation, digital wellbeing, technology and university life."
        />

        <ul className="mt-16 border-t border-stone lg:ml-[25%]">
          {visible.map((article) => {
            const draft = article.status === "draft";
            return (
              <li key={article.slug} className="border-b border-stone">
                <button
                  type="button"
                  onClick={() => setSelected(article)}
                  aria-haspopup="dialog"
                  className="group grid w-full gap-x-10 gap-y-2 py-7 text-left md:grid-cols-[10rem_1fr_auto] md:items-baseline"
                >
                  <span className="label text-charcoal/65">{article.topic}</span>
                  <span>
                    <span
                      className={`block font-serif text-[1.75rem] leading-tight transition-colors duration-300 group-hover:text-forest sm:text-4xl ${
                        draft ? "text-charcoal/60" : ""
                      }`}
                    >
                      {article.title}
                    </span>
                    {article.excerpt && (
                      <span className="mt-2 block max-w-[60ch] text-charcoal/80">{article.excerpt}</span>
                    )}
                  </span>
                  {draft ? (
                    <span className="label w-fit border border-dashed border-charcoal/40 px-2 py-1 text-charcoal/60">
                      Draft, not yet written
                    </span>
                  ) : (
                    <span className="label text-charcoal/65">{article.date}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <Modal open={selected !== null} onClose={() => setSelected(null)} label={selected?.title ?? "Article"}>
        {selected && (
          <article className="px-6 pb-16 pt-20 sm:px-12">
            <p className="label text-forest">
              {selected.topic}
              {selected.date ? `, ${selected.date}` : ""}
            </p>
            <h3 className="display mt-4 text-5xl sm:text-6xl">{selected.title}</h3>

            {selected.status === "published" && selected.body ? (
              <div className="mt-10 space-y-5 font-serif text-[1.375rem] leading-[1.5]">
                {selected.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="mt-10 border border-dashed border-charcoal/30 p-4 text-sm text-charcoal/60">
                Placeholder: this article is a planned topic and hasn&rsquo;t been written yet. Its
                text will appear here once it is published.
              </p>
            )}
          </article>
        )}
      </Modal>
    </section>
  );
}
