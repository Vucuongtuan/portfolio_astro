import { useRef, useState, useEffect } from "react";
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

      const chars = nameRef.current.querySelectorAll(".hero-char");
      const infoItems = container.current?.querySelectorAll(".hero-info");
      const descItems = container.current?.querySelectorAll(".hero-desc");

      gsap.set(chars, { yPercent: 120, opacity: 0 });
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.04,
        ease: "expo.out",
        delay: 0.3,
      });

      if (infoItems) {
        gsap.from(infoItems, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.8,
        });
      }

      // Description columns
      if (descItems) {
        gsap.from(descItems, {
          y: 15,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 1,
        });
      }
    },
    { scope: container }
  );

  // Split name into chars
  const name = t("landing.name") || "CUONG";
  const nameChars = name.split("").map((char, i) => (
    <span
      key={i}
      className={`hero-char ${st.nameChar}`}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section className={st.section} ref={container} data-section="Hero" data-theme="light">
      {/* Top info row */}
      <div className={st.infoRow}>
        <div className="hero-info">
          <span className={st.infoLabel}>Role</span>
          <span className={st.infoValue}>{t("hero.role")}</span>
        </div>
        <div className="hero-info">
          <span className={st.infoLabel}>Location</span>
          <span className={st.infoValue}>{t("landing.location")}</span>
        </div>
        <div className="hero-info">
          <span className={st.infoLabel}>Status</span>
          <span className={st.infoValue}>Available</span>
        </div>
      </div>

      {/* Center: description columns */}
      <div className={st.descRow}>
        <p className={`hero-desc ${st.descCol}`}>
          {t("hero.desc")}
        </p>
        <p className={`hero-desc ${st.descCol}`}>
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