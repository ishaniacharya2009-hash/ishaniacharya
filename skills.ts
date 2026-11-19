import type { SkillEvidence } from "./types";

/**
 * Skills, each backed by evidence. `evidence` lists archive entry slugs
 * (from content/archive.ts); selecting the skill on the site shows them.
 * No ratings or percentages by design.
 */
export const skillEvidence: SkillEvidence[] = [
  {
    skill: "Public speaking",
    evidence: [
      "safer-internet-forum-2025",
      "student-participation-in-education",
      "growing-up-in-the-digital-age-summit",
    ],
  },
  {
    skill: "Panel moderation",
    evidence: ["safer-internet-forum-2025"],
  },
  {
    skill: "Workshop facilitation",
    evidence: ["webwise-ambassador-training-days", "safer-internet-forum-2024"],
  },
  {
    skill: "Interviewing",
    evidence: ["casting-the-net"],
  },
  {
    skill: "Youth participation",
    evidence: ["cyber-citizens-consultation", "thinkyoung-digital-safety-roundtable", "the-teen-take"],
  },
  {
    skill: "Digital content",
    evidence: ["prabhabi-infocom"],
  },
  {
    skill: "Customer communication",
    evidence: ["aprilia", "peter-england"],
  },
  {
    skill: "Student representation",
    evidence: [],
    note: "Class Representative, Computing for Business, Dublin City University.",
  },
];

/** Shorter supporting lists, shown under the explorer. */
export const skillLists: { title: string; items: string[] }[] = [
  {
    title: "Tools",
    items: ["HTML", "CSS", "Web design fundamentals", "Adobe After Effects", "Social media content"],
  },
  {
    title: "Working with others",
    items: ["Teamwork", "Collaboration", "Organisation", "Time management", "Adaptability", "Attention to detail"],
  },
  {
    /** Levels as stated on Ishani's CV. */
    title: "Languages",
    items: ["English (fluent)", "Hindi (fluent spoken)", "Bengali (fluent spoken)", "Spanish (conversational)"],
  },
];
