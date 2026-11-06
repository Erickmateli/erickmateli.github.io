import { useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageLightbox = ({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, []);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${images[currentIndex].alt}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </button>

      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          aria-label="Previous image"
          className="absolute left-4 z-10 p-2 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" aria-hidden="true" />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          aria-label="Next image"
          className="absolute right-4 z-10 p-2 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6" aria-hidden="true" />
        </button>
      )}

      <div className="max-w-5xl max-h-[90vh] px-12">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
        <p className="text-center text-background/70 text-sm font-sans mt-3" aria-live="polite">
          {images[currentIndex].alt} — {currentIndex + 1} of {images.length}
        </p>
      </div>
    </div>
  );
};

export default ImageLightbox;
