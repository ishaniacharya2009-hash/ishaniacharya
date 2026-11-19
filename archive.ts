import { archive } from "@/content/archive";
import type { ArchiveEntry } from "@/content/types";

/**
 * The archive, sorted newest first and numbered. Built from
 * content/archive.ts; there is nothing to edit here when adding entries.
 */
export type NumberedEntry = ArchiveEntry & { number: string; index: number };

export const entries: NumberedEntry[] = [...archive]
  .sort((a, b) => b.sortDate.localeCompare(a.sortDate))
  .map((entry, index) => ({ ...entry, index, number: String(index + 1).padStart(2, "0") }));

export const total = String(entries.length).padStart(2, "0");

export function findEntry(slug: string) {
  return entries.find((entry) => entry.slug === slug);
}

export const kinds = ["All", ...new Set(entries.map((entry) => entry.kind))] as const;

export const years = [...new Set(entries.map((entry) => entry.year).filter(Boolean))].sort((a, b) =>
  b.localeCompare(a),
);
