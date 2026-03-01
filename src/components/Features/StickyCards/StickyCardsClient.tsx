import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type VariantName = "scale-fade" | "slide-over" | "parallax";

interface VariantConfig {
  pinned: gsap.TweenVars;
  overlay: Record<string, string>;
}

const variants: Record<VariantName, VariantConfig> = {
  "scale-fade": {
    pinned: { scale: 0.92, opacity: 0.4, borderRadius: "24px" },
    overlay: {
      borderRadius: "24px 24px 0 0",
      boxShadow: "0 -20px 60px rgba(0,0,0,0.4)",
    },
  },
  "slide-over": {
    pinned: { y: -60, opacity: 0.3, filter: "brightness(0.6)" },
    overlay: {
      boxShadow: "0 -10px 40px rgba(0,0,0,0.3)",
    },
  },
  parallax: {
    pinned: { scale: 0.95, filter: "blur(4px)", opacity: 0.5 },
    overlay: {
      borderRadius: "32px 32px 0 0",
      boxShadow: "0 -30px 80px rgba(0,0,0,0.5)",
    },
  },
};

interface StickyCardsClientProps {
  variant?: VariantName;
  containerId: string;
}


export default function StickyCardsClient({
  variant = "scale-fade",
  containerId,
}: StickyCardsClientProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const children: HTMLElement[] = [];
    Array.from(container.children).forEach((child) => {
      if (child.tagName.toLowerCase() === "astro-island") {
        if (child.firstElementChild) {
          children.push(child.firstElementChild as HTMLElement);
        }
      } else {
        children.push(child as HTMLElement);
      }
    });

    if (children.length < 2) return;

    const config = variants[variant];

    children.forEach((child, i) => {
      child.style.position = "relative";
      child.style.zIndex = String(i + 1);
    });

    children.forEach((child, i) => {
      if (i >= children.length - 1) return;
      const next = children[i + 1];

      child.style.willChange = "transform, opacity, border-radius";
      child.style.transformOrigin = "center center";

      ScrollTrigger.create({
        trigger: child,
        start: "bottom bottom",
        endTrigger: next,
        end: "top top",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(child, {
        ...config.pinned,
        ease: "none",
        scrollTrigger: {
          trigger: next,
          start: "top bottom",
          end: "top 15%",
          scrub: true,
        },
      });
    });

    children.slice(1).forEach((child) => {
      Object.entries(config.overlay).forEach(([key, value]) => {
        (child.style as any)[key] = value;
      });
    });
  }, { scope: ref });

  return <div ref={ref} style={{ display: "none" }} />;
}
