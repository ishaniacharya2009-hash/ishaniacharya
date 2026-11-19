"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Read out by screen readers when the view opens. */
  label: string;
  /** "panel" is a side reading panel; "sheet" fills the screen in ivory; "full" fills it in charcoal. */
  variant?: "panel" | "full" | "sheet";
  /** Leave out the built-in close button (when the content has its own). */
  hideClose?: boolean;
  children: React.ReactNode;
};

/**
 * An accessible expanded view built on the native <dialog> element:
 * focus stays inside it, Escape closes it, and focus returns to the
 * control that opened it.
 */
export function Modal({ open, onClose, label, variant = "panel", hideClose = false, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && dialog.open) dialog.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const shape =
    variant === "full"
      ? "h-dvh max-h-none w-screen max-w-none bg-charcoal text-ivory on-forest"
      : variant === "sheet"
        ? "h-dvh max-h-none w-screen max-w-none bg-ivory text-charcoal"
        : "ml-auto mr-0 h-dvh max-h-none w-full max-w-2xl bg-ivory text-charcoal";

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        // A click on the dimmed backdrop lands on the dialog element itself.
        if (e.target === ref.current) onClose();
      }}
      className={`m-0 overflow-y-auto p-0 ${shape}`}
    >
      <div className="relative min-h-full">
        {!hideClose && <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center transition-opacity duration-300 hover:opacity-60 sm:right-6 sm:top-6"
        >
          <X aria-hidden="true" size={22} strokeWidth={1.5} />
          <span className="sr-only">Close</span>
        </button>}
        {children}
      </div>
    </dialog>
  );
}
