"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { entries, findEntry } from "@/lib/archive";
import { Modal } from "./ui/Modal";
import { CaseStudy } from "./CaseStudy";

type CaseStudyContext = { open: (slug: string) => void };

const Context = createContext<CaseStudyContext>({ open: () => {} });

/** Any component can call `useCaseStudy().open(slug)` to open an entry's case study. */
export const useCaseStudy = () => useContext(Context);

function setHash(hash: string) {
  try {
    const url = hash ? `#${hash}` : window.location.pathname + window.location.search;
    window.history.replaceState(null, "", url);
  } catch {
    /* Some embedded viewers don't allow this; the case study still opens. */
  }
}

/**
 * Owns the one full-screen case study view. Each entry also has its own
 * address (…/#slug), so a case study can be linked to directly.
 */
export function CaseStudyProvider({ children }: { children: React.ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);
  const entry = slug ? findEntry(slug) : undefined;

  const open = useCallback((next: string) => {
    if (!findEntry(next)) return;
    setSlug(next);
    setHash(next);
  }, []);

  const close = useCallback(() => {
    setSlug(null);
    setHash("");
  }, []);

  // Open the matching case study when the page is loaded at …/#slug.
  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.slice(1);
      if (findEntry(hash)) setSlug(hash);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // Left and right arrows move between case studies.
  useEffect(() => {
    if (!entry) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-arrow-keys]")) return;
      if (e.key === "ArrowRight") open(entries[(entry.index + 1) % entries.length].slug);
      if (e.key === "ArrowLeft") open(entries[(entry.index - 1 + entries.length) % entries.length].slug);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entry, open]);

  return (
    <Context.Provider value={{ open }}>
      {children}
      <Modal open={Boolean(entry)} onClose={close} label={entry?.title ?? "Case study"} variant="sheet" hideClose>
        {entry && <CaseStudy key={entry.slug} entry={entry} onClose={close} onNavigate={open} />}
      </Modal>
    </Context.Provider>
  );
}
