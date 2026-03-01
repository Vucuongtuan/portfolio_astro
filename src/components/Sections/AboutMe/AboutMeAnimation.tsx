import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  containerId: string;
}

export default function AboutMeAnimation({ containerId }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = document.getElementById(containerId);
    if (!section) return;

    const heading = section.querySelector("[data-about-heading]");
    const divider = section.querySelector("[data-about-divider]");
    const textLines = section.querySelectorAll("[data-about-text] p, [data-about-text] li, [data-about-text] span");
    const quote = section.querySelector("[data-about-quote]");
    const label = section.querySelector("[data-about-label]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Heading: slide up from below
    if (heading) {
      const chars = heading.querySelectorAll(".char");
      if (chars.length > 0) {
        gsap.set(chars, { yPercent: 120, opacity: 0 });
        tl.to(chars, {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.03,
          ease: "expo.out",
        });
      } else {
        gsap.set(heading, { y: 60, opacity: 0 });
        tl.to(heading, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        });
      }
    }

    // Label
    if (label) {
      gsap.set(label, { x: -20, opacity: 0 });
      tl.to(
        label,
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.8"
      );
    }

    // Divider: scale from top to bottom
    if (divider) {
      gsap.set(divider, { scaleY: 0, transformOrigin: "top center" });
      tl.to(
        divider,
        { scaleY: 1, duration: 1, ease: "power3.inOut" },
        "-=0.8"
      );
    }

    // Text lines: stagger fade in
    if (textLines.length > 0) {
      gsap.set(textLines, { y: 30, opacity: 0, filter: "blur(4px)" });
      tl.to(
        textLines,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }

    // Quote: fade in last
    if (quote) {
      gsap.set(quote, { y: 20, opacity: 0 });
      tl.to(
        quote,
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }

    // Parallax heading on scroll
    if (heading) {
      gsap.to(heading, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, { scope: ref });

  return <div ref={ref} style={{ display: "none" }} />;
}
