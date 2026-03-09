import React, { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface FooterClientProps {
  email: string;
}

export default function FooterClient({ email }: FooterClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cvBtnRef = useRef<HTMLAnchorElement>(null);

  const title = "CUONG VU";
  const titleChars = useMemo(() => {
    return title.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ willChange: "transform, opacity" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !textRef.current || !linksRef.current) return;

      const chars = textRef.current.querySelectorAll(".char");
      const links = linksRef.current.querySelectorAll("a");
      const copyright = linksRef.current.querySelector(".copyright");
      const line = lineRef.current;
      const subtitle = subtitleRef.current;
      const cvBtn = cvBtnRef.current;

      gsap.set(chars, { yPercent: 130, rotationZ: 8, opacity: 0 });
      gsap.set([copyright, ...links], { y: 30, opacity: 0 });
      if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      if (subtitle) gsap.set(subtitle, { y: 20, opacity: 0, filter: "blur(8px)" });
      if (cvBtn) gsap.set(cvBtn, { y: 30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      if (line) {
        tl.to(line, {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
        });
      }

      tl.to(
        chars,
        {
          yPercent: 0,
          rotationZ: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.035,
          ease: "expo.out",
        },
        "-=0.6"
      );

      if (subtitle) {
        tl.to(subtitle, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          }, "-=1"
        );
      }

      if (cvBtn) {
        tl.to(cvBtn, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          }, "-=0.8"
        );
      }

      tl.to(
        [copyright, ...links],
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Parallax text
      gsap.to(textRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });

      const totalChars = chars.length;
      chars.forEach((char, i) => {
        const el = char as HTMLElement;
        const hue = (i / totalChars) * 360;

        el.addEventListener("mouseenter", () => {
          gsap.to(el, {
            y: -18,
            scale: 1.12,
            color: `hsl(${hue}, 90%, 65%)`,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
          [-1, 1].forEach((offset) => {
            const neighbor = chars[i + offset] as HTMLElement | undefined;
            if (neighbor) {
              const neighborHue = ((i + offset) / totalChars) * 360;
              gsap.to(neighbor, {
                y: -8,
                scale: 1.04,
                color: `hsl(${neighborHue}, 80%, 70%)`,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            y: 0,
            scale: 1,
            color: "#fff",
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
          });
          [-1, 1].forEach((offset) => {
            const neighbor = chars[i + offset] as HTMLElement | undefined;
            if (neighbor) {
              gsap.to(neighbor, {
                y: 0,
                scale: 1,
                color: "#fff",
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto",
              });
            }
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex flex-col justify-between py-16 px-6 md:px-16 overflow-hidden"
    >
      <div
        ref={lineRef}
        className="absolute top-0 left-6 md:left-16 right-6 md:right-16 h-[1px] bg-white/10"
      />

      <div className="flex-1 flex flex-col items-center justify-center w-full relative gap-10">
        <div className="text-center">
          <p
            ref={subtitleRef}
            className="text-white/40 text-sm md:text-base tracking-widest uppercase font-mono mb-4"
          >
            Software Engineer · Nam định, Vietnam
          </p>
          
          {/* DOWNLOAD CV CTA WITH AURA TRIGGER */}
          <a 
            ref={cvBtnRef}
            href="/resume.pdf" 
            target="_blank"
            data-aura="bright"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform duration-300 relative z-10"
          >
            <span className="material-icons text-sm">download</span>
            Download Curriculum Vitae
          </a>
        </div>

        <div className="py-4">
          <h2
            ref={textRef}
            className="text-[18vw] md:text-[15vw] leading-[0.85] font-black tracking-tighter uppercase select-none flex"
          >
            {titleChars}
          </h2>
        </div>
      </div>

      <div
        ref={linksRef}
        className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium text-white/50 pointer-events-auto"
      >
        <div className="flex items-center gap-3 copyright">
          <span className="font-bold text-white/70">Vu Tuan Cuong</span>
          <span className="text-white/30">© 2026</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <a
            href="https://github.com/Vucuongtuan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300 block"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vtc-b450b9313"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300 block"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${email}`}
            className="hover:text-white transition-colors duration-300 block"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
