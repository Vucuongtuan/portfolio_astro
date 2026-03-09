import { type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CharsHoverWaveOptions {
  liftY?: number;
  neighborLiftY?: number;
  scale?: number;
  neighborScale?: number;
  saturation?: number;
  lightness?: number;
  resetColor?: string;
  duration?: number;
  neighborDuration?: number;
  resetDuration?: number;
  resetEase?: string;
}

const DEFAULTS: Required<CharsHoverWaveOptions> = {
  liftY: -18,
  neighborLiftY: -8,
  scale: 1.12,
  neighborScale: 1.04,
  saturation: 90,
  lightness: 65,
  resetColor: "#fff",
  duration: 0.4,
  neighborDuration: 0.35,
  resetDuration: 0.6,
  resetEase: "elastic.out(1, 0.5)",
};

export function initCharsHoverWave(
  container: HTMLElement,
  charSelector: string = ".char",
  options: CharsHoverWaveOptions = {}
) {
  const config = { ...DEFAULTS, ...options };
  const chars = container.querySelectorAll(charSelector);
  const totalChars = chars.length;
  if (!totalChars) return;

  chars.forEach((char, i) => {
    const el = char as HTMLElement;
    // Mark to avoid duplicate binds
    if ((el as any).__waveHoverBound) return;
    (el as any).__waveHoverBound = true;

    const hue = (i / totalChars) * 360;

    const onEnter = () => {
      gsap.to(el, {
        y: config.liftY,
        scale: config.scale,
        color: `hsl(${hue}, ${config.saturation}%, ${config.lightness}%)`,
        duration: config.duration,
        ease: "power3.out",
        overwrite: "auto",
      });
      [-1, 1].forEach((offset) => {
        const neighbor = chars[i + offset] as HTMLElement | undefined;
        if (neighbor) {
          const neighborHue = ((i + offset) / totalChars) * 360;
          gsap.to(neighbor, {
            y: config.neighborLiftY,
            scale: config.neighborScale,
            color: `hsl(${neighborHue}, ${config.saturation - 10}%, ${config.lightness + 5}%)`,
            duration: config.neighborDuration,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        y: 0,
        scale: 1,
        color: config.resetColor,
        duration: config.resetDuration,
        ease: config.resetEase,
        overwrite: "auto",
      });
      [-1, 1].forEach((offset) => {
        const neighbor = chars[i + offset] as HTMLElement | undefined;
        if (neighbor) {
          gsap.to(neighbor, {
            y: 0,
            scale: 1,
            color: config.resetColor,
            duration: config.neighborDuration + 0.15,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
  });
}

export function useCharsHoverWave(
  containerRef: RefObject<HTMLElement | null>,
  charSelector: string = ".char",
  options: CharsHoverWaveOptions = {}
) {
  useGSAP(
    () => {
      if (!containerRef.current) return;
      initCharsHoverWave(containerRef.current, charSelector, options);
    },
    { scope: containerRef }
  );
}
