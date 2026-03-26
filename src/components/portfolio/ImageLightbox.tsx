import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageLightbox = ({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    },
    [currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-4 z-10 p-2 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-4 z-10 p-2 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <div className="max-w-5xl max-h-[90vh] px-12">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
        <p className="text-center text-background/70 text-sm font-sans mt-3">
          {images[currentIndex].alt} — {currentIndex + 1} of {images.length}
        </p>
      </div>
    </div>
  );
};

export default ImageLightbox;
