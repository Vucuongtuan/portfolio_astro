import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import emailjs from "@emailjs/browser";
import type { Locale } from "@i18n/ui";
import { useTranslations } from "@i18n/utils";
import st from "./contact.module.scss";

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

type FormStatus = "idle" | "sending" | "success" | "error";

interface ContactProps {
  lang: Locale;
}

export default function Contact({ lang }: ContactProps) {
  const t = useTranslations(lang);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const titleText = t("contact.title");
  const titleChars = titleText.split("").map((char, index) => (
    <span key={index} className={`char ${st.char}`} data-cursor="chars">
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

      tl.fromTo(
        `.${st.subtitle}`,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      tl.fromTo(
        `.${st.content}::before`,
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: "power3.inOut" },
        "-=0.6"
      );

      tl.fromTo(
        `.${st.infoBlock}`,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      );

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const btn = sectionRef.current?.querySelector(`.${st.submitBtn}`);
    if (btn) {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }

    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.user_name,
          from_email: formData.user_email,
          message: formData.message,
          to_name: "Vu Tuan Cuong",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ user_name: "", user_email: "", message: "" });

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0.5, y: -5 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }

      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const getSubmitText = () => {
    switch (status) {
      case "sending":
        return t("contact.sending");
      case "success":
        return t("contact.success");
      case "error":
        return t("contact.error");
      default:
        return t("contact.submit");
    }
  };

  return (
    <section data-theme="dark" className={st.section} ref={sectionRef} id="contact" data-section="Contact">
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
                <a href="mailto:vucuongtuan00@gmail.com">{t("landing.email")}</a>
                <span>{t("landing.location")}</span>
              </div>
            </div>

            <div className={st.infoBlock}>
              <span className={st.infoLabel}>{t("contact.socials")}</span>
              <div className={st.infoContent}>
                <a href="https://github.com/Vucuongtuan" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/vtc-b450b9313" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className={st.rightCol}>
            <form className={st.form} ref={formRef} onSubmit={handleSubmit}>
              <div className={st.formGroup}>
                <input 
                  type="text" 
                  name="user_name"
                  className={st.formInput} 
                  placeholder={t("contact.name") + " *"} 
                  value={formData.user_name}
                  onChange={handleChange}
                  disabled={status === "sending"}
                  required 
                />
                <div className={st.line}></div>
              </div>

              <div className={st.formGroup}>
                <input 
                  type="email" 
                  name="user_email"
                  className={st.formInput} 
                  placeholder={t("contact.email") + " *"} 
                  value={formData.user_email}
                  onChange={handleChange}
                  disabled={status === "sending"}
                  required 
                />
                <div className={st.line}></div>
              </div>

              <div className={st.formGroup}>
                <textarea 
                  name="message"
                  className={st.formInput} 
                  placeholder={t("contact.message") + " *"} 
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "sending"}
                  required 
                ></textarea>
                <div className={st.line}></div>
              </div>

              {status === "success" && (
                <p className={st.statusSuccess}>{t("contact.success")}</p>
              )}
              {status === "error" && (
                <p className={st.statusError}>{t("contact.error")}</p>
              )}

              <button 
                type="submit" 
                className={`group ${st.submitBtn} ${status === "sending" ? st.disabled : ""}`} 
                aria-label={t("contact.submit")}
                disabled={status === "sending"}
              >
                <div className="overflow-hidden h-6 relative">
                  <span className={`block ${st.btnText}`} data-text={getSubmitText()}>
                    {getSubmitText()}
                  </span>
                </div>
                {status === "sending" ? (
                  <span className={st.spinner}></span>
                ) : (
                  <span className={st.btnArrow}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
