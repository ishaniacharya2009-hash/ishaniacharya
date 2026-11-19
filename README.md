# Ishani Acharya: personal archive

An interactive editorial portfolio built with Next.js, React, TypeScript, Tailwind CSS, Motion and Lucide icons.

Every word, date, link and photograph lives in the `content/` folder. You should never need to touch `components/` to update the site.

## How the site works

1. **Hero**: "A little bit of everything." The last word runs once through a few facets, then settles. "About me" opens the biography.
2. **Experience Archive** (the centrepiece): a numbered index of every experience, filterable by kind. Hovering a row previews how its story opens; selecting it opens a full-screen case study. A band underneath features the podcast.
3. **Journey**: one chapter per year, newest first. Each chapter changes the section's colours and gives an overview: a headline, a tally and the entry names, which open their case studies.
4. **Skills, with evidence**: select a skill to see the experiences that demonstrate it. Education sits underneath, kept small.
5. **Beyond Work**: dance styles that each set and move their name differently, then creative media and badminton.
6. **Contact**: email (with a copy button) and LinkedIn.

**Case studies** come in four layouts, set per entry with `layout`:

| Layout | Leads with | Used for |
| --- | --- | --- |
| `photo` | the cover photograph at full width (one large word until the photo exists) | Safer Internet Forum, Brussels, The Teen Take, Student Participation |
| `type` | the opening statement, set large on green | roundtable, consultation, work roles |
| `audio` | episode artwork and the official Spotify player | Casting the Net |
| `process` | a step-through diagram | Ambassador Training Days |

Each case study has its own address (`yoursite.com/#safer-internet-forum-2025`), so one can be shared directly. Inside a case study, the left and right arrow keys move between entries and Escape closes it.

The Journal is built but hidden until an article is published.

## Still to add

Anything unfinished is hidden from visitors, so nothing here blocks you from sharing the site.

| What | Where | Until it is added |
| --- | --- | --- |
| Site address | `content/site.ts` → `url` | SEO, sitemap and link previews point to example.com. |
| Photographs | `content/images.ts` | Case studies use typography instead; no empty frames are shown. |
| Training Days dates | `content/archive.ts` → `webwise-ambassador-training-days` | The entry shows no date and is left out of the Journey. |
| Reflections | `content/archive.ts` → `reflection` | Nothing is shown. |
| Journal | `content/journal.ts` | The section stays hidden. |

## Run it on your computer

