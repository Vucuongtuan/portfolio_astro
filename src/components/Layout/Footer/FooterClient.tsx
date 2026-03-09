import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSplitText } from "@hooks/useSplitText";
import { useCharsHoverWave } from "@hooks/useCharsHoverWave";

gsap.registerPlugin(ScrollTrigger);

interface FooterClientProps {
  email: string;
}

export default function FooterClient({ email }: FooterClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cvBtnRef = useRef<HTMLAnchorElement>(null);

  const { chars: titleChars, ref: titleTextRef } = useSplitText("CUONG VU");
  useCharsHoverWave(titleTextRef);

  useGSAP(
    () => {
      if (!containerRef.current || !linksRef.current) return;

      const chars = titleTextRef.current?.querySelectorAll(".char") || [];
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
      if (titleTextRef.current) {
        gsap.to(titleTextRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }


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
            ref={titleTextRef as React.RefObject<HTMLHeadingElement>}
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
