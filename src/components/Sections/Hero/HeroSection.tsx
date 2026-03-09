import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "../../../i18n/utils";
import type { Locale } from "../../../i18n/ui";
import st from "./hero-section.module.scss";
import clsx from "clsx";

interface HeroSectionProps {
  lang: Locale;
  title?: string; // Dùng cho lời chào lớn (ví dụ: "HELLO")
  showInfo?: boolean;
  fullName?: string; // Tên đầy đủ để hiện ở info row
}

export default function HeroSection({ 
  lang, 
  title, 
  showInfo = true,
  fullName 
}: HeroSectionProps) {
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
        gsap.to(chars, {
          yPercent: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.04,
          ease: "expo.out",
          delay: 0.2,
        });

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

      const preloader = document.getElementById('preloader');
      if (preloader && preloader.style.display !== 'none') {
        window.addEventListener('loader-finished', startAnimation, { once: true });
      } else {
        startAnimation();
      }
    },
    { scope: container }
  );

  // Lời chào lớn hoặc mặc định là tên từ i18n
  const mainText = title || t("landing.name") || "CUONG";
  // Tên ở hàng info
  const nameInInfo = fullName || t("landing.name") || "VU TUAN CUONG";

  const mainTextChars = mainText.split("").map((char, i) => (
    <span
      key={i}
      className={clsx(st.nameChar, "inline-block")}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section className={clsx(st.section, "bg-bg-pure")} ref={container} data-section="Hero" data-theme="light">
      {showInfo && (
        <div className={clsx(st.infoRow, "w-full")}>
          {/* New Name Field */}
          <div className={clsx(st.infoItem, "flex flex-col")}>
            <span className={st.infoLabel}>Name</span>
            <span className={st.infoValue}>{nameInInfo}</span>
          </div>
          
          <div className={clsx(st.infoItem, "flex flex-col")}>
            <span className={st.infoLabel}>Role</span>
            <span className={st.infoValue}>{t("hero.role")}</span>
          </div>
          <div className={clsx(st.infoItem, "flex flex-col")}>
            <span className={st.infoLabel}>Location</span>
            <span className={st.infoValue}>{t("landing.location")}</span>
          </div>
          <div className={clsx(st.infoItem, "flex flex-col")}>
            <span className={st.infoLabel}>Status</span>
            <span className={st.infoValue}>Available</span>
          </div>
        </div>
      )}

      <div className={clsx(st.descRow, "w-full")}>
        <p className={st.descCol}>
          {t("hero.desc")}
        </p>
        <p className={st.descCol}>
          {t("landing.role")}
        </p>
      </div>

      <div className={clsx(st.nameWrapper, "w-full overflow-hidden")}>
          <h1 ref={nameRef} className={clsx(st.name, "select-none")}>
            {mainTextChars}
          </h1>
      </div>
    </section>
  );
}
