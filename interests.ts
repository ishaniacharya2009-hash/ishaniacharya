import type { DanceStyle } from "./types";

/**
 * Beyond the Work: dance, creative media and badminton.
 * Each dance style has a `voice` that decides how its name is set and moves.
 */
export const dance: { intro: string; styles: DanceStyle[] } = {
  intro:
    "Dance has been a big part of my life, from the discipline and storytelling of Bharatanatyam and Odissi to the energy and creativity of hip-hop. I enjoy exploring different styles and the different ways they allow me to express myself.",
  styles: [
    { name: "Bharatanatyam", years: "8", approximate: true, note: "Discipline and storytelling.", voice: "classical" },
    { name: "Odissi", years: "5", approximate: true, note: "Discipline and storytelling.", voice: "flowing" },
    { name: "Hip-hop", years: "3", note: "Energy, creativity and multiple performances.", voice: "street" },
  ],
};

export const creativeMedia = {
  title: "Creative Media",
  items: ["Video editing", "Adobe After Effects", "Digital content creation", "Visual storytelling"],
};

export const badminton = {
  title: "Badminton",
  body: "I've been playing badminton for three years. I'm currently on the Girls U19 team and play for Kadca Jr, and our team won the league in the Girls U19.",
  facts: [
    { value: "3", label: "years playing" },
    { value: "U19", label: "Girls team, Kadca Jr" },
    { value: "1st", label: "in the Girls U19 league" },
  ],
};
