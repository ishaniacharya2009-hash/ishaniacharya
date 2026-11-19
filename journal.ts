import type { JournalArticle } from "./types";

/**
 * Notes & Perspectives.
 *
 * Nothing here has been written yet: the four entries below are suggested
 * future topics, shown on the site as clearly marked drafts.
 *
 * To publish an article:
 *   1. Change `status` to "published".
 *   2. Add a `date`, an `excerpt`, and the `body` (one string per paragraph).
 * To add a new one, copy a block and give it a unique `slug`.
 * To remove one, delete its block.
 * To hide all drafts from visitors, set journal.showDrafts to false in content/site.ts.
 *
 * Example of a published entry:
 *
 * {
 *   slug: "my-first-article",
 *   title: "My First Article",
 *   topic: "University",
 *   status: "published",
 *   date: "12 January 2027",
 *   excerpt: "One or two sentences that appear in the article list.",
 *   body: ["First paragraph.", "Second paragraph."],
 * },
 */
export const journal: JournalArticle[] = [
  {
    slug: "what-meaningful-youth-participation-looks-like",
    title: "What Meaningful Youth Participation Looks Like",
    topic: "Youth participation",
    status: "draft",
  },
  {
    slug: "reflections-on-ai-learning-and-the-future",
    title: "Reflections on AI, Learning and the Future",
    topic: "Technology and AI",
    status: "draft",
  },
  {
    slug: "finding-confidence-through-public-speaking",
    title: "Finding Confidence Through Public Speaking",
    topic: "Public speaking",
    status: "draft",
  },
  {
    slug: "lessons-from-my-first-year-at-university",
    title: "Lessons From My First Year at University",
    topic: "University",
    status: "draft",
  },
];
