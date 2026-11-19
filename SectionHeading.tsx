import { Reveal } from "./Reveal";

type Props = {
  label: string;
  title: string;
  intro?: string;
  onForest?: boolean;
};

/** The small uppercase label, large serif title and optional introduction that open a section. */
export function SectionHeading({ label, title, intro, onForest = false }: Props) {
  return (
    <Reveal className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
      <p className={`label lg:col-span-3 lg:pt-4 ${onForest ? "text-sage" : "text-forest"}`}>
        {label}
      </p>
      <div className="lg:col-span-9">
        <h2 className="display text-[clamp(2.75rem,6.5vw,5.5rem)]">{title}</h2>
        {intro && (
          <p className="mt-8 max-w-[38ch] font-serif text-2xl leading-snug sm:text-[1.75rem]">
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}
