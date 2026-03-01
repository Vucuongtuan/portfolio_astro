import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "../../../i18n/utils";
import type { Locale } from "../../../i18n/ui";
import st from "./landing-hero.module.scss";

// Import illustration
import heroIllustration from "../../../assets/hero-illustration.png";

interface LandingHeroProps {
    lang: Locale;
}

// Placeholder thumbnails (using unsplash random architecture/interior images to match 'kin style)
const FEATURED_PROJECTS = [
    { id: "01", color: "#e6ccb8", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop", alt: "Project 1" },
    { id: "02", color: "#d6cfc5", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=100&fit=crop", alt: "Project 2" },
    { id: "03", color: "#c1c8c7", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=100&h=100&fit=crop", alt: "Project 3" },
];

export default function LandingHero({ lang }: LandingHeroProps) {
    const t = useTranslations(lang);
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Big name entrance - slide up + fade
        gsap.from(`.${st.bigName}`, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2,
        });

        // Middle content - stagger entrance
        gsap.from(`.${st.description}`, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.6,
        });

        // Sidebar items - stagger slide in from left
        gsap.from(`.${st.sidebarLabel}`, {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.8,
        });

        gsap.from(`.${st.thumbItem}`, {
            x: -40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            delay: 1,
        });

        // Illustration - fade in from right
        gsap.from(`.${st.illustrationWrap}`, {
            x: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.5,
        });

        // Footer - fade up
        gsap.from(`.${st.footerBlock}`, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            delay: 1.2,
        });

        // Layout toggle - fade in
        gsap.from(`.${st.layoutToggle}`, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 1.4,
        });
    }, { scope: sectionRef });

    return (
        <section className={st.section} ref={sectionRef}>
            <div className={st.container}>
                {/* Big Name / Logo */}
                <h1 className={st.bigName}>
                    {`'${t("landing.name").toLowerCase()}`}
                </h1>

                {/* Layout Toggle (decorative) */}
                <div className={st.layoutToggle}>
                    <span className={st.layoutLabel}>LAYOUT</span>
                    <button className={st.layoutBtnActive} type="button">1</button>
                    <button className={st.layoutBtn} type="button">2</button>
                </div>

                {/* Sidebar - Featured Works */}
                <aside className={st.sidebar}>
                    <span className={st.sidebarLabel}>{t("landing.featured")}</span>
                    <div className={st.thumbList}>
                        {FEATURED_PROJECTS.map((project) => (
                            <div key={project.id} className={st.thumbItem}>
                                <div
                                    className={st.thumbImage}
                                    style={{ 
                                        backgroundColor: project.color,
                                        backgroundImage: `url(${project.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    role="img"
                                    aria-label={project.alt}
                                />
                                <span className={st.thumbNumber}>{project.id}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Middle Content */}
                <div className={st.middleContent}>
                    <p className={st.description}>
                        <strong>'{t("landing.name").toLowerCase()}</strong>{" "}
                        {t("landing.role")}
                    </p>
                </div>

                {/* Illustration */}
                <div className={st.illustrationWrap}>
                    <img
                        src={heroIllustration.src}
                        alt="Developer illustration"
                        className={st.illustration}
                        loading="eager"
                    />
                </div>

                {/* Footer Info */}
                <footer className={st.footer}>
                    <div className={st.footerBlock}>
                        <span className={st.footerText}>{t("landing.year")}</span>
                    </div>
                    <div className={st.footerBlock}>
                        <span className={st.footerLabel}>Location</span>
                        <span className={st.footerText}>{t("landing.location")}</span>
                    </div>
                    <div className={st.footerBlock}>
                        <span className={st.footerText}>{t("landing.email")}</span>
                    </div>
                    <div className={st.footerBlock}>
                        <a href="https://github.com" className={st.footerLink} target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        <a href="https://linkedin.com" className={st.footerLink} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                    </div>
                </footer>
            </div>
        </section>
    );
}
