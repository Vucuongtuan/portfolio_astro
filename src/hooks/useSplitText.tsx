import React, { useMemo, useRef, type RefObject } from "react";

interface UseSplitTextOptions {
  className?: string;
}

interface UseSplitTextReturn {
  chars: React.ReactNode;
  ref: RefObject<HTMLElement | null>;
}

export function useSplitText(
  text: string,
  options: UseSplitTextOptions = {}
): UseSplitTextReturn {
  const { className = "char inline-block" } = options;
  const ref = useRef<HTMLElement>(null);

  const chars = useMemo(() => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className={`char ${className}`}
        data-cursor="chars"
        style={{ willChange: "transform, opacity" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [text, className]);

  return { chars, ref };
}
