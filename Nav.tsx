"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { navigation, site } from "@/content/site";

/** Tracks which section is currently in the middle of the screen. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = ["home", "about", ...navigation.flatMap((item) => item.sections)];

export function Nav() {
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-ivory transition-[border-color] duration-500 ${
        scrolled || menuOpen ? "border-b border-stone" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="page flex h-16 items-center justify-between">
        <a
          href="#home"
          className={`font-serif text-xl tracking-tight transition-opacity duration-500 ${
            scrolled || menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          {site.name}
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => {
            const isActive = item.sections.includes(active);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative py-2 text-[0.8125rem] transition-colors duration-300 hover:text-forest ${
                    isActive ? "text-forest" : "text-charcoal/75"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-forest transition-transform duration-500 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
          {site.contact.cv && (
            <li>
              <a
                href={site.contact.cv}
                download
                className="inline-flex items-center gap-2 border border-forest px-3.5 py-2 text-[0.8125rem] font-medium text-forest transition-colors duration-300 hover:bg-forest hover:text-ivory"
              >
                <Download aria-hidden="true" size={14} strokeWidth={1.75} />
                CV
              </a>
            </li>
          )}
        </ul>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <X aria-hidden="true" size={22} strokeWidth={1.5} />
          ) : (
            <Menu aria-hidden="true" size={22} strokeWidth={1.5} />
          )}
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      {/* Reading progress: fills as the visitor moves down the page */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-forest"
        style={{ scaleX: scrollYProgress }}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ivory lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="page flex flex-col py-8">
              {navigation.map((item, i) => {
                const isActive = item.sections.includes(active);
                return (
                  <motion.li
                    key={item.href}
                    className="border-b border-stone"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 * i }}
                  >
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-4 font-serif text-4xl ${isActive ? "text-forest" : ""}`}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
            <div className="page flex flex-col items-start gap-4 pb-10">
              {site.contact.cv && (
                <a href={site.contact.cv} download className="btn" onClick={() => setMenuOpen(false)}>
                  <Download aria-hidden="true" size={16} strokeWidth={1.75} />
                  Download CV
                </a>
              )}
              <a href={`mailto:${site.contact.email}`} className="link break-all font-medium">
                {site.contact.email}
              </a>
              <p className="label text-charcoal/60">{site.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
