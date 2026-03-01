import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Locale } from "@i18n/ui";
import { useTranslations } from "@i18n/utils";
import st from "./contact.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  lang: Locale;
}

export default function Contact({ lang }: ContactProps) {
  const t = useTranslations(lang);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Split text for animation
  const titleText = t("contact.title");
  const titleChars = titleText.split("").map((char, index) => (
    <span key={index} className={`char ${st.char}`}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(`.${st.bgDeco}`, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        tl.fromTo(
          chars,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.8,
            ease: "power4.out",
          }
        );
      }

      // Animate Subtitle
      tl.fromTo(
        `.${st.subtitle}`,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // Animate Layout Divider
      tl.fromTo(
        `.${st.content}::before`,
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: "power3.inOut" },
        "-=0.6"
      );

      // Animate Left Info Blocks
      tl.fromTo(
        `.${st.infoBlock}`,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      );

      // Animate Form Elements
      if (formRef.current) {
        const formGroups = formRef.current.querySelectorAll(`.${st.formGroup}`);
        tl.fromTo(
          formGroups,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );

        tl.fromTo(
          `.${st.submitBtn}`,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
      }
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    const btn = sectionRef.current?.querySelector(`.${st.submitBtn}`);
    if (btn) {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }
    // In a real app, handle API call here
  };

  return (
    <section className={st.section} ref={sectionRef} id="contact" data-section="Contact">
      <div className={st.bgDeco}></div>
      <div className={st.container}>
        
        <header className={st.header}>
          <h2 className={st.title} ref={titleRef}>
            {titleChars}
          </h2>
          <p className={st.subtitle}>{t("contact.subtitle")}</p>
        </header>

        <div className={`${st.content} divider-parent`}>
          
          <div className={st.leftCol}>
            <div className={st.infoBlock}>
              <span className={st.infoLabel}>{t("contact.info")}</span>
              <div className={st.infoContent}>
                <a href="mailto:cuong@dev.com">{t("landing.email")}</a>
                <span>{t("landing.location")}</span>
              </div>
            </div>

            <div className={st.infoBlock}>
              <span className={st.infoLabel}>{t("contact.socials")}</span>
              <div className={st.infoContent}>
                <a href="https://github.com/cuongvutuan" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/cuongvutuan" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href="https://twitter.com/cuongvutuan" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </div>
            </div>
          </div>

          <div className={st.rightCol}>
            <form className={st.form} ref={formRef} onSubmit={handleSubmit}>
              <div className={st.formGroup}>
                <input 
                  type="text" 
                  className={st.formInput} 
                  placeholder={t("contact.name") + " *"} 
                  required 
                />
                <div className={st.line}></div>
              </div>

              <div className={st.formGroup}>
                <input 
                  type="email" 
                  className={st.formInput} 
                  placeholder={t("contact.email") + " *"} 
                  required 
                />
                <div className={st.line}></div>
              </div>

              <div className={st.formGroup}>
                <textarea 
                  className={st.formInput} 
                  placeholder={t("contact.message") + " *"} 
                  required 
                ></textarea>
                <div className={st.line}></div>
              </div>

              <button type="submit" className={`group ${st.submitBtn}`} aria-label={t("contact.submit")}>
                <div className="overflow-hidden h-6 relative">
                  <span className={`block ${st.btnText}`} data-text={t("contact.submit")}>
                    {t("contact.submit")}
                  </span>
                </div>
                <span className={st.btnArrow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
