/**
 * Personal information, hero text, biography, navigation and contact links.
 */

export const site = {
  name: "Ishani Acharya",
  /** TODO: replace with the real address once the site is deployed (used for SEO, sitemap and link previews). */
  url: "https://example.com",
  description:
    "The personal archive of Ishani Acharya, a Computing for Business student at Dublin City University: youth advocacy, public speaking, media, work and creative interests.",
  location: "Dublin, Ireland",
  studying: "BSc Computing for Business, Dublin City University",

  hero: {
    /** The headline. Its last word is swapped through `facets` once, then settles. */
    headlineStart: "A little bit of",
    headlineEnd: "everything.",
    facets: ["youth voice.", "public speaking.", "media.", "technology.", "dance."],
    supporting:
      "A collection of conversations, experiences and ideas that have shaped my journey so far.",
    cta: { label: "Explore the archive", href: "#archive" },
  },

  /** Profile picture: an image id from content/images.ts. Shown small beside the name and in "About me". */
  profileImage: "profile",

  about: {
    /** The biography, opened from "About me" in the hero. */
    paragraphs: [
      "I'm Ishani, a Computing for Business student at Dublin City University with interests spanning technology, digital wellbeing, youth participation and creative media.",
      "Over the past few years, I've been involved with Webwise Ireland and Better Internet for Kids, contributing to workshops, youth consultations, panel discussions and international events. These experiences have given me opportunities not only to share my own perspectives but also to help other young people develop the confidence to share theirs.",
      "Outside of academics and youth advocacy, dance has always been a big part of my life, alongside my interests in digital creativity and badminton.",
    ],
  },

  /** The Webwise panel, described once (shown at the top of the archive's Youth voice filter). */
  webwise:
    "Through the Webwise Youth Advisory Panel, I've been involved in activities focused on online safety, digital wellbeing and meaningful youth participation. From developing workshops and helping train new ambassadors to contributing to discussions with educators and digital safety stakeholders, these experiences have helped me build confidence in public speaking, collaboration and communicating ideas.",

  contact: {
    heading: "Let's Connect.",
    text: "I'm always open to opportunities to learn, collaborate and contribute to meaningful projects.",
    email: "ishani.acharya2009@gmail.com",
    linkedin: "https://www.linkedin.com/in/ishani-acharya-129b45302/",
    /**
     * The CV shown by the "Download CV" button. To update it, replace
     * /public/ishani-acharya-cv.pdf with a newer PDF (keep the same file name).
     * Keep phone numbers and home addresses off it, since the site is public.
     * Set this to "" to hide the button.
     */
    cv: "/ishani-acharya-cv.pdf",
  },

  journal: {
    /** Drafts stay hidden from visitors. The Journal appears on its own once an article is published. */
    showDrafts: false,
  },
};

/**
 * The page's sections, in order. `label` is the navigation link;
 * `sections` lists every section id that should light the link up.
 */
export const navigation = [
  { label: "Archive", href: "#archive", sections: ["archive", "on-air"] },
  { label: "Journey", href: "#journey", sections: ["journey"] },
  { label: "Skills", href: "#skills", sections: ["skills"] },
  { label: "Beyond", href: "#beyond", sections: ["beyond"] },
  { label: "Contact", href: "#contact", sections: ["contact"] },
];
