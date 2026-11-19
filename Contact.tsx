"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";
import { site } from "@/content/site";
import { SectionMarker } from "./ui/SectionMarker";
import { SplitReveal } from "./ui/SplitReveal";

/** Email (with a copy button), LinkedIn, and the CV once one is supplied. */
export function Contact() {
  const { contact } = site;
  const [copied, setCopied] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (copied === "idle") return;
    const timer = setTimeout(() => setCopied("idle"), 2600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied("copied");
    } catch {
      setCopied("failed");
    }
  };

  return (
    <section id="contact" className="on-forest bg-forest py-20 text-ivory lg:py-28">
      <div className="page">
        <SectionMarker index={6} label="Contact" onDark />

        <SplitReveal
          text={contact.heading}
          className="display mt-12 text-[clamp(4rem,15vw,14rem)] leading-[0.84]"
        />

        <div className="mt-12 grid items-end gap-x-10 gap-y-10 lg:mt-16 lg:grid-cols-12">
          <p className="max-w-[40ch] text-lg text-ivory/85 lg:col-span-5">{contact.text}</p>

          <ul className="border-t border-ivory/25 lg:col-span-6 lg:col-start-7">
            <li className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-ivory/25 py-5">
              <a href={`mailto:${contact.email}`} className="group min-w-0">
                <span className="mono flex items-center gap-2 text-sage">
                  <Mail aria-hidden="true" size={13} strokeWidth={1.5} /> Email
                </span>
                <span className="mt-1.5 block break-all text-xl font-medium underline-offset-4 group-hover:underline sm:text-2xl">
                  {contact.email}
                </span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 border border-ivory/50 px-4 py-2.5 text-sm font-medium transition-colors duration-300 hover:bg-ivory hover:text-forest"
              >
                {copied === "copied" ? (
                  <Check aria-hidden="true" size={16} strokeWidth={1.75} />
                ) : (
                  <Copy aria-hidden="true" size={16} strokeWidth={1.75} />
                )}
                <span aria-live="polite">
                  {copied === "copied" ? "Copied" : copied === "failed" ? "Select the address to copy" : "Copy address"}
                </span>
              </button>
            </li>

            <li className="border-b border-ivory/25">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 py-5"
              >
                <span>
                  <span className="mono block text-sage">LinkedIn</span>
                  <span className="mt-1.5 block text-xl font-medium underline-offset-4 group-hover:underline sm:text-2xl">
                    View my profile
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>

            {contact.cv && (
              <li className="pt-8">
                <a
                  href={contact.cv}
                  download
                  className="inline-flex items-center gap-2 bg-ivory px-6 py-3 text-sm font-medium text-forest transition-colors duration-300 hover:bg-sage"
                >
                  <Download aria-hidden="true" size={16} strokeWidth={1.75} />
                  Download CV
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
