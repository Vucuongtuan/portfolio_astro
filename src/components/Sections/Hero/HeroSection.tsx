import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "../../../i18n/utils";
import type { Locale } from "../../../i18n/ui";
import st from "./hero-section.module.scss";

interface HeroSectionProps {
  lang: Locale;
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const t = useTranslations(lang);
  const container = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!nameRef.current) return;

      const chars = nameRef.current.querySelectorAll(`.${st.nameChar}`);
      const infoItems = container.current?.querySelectorAll(`.${st.infoItem}`);
      const descItems = container.current?.querySelectorAll(`.${st.descCol}`);

      const startAnimation = () => {
        // Name Reveal
        gsap.to(chars, {
          yPercent: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.04,
          ease: "expo.out",
          delay: 0.2,
        });

        // Top Info Row Reveal
        if (infoItems) {
          gsap.to(infoItems, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.8,
          });
        }

        // Description Columns Reveal
        if (descItems) {
          gsap.to(descItems, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 1.1,
          });
        }
      };

      // Check if preloader exists and is still active
      const preloader = document.getElementById('preloader');
      if (preloader && preloader.style.display !== 'none') {
        window.addEventListener('loader-finished', startAnimation, { once: true });
      } else {
        // Run immediately if no preloader (e.g. view transitions)
        startAnimation();
      }
    },
    { scope: container }
  );

  // Split name into chars
  const name = t("landing.name") || "CUONG";
  const nameChars = name.split("").map((char, i) => (
    <span
      key={i}
      className={st.nameChar}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section className={st.section} ref={container} data-section="Hero" data-theme="light">
      {/* Top info row */}
      <div className={st.infoRow}>
        <div className={st.infoItem}>
          <span className={st.infoLabel}>Role</span>
          <span className={st.infoValue}>{t("hero.role")}</span>
        </div>
        <div className={st.infoItem}>
          <span className={st.infoLabel}>Location</span>
          <span className={st.infoValue}>{t("landing.location")}</span>
        </div>
        <div className={st.infoItem}>
          <span className={st.infoLabel}>Status</span>
          <span className={st.infoValue}>Available</span>
        </div>
      </div>

      {/* Center: description columns */}
      <div className={st.descRow}>
        <p className={st.descCol}>
          {t("hero.desc")}
        </p>
        <p className={st.descCol}>
          {t("landing.role")}
        </p>
      </div>

      {/* Bottom: Massive name */}
      <div className={st.nameWrapper}>
          <h1 ref={nameRef} className={st.name}>
            {nameChars}
          </h1>
      </div>
    </section>
  );
}
