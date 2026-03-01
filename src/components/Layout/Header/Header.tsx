import { useRef, useState, useEffect, type ReactNode } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import st from "./header.module.scss";
import OverlayMenu from "./OverlayMenu";
import type { Locale } from "@i18n/ui";
import { useTranslations, getRoute } from "../../../i18n/utils";
import { useAdaptiveColor } from "src/hooks/useAdaptiveColor";

const SECTION_ORDER = ["Hero", "About", "TechStack", "Experience", "Works", "Contact"];

const NAV_LINKS = [
  { key: "nav.home" as const, href: "/" },
  { key: "nav.about" as const, href: "/about" },
  { key: "nav.projects" as const, href: "/projects" },
  { key: "nav.contact" as const, href: "/contact" },
];

interface HeaderProps {
  lang: Locale;
}

export default function Header({ lang }: HeaderProps) {
  const t = useTranslations(lang);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [trailSegments, setTrailSegments] = useState<string[]>([]);
  const [animatingIdx, setAnimatingIdx] = useState<number | null>(null);
  const [clock, setClock] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastSegRef = useRef<HTMLAnchorElement | null>(null);
  const lastSepRef = useRef<HTMLSpanElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prevCount = useRef(0);

  const clipPath = useAdaptiveColor(wrapperRef);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setClock(`[${h}:${m}:${s}]`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Track sections
  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    const observers: IntersectionObserver[] = [];
    sections.forEach((section) => {
      const name = section.getAttribute("data-section") || "";
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => { const n = new Set(prev); n.add(name); return n; });
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -50% 0px" }
      );
      observer.observe(section);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Build trail
  useEffect(() => {
    const newTrail = SECTION_ORDER.filter((s) => visibleSections.has(s));
    const isAdding = newTrail.length > prevCount.current;
    prevCount.current = newTrail.length;
    setTrailSegments(newTrail);
    setAnimatingIdx(isAdding ? newTrail.length - 1 : null);
  }, [visibleSections]);

  // Animate new segment
  useEffect(() => {
    if (animatingIdx === null) return;
    if (lastSegRef.current) {
      gsap.fromTo(lastSegRef.current,
        { opacity: 0, x: -8, filter: "blur(4px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }
      );
    }
    if (lastSepRef.current) {
      gsap.fromTo(lastSepRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 0.4, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
    setAnimatingIdx(null);
  }, [animatingIdx, trailSegments]);



  const renderContent = (interactive: boolean) => (
    <>
      <div className={st.row}>
        <div className={st.leftGroup}>
          <a
            href={lang === "vi" ? "/" : `/${lang}/`}
            className={st.logo}
            tabIndex={interactive ? 0 : -1}
          >
            <span className="dot" />
            VTC.
          </a>
        </div>

        <div className={st.rightGroup}>
          <nav className={st.nav}>
            {NAV_LINKS.map((link, idx) => (
              <span key={link.href} className={st.navItem}>
                {idx > 0 && <span className={st.navComma}>,</span>}
                <a
                  href={interactive ? getRoute(lang, link.href) : "#"}
                  className={st.navLink}
                  tabIndex={interactive ? 0 : -1}
                >
                  {t(link.key)}
                </a>
              </span>
            ))}
          </nav>
          <button
            className={st.ctaBtn}
            onClick={interactive ? () => setIsMenuOpen(true) : undefined}
            tabIndex={interactive ? 0 : -1}
          >
            MENU
          </button>
        </div>
      </div>

      <div className={st.subRow}>
        <span className={st.clock}>{clock}</span>
      </div>
    </>
  );

  return (
    <>
      <div ref={wrapperRef} className={st.headerWrapper}>
        <header className={clsx(st.header, st.layerLight)}>
          {renderContent(true)}
        </header>
        <header className={clsx(st.header, st.layerDark)} style={{ clipPath }} aria-hidden="true">
          {renderContent(false)}
        </header>
      </div>
      <OverlayMenu lang={lang} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}