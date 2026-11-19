import type { EducationEntry } from "./types";

/**
 * Education, newest first. Kept deliberately small on the site.
 * University projects can be added later as archive entries.
 */
export const education: EducationEntry[] = [
  {
    title: "BSc Computing for Business",
    organisation: "Dublin City University",
    dates: "2026 – Present",
    note: "Class Representative, Computing for Business.",
    areas: [
      "Web design",
      "HTML and CSS",
      "Computing fundamentals",
      "Mathematics",
      "Business and technology",
      "Collaboration and problem-solving",
    ],
  },
  {
    title: "Leaving Certificate",
    organisation: "The Institute of Education, Dublin",
    dates: "2026",
  },
];
