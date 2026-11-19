import Image from "next/image";
import { images } from "@/content/images";

type Props = {
  /** Key from content/images.ts */
  id?: string;
  /** `sizes` hint for responsive loading. */
  sizes?: string;
  /** Load immediately (use for the hero portrait only). */
  priority?: boolean;
  showCaption?: boolean;
  onDark?: boolean;
  className?: string;
  /** What to show while the photograph hasn't been added yet. Defaults to nothing. */
  fallback?: React.ReactNode;
  /**
   * Show the photo in a fixed frame of this shape (width / height) instead of
   * its own proportions. The photo fills the frame, centred on its `focus`.
   */
  frame?: number;
};

/** True once a real photograph has been added for this id. */
export function hasPhoto(id?: string) {
  return Boolean(id && images[id]?.src);
}

/**
 * Shows a photograph from content/images.ts in its natural proportions,
 * never cropped and (when `maxWidth` is set) never enlarged.
 * If the photo hasn't been added yet, nothing is rendered (or `fallback`
 * if one is given), so the page never shows an empty frame.
 */
export function Photo({
  id,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  showCaption = false,
  onDark = false,
  className = "",
  fallback = null,
  frame,
}: Props) {
  const image = id ? images[id] : undefined;
  if (!image?.src) return <>{fallback}</>;

  return (
    <figure className={className} style={image.maxWidth && !frame ? { maxWidth: image.maxWidth } : undefined}>
      <div className="relative w-full overflow-hidden bg-stone" style={{ aspectRatio: String(frame ?? image.ratio) }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: frame ? (image.focus ?? "50% 50%") : undefined }}
        />
      </div>
      {showCaption && (
        <figcaption className={`label mt-3 ${onDark ? "text-ivory/70" : "text-charcoal/60"}`}>
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
