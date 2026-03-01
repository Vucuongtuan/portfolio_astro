import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Hook tính clip-path cho "dark text layer" dựa trên vị trí scroll
 * của fixed element so với các section có data-theme="light".
 *
 * Trả về chuỗi CSS clip-path: inset(...) để áp lên layer text đen.
 * Khi không có section sáng overlap → clip ẩn hoàn toàn.
 */
export function useAdaptiveColor(
  wrapperRef: React.RefObject<HTMLElement | null>,
  position: "top" | "bottom" = "top"
) {
  const [clipPath, setClipPath] = useState("inset(100% 0 0 0)");
  const rafId = useRef(0);

  const update = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const lightSections = document.querySelectorAll('[data-theme="light"]');
    let found = false;

    lightSections.forEach((section) => {
      if (found) return;
      const sRect = section.getBoundingClientRect();

      // Kiểm tra overlap theo chiều dọc
      if (sRect.bottom > rect.top && sRect.top < rect.bottom) {
        const topOffset = Math.max(0, sRect.top - rect.top);
        const bottomOffset = Math.max(0, rect.bottom - sRect.bottom);
        const topPx = topOffset;
        const bottomPx = bottomOffset;
        setClipPath(`inset(${topPx}px 0 ${bottomPx}px 0)`);
        found = true;
      }
    });

    if (!found) {
      setClipPath("inset(100% 0 0 0)");
    }
  }, [wrapperRef]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  return clipPath;
}
