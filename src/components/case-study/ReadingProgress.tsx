import { useEffect, useState } from "react";

/** Thin bar along the bottom edge of the (fixed, relative) page nav. */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      className="absolute bottom-0 left-0 h-[2px] bg-primary transition-[width] duration-75"
      style={{ width: `${progress}%` }}
    />
  );
};

export default ReadingProgress;
