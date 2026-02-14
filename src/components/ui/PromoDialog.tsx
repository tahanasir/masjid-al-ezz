import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface PromoDialogProps {
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export function PromoDialog({ imageSrc, imageAlt, href }: PromoDialogProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative max-w-lg w-full md:max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
}