You need [Node.js](https://nodejs.org) 18.18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The page updates as you save files.

Other commands:

```bash
npm run build      # production build (what Vercel runs)
npm run start      # serve the production build locally
npm run export     # static copy in /out, for hosts other than Vercel
npm run typecheck  # check the content files for mistakes
```

## Where everything lives

```
content/            ← edit these
  site.ts           name, hero text, biography, Webwise description, navigation, contact
  archive.ts        every experience, once (list, case studies, Journey and skills all use it)
  journey.ts        one headline per year
  skills.ts         each skill and the entries that evidence it; supporting lists
  education.ts      education
  interests.ts      dance styles, creative media, badminton
  images.ts         every photograph (path, alt text, caption, proportions)
  journal.ts        articles (hidden until published)
  types.ts          the shape of each kind of entry, with notes on every field

components/         the design
  Hero, Archive, OnAir, Journey, Skills, Beyond, Contact    one per section
  CaseStudy, CaseStudyProvider                              the full-screen case study and its four layouts
  ui/                                                       shared pieces: Modal, Photo, SplitReveal, SectionMarker
lib/archive.ts      sorts and numbers the archive (no need to edit)
app/                page shell, SEO metadata, sitemap, robots, global styles
public/             files served as-is: images/, og.png, the CV
```

## Adding photographs

The homepage stays image-light. Photographs appear inside case studies, and as a small preview when hovering an archive row on a wide screen.

1. Save the photo in `public/images/`, for example `public/images/sif-2025.jpg`. JPG or WebP, around 2000px on the long edge, is plenty.
2. Open `content/images.ts`, find the matching entry and set:
   - `src: "/images/sif-2025.jpg"`
   - `ratio`: the photo's width divided by its height (`3 / 2` for a typical landscape photo). The frame takes this shape, so nothing is cropped.
   - `alt`: a plain description for screen readers.
   - `caption`: the short line shown under the photo.
   Your profile picture is `profile` (`public/images/profile.jpg`); replace that file to change it. It appears small beside your name and in "About me".
3. Already added: `studentParticipation`, `brussels`, `cyberCitizens`, `sif2025`, `teenTake2025`, `sif2024` and `trainingDays1`. Still empty: `thinkYoung` and `trainingDays2` to `trainingDays4`.
4. An entry's `cover` is its lead photograph. For more, add new entries to `content/images.ts` and list their ids in that entry's `gallery` in `content/archive.ts`. Two or more become a sideways sequence in the case study.
5. **Lower-quality photos** (some of the Brussels ones): also set `maxWidth` to the photo's width in pixels, for example `maxWidth: 800`, so it is never enlarged. Put these in the `gallery` and keep the sharpest landscape photo as the `cover`.

A photo with no `src` is simply left out. Only use genuine photographs of the events they describe.

## Updating experiences

Everything is in `content/archive.ts`.

- **Add an experience:** copy a block, give it a unique `slug`, set `year`, `date` and `sortDate` (`"2027-03"`). The site sorts newest first and renumbers by itself. It appears in the archive and under its year in the Journey.
- **What each case study shows:** `opening` (the first line), `contributed` (what you did, one line each), `involved` (what the experience was), `skills`, `links` (official sources only), `reflection` (your own words, optional).
- **Choose a layout:** `layout: "photo" | "type" | "audio" | "process"`. For `photo`, `motif` is the large word shown until the cover photo exists.
- **Add dates to the Training Days:** set `year` and `date` on that entry, and adjust `sortDate`.
- **A new year:** add a chapter to `content/journey.ts` with a one-line `headline`.
- **Link a skill to an experience:** add the entry's `slug` to that skill's `evidence` in `content/skills.ts`.
- **University projects:** when you're ready, add them as archive entries (a new `kind` such as `"Project"` can be added in `content/types.ts`).

## The podcast player

The Casting the Net case study loads Spotify's official embedded player only when a visitor selects "Load the Spotify player", so nothing is fetched from Spotify until then. The addresses are in the entry's `embed` field in `content/archive.ts`. Nothing on the site simulates playback.

## Writing journal articles

In `content/journal.ts`, change an entry's `status` from `"draft"` to `"published"` and add a `date`, an `excerpt` and a `body` (one string per paragraph). The Journal section then appears above Contact. Add `{ label: "Journal", href: "#journal", sections: ["journal"] }` to `navigation` in `content/site.ts` to link to it.

## Updating the CV

The "Download CV" button in Contact serves `public/ishani-acharya-cv.pdf`. To update it, replace that file with a newer PDF and keep the same file name. Keep phone numbers and home addresses off it, since the site is public. To hide the button, set `contact.cv` to `""` in `content/site.ts`.

## Deploying to Vercel

1. Put the project on GitHub:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   ```
   then create an empty repository on github.com and follow its "push an existing repository" steps.
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub and import the repository.
3. Vercel recognises Next.js. Leave every setting as it is and select Deploy.
4. Copy the address Vercel gives you into `content/site.ts` → `url`, commit and push. Every push to GitHub redeploys the site.
5. Optional: add a custom domain under Project → Settings → Domains, and update `url` to match.

## Link preview image

`public/og.png` is the image shown when the site is shared on LinkedIn or in messages. Replace it with any 1200 × 630 image to change it.

## Design reference

| Token | Value | Use |
| --- | --- | --- |
| Forest | `#244735` | accents, the first Journey chapter, Contact |
| Sage | `#A8B9A4` | small details only |
| Ivory | `#F7F6F0` | main background |
| Stone | `#DFE1D8` | dividers, Beyond Work, the process diagram |
| Charcoal | `#222822` | text, the podcast band and case study |

Three typefaces, each with a job: Cormorant Garamond for editorial statements, DM Sans for titles, body text and controls, and DM Mono for dates, index numbers and small labels. All three are bundled with the site, so nothing loads from a third party. Colours and fonts are defined in `tailwind.config.ts`.

Motion respects the visitor's reduced-motion setting throughout.

## Ideas for later

- Add the event photographs, starting with the four photo-led case studies and the Training Days gallery.
- Write one or two reflections; they appear as a large quotation in the case study.
- Add university projects as archive entries.
- Publish a first journal article.
- Add privacy-friendly analytics (Vercel Analytics is one line).
- Connect a custom domain.
