import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-stone py-8">
      <div className="page flex flex-wrap items-center justify-between gap-4 text-sm text-charcoal/65">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. {site.location}.
        </p>
        <a href="#home" className="link">
          Back to top
        </a>
      </div>
    </footer>
  );
}
