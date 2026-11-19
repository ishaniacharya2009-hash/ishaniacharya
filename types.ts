/**
 * Shapes for everything in /content.
 * If you add a field here, TypeScript will tell you which entries need it.
 */

export type SiteImage = {
  /** Path inside /public, e.g. "/images/sif-2025.jpg". Leave as null until the photo exists. */
  src: string | null;
  /** Describes the photo for screen readers. */
  alt: string;
  /** Short caption shown under the photo. */
  caption: string;
  /** Shape of the frame: width / height. Match the real photo's proportions so nothing is cropped. */
  ratio: number;
  /** For lower-resolution photos: the photo's width in pixels, so it is never enlarged beyond it. */
  maxWidth?: number;
  /**
   * Where the subject sits, for places that show the photo in a fixed frame
   * (case study leads and archive previews): "left% top%", e.g. "50% 60%".
   * Defaults to the centre.
   */
  focus?: string;
};

/** One entry in the Experience Archive. */
export type ArchiveEntry = {
  /** Unique, lowercase, hyphenated. Also the entry's shareable address (yoursite.com/#slug). */
  slug: string;
  title: string;
  /** Four digits, or "" while the dates aren't confirmed. */
  year: string;
  /** Display date, e.g. "November 2026". "" hides it. */
  date: string;
  /** Used only for ordering, newest first: "YYYY-MM". */
  sortDate: string;
  /** "" if there isn't a single organiser to name. */
  organisation: string;
  role: string;
  location?: string;
  /** Which filter the entry sits under. */
  kind: "Youth voice" | "Media" | "Work";
  /** One concise sentence, shown in the archive list. */
  summary: string;
  /** The line that opens the case study. */
  opening: string;
  /** What I contributed: one short line each. */
  contributed: string[];
  /** What the experience involved. */
  involved: string;
  skills: string[];
  /**
   * How the case study is laid out:
   *   "photo"   leads with the cover photograph (or one large word until it exists)
   *   "type"    leads with the opening statement, set large
   *   "audio"   the podcast treatment, with the official player
   *   "process" leads with the step-by-step diagram in `process`
   */
  layout: "photo" | "type" | "audio" | "process";
  /** One or two words set large on photo-led case studies while there is no photograph. */
  motif?: string;
  /** Image ids from content/images.ts. Shown only once the photos exist. */
  cover?: string;
  gallery?: string[];
  /** Verified links to official sources. */
  links?: { label: string; href: string }[];
  /** An official embedded player. Loaded only when the visitor asks for it. */
  embed?: { provider: "Spotify"; src: string; fallbackHref: string };
  /** Steps for the "process" layout. */
  process?: { caption: string; steps: { name: string; text: string }[] };
  /** Ishani's own words. Nothing is shown while this is null. */
  reflection: string | null;
};

export type JourneyChapter = {
  year: string;
  /** One line that sums the year up. */
  headline: string;
  /** Things that happened this year that aren't archive entries (e.g. education). */
  also?: string[];
};

export type EducationEntry = {
  title: string;
  organisation: string;
  dates: string;
  /** One small extra line, e.g. a role held alongside the course. */
  note?: string;
  areas?: string[];
};

export type SkillEvidence = {
  skill: string;
  /** Archive entry slugs that demonstrate the skill. */
  evidence: string[];
  /** Evidence that isn't an archive entry. */
  note?: string;
};

export type DanceStyle = {
  name: string;
  /** Years, set as a large figure. Leave out if not given. */
  years?: string;
  /** Adds "approx." beside the figure. */
  approximate?: boolean;
  note: string;
  /** Which typographic treatment the style gets. */
  voice: "classical" | "flowing" | "street";
};

export type JournalArticle = {
  slug: string;
  title: string;
  topic: string;
  /** "draft" entries are placeholders; "published" entries show their date and body. */
  status: "draft" | "published";
  /** Display date, e.g. "12 January 2027". Only needed once published. */
  date?: string;
  excerpt?: string;
  /** One string per paragraph. */
  body?: string[];
};
