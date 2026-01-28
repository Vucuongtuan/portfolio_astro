
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import st from "./hero-section.module.scss"
import { useTranslations} from "../../../i18n/utils"
import type { Locale } from "../../../i18n/ui";

interface HeroSectionProps {
    lang: Locale;
}

export default function HeroSection({ lang }: HeroSectionProps) {
    const t = useTranslations(lang);
    const container = useRef(null);

    useGSAP(() => {
        gsap.from(".hero-anim-item", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.5 // Chờ background load xíu rồi mới hiện chữ
        });
    }, { scope: container });

    return (
        <section className={st.ctn} ref={container}>
               <div className={st.box}>
                    <div className="space-y-12">
                        <div className="hero-anim-item w-12 h-px bg-accent-subtle"></div>
                        <div className="space-y-4">
                            <h1 className="hero-anim-item text-3xl sm:text-5xl font-bold tracking-tight">
                                {t('hero.greeting')}
                            </h1>
                            <p className="hero-anim-item text-lg sm:text-2xl opacity-60">
                                {t('hero.role')}
                            </p>
                        </div>
                        <div className="hero-anim-item max-w-md">
                            <p className="text-base leading-relaxed opacity-80">
                                {t('hero.desc')}
                            </p>
                        </div>
                        <div className="hero-anim-item pt-4">
                            <a className="group flex items-center gap-4 text-sm uppercase tracking-[0.3em] font-bold" href="mailto:contact">
                                <span>{t('hero.contact')}</span>
                                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
        </section>
    )
}