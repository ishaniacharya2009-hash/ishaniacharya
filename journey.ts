import type { JourneyChapter } from "./types";

/**
 * The Journey: one chapter per year, newest first.
 * Each chapter is an overview only. The entries listed under a year are
 * pulled from content/archive.ts automatically (by their `year`).
 * `also` is for things that aren't archive entries.
 * A new year needs a new chapter here.
 */
export const chapters: JourneyChapter[] = [
  {
    year: "2026",
    headline: "The Leaving Certificate, a first term at DCU, and panels in Dublin and Brussels.",
    also: [
      "Completed the Leaving Certificate at The Institute of Education, Dublin.",
      "Started BSc Computing for Business at Dublin City University.",
    ],
  },
  {
    year: "2025",
    headline: "More responsibility at Safer Internet Forum, and The Teen Take.",
  },
  {
    year: "2024",
    headline: "A first Safer Internet Forum workshop, and a podcast interview.",
  },
  {
    year: "2023",
    headline: "Two summer jobs, in sales and in retail.",
  },
];
