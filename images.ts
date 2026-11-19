import type { SiteImage } from "./types";

/**
 * Every photograph on the site. The homepage itself stays typographic:
 * photographs appear on the three featured slides and inside an entry's details.
 *
 * To add a photo:
 *   1. Save it in /public/images (JPG or WebP, about 2000px on the long edge).
 *   2. Set `src` below, e.g. src: "/images/sif-2025.jpg".
 *   3. Set `ratio` to the photo's width / height (3 / 2 for a typical landscape photo).
 *      The frame takes this shape, so the photo is never cropped.
 *   4. Write a real `alt` and `caption`.
 *   4b. Case study leads and archive previews show the photo in a fixed
 *      landscape frame. If the subject isn't centred, set `focus`
 *      (e.g. focus: "50% 60%" moves the frame down a little).
 *   5. For a lower-quality photo, also set `maxWidth` to its width in pixels
 *      (e.g. maxWidth: 800) so it is never enlarged, and prefer listing it in
 *      an entry's `gallery` over using it as a `cover`.
 *
 * While `src` is null the photo is simply left out, so visitors never see an
 * empty frame. Only use genuine photographs of the events they describe.
 */
export const images: Record<string, SiteImage> = {
  profile: {
    src: "/images/profile.jpg",
    alt: "Ishani speaking into a microphone at a workshop",
    caption: "Ishani Acharya",
    ratio: 1,
    maxWidth: 800,
  },
  trainingDays1: {
    src: "/images/training-days-1.jpg",
    alt: "Ishani leaning over a table of students during a workshop at a Webwise Ambassador Training Day",
    caption: "Webwise Ambassador Training Day",
    ratio: 1284 / 853,
    maxWidth: 1284,
  },
  trainingDays2: {
    src: null,
    alt: "Facilitating an activity at a Webwise Ambassador Training Day",
    caption: "Webwise Ambassador Training Day",
    ratio: 3 / 2,
  },
  trainingDays3: {
    src: null,
    alt: "Ambassadors working in groups at a Webwise Ambassador Training Day",
    caption: "Webwise Ambassador Training Day",
    ratio: 3 / 2,
  },
  trainingDays4: {
    src: null,
    alt: "Webwise Ambassador Training Day",
    caption: "Webwise Ambassador Training Day",
    ratio: 3 / 2,
  },
  sif2024: {
    src: "/images/sif-2024.jpg",
    alt: "Group photograph of the young people who took part in Safer Internet Forum 2024",
    caption: "Safer Internet Forum 2024",
    ratio: 1284 / 855,
    maxWidth: 1284,
    focus: "50% 45%",
  },
  sif2025: {
    src: "/images/sif-2025.jpg",
    alt: "Panel seated on stage beneath the Safer Internet Forum 2025 sign, with the audience in front",
    caption: "Safer Internet Forum 2025",
    ratio: 1284 / 715,
    maxWidth: 1284,
  },
  teenTake2025: {
    src: "/images/teen-take-2025.jpg",
    alt: "Six panellists on stage at The Teen Take, in front of an audience",
    caption: "The Teen Take, 2025",
    ratio: 1134 / 845,
    maxWidth: 1134,
    focus: "50% 42%",
  },
  cyberCitizens: {
    src: "/images/cyber-citizens.jpg",
    alt: "Ishani at the Cyber Citizens youth panel at UCD, wearing an event lanyard",
    caption: "Cyber Citizens youth panel, UCD, 2026",
    ratio: 636 / 962,
    maxWidth: 420,
    focus: "50% 22%",
  },
  thinkYoung: {
    src: null,
    alt: "ThinkYoung digital safety roundtable in Dublin",
    caption: "ThinkYoung roundtable, Dublin",
    ratio: 3 / 2,
  },
  brussels: {
    src: "/images/brussels.jpg",
    alt: "Six people seated on stage under a screen reading The Teen Take: AI, Learning and The Future",
    caption: "Growing Up in the Digital Age Summit, Brussels",
    ratio: 1284 / 714,
    maxWidth: 1284,
  },
  studentParticipation: {
    src: "/images/student-participation.jpg",
    alt: "Four members of the Webwise Youth Advisory Panel seated on stage in front of a screen",
    caption: "Student Participation in Education, November 2026",
    ratio: 1284 / 1715,
    focus: "50% 58%",
  },
};
