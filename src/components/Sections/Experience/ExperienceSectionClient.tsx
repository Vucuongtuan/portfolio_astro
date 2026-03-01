
import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import st from './experience-section.module.scss';
import type { Locale } from "../../../i18n/ui";
import { useTranslations } from "../../../i18n/utils";

gsap.registerPlugin(ScrollTrigger);

import type { CollectionEntry } from "astro:content";

type ExperienceData = CollectionEntry<'experience'>['data'];

interface ExperienceSectionProps {
    lang: Locale;
    data: ExperienceData;
}

export default function ExperienceSection({ lang, data }: ExperienceSectionProps) {
    const t = useTranslations(lang);
    const container = useRef(null);
    
    useGSAP(() => {
        gsap.from(".anim-title", {
            scrollTrigger: {
                trigger: ".anim-title",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".anim-item", {
            scrollTrigger: {
                trigger: ".experience-list",
                start: "top 75%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });

    }, { scope: container });

    if (!data) return null;

    return (
        <div ref={container} className={st.experienceContainer} data-section="Experience" data-theme="light">
            
         

            <div className="relative z-10 w-full">
                <header className={st.sectionHeader}>
                    <div className="flex flex-col">
                        <span className={st.sectionTag}>
                            PROFESSIONAL HISTORY / 02
                        </span>
                        <h2 className={`${st.mainTitle} anim-title`}>
                            {data.title}
                        </h2>
                    </div>
                </header>

                <section className="w-full experience-list">
                    <div className={st.tableHeader}>
                        <div className="w-1/4">{data.listHeader?.period}</div>
                        <div className="w-1/2">{data.listHeader?.organization}</div>
                        <div className="w-1/4 text-right">{data.listHeader?.roleLocation}</div>
                    </div>

                    {/* Experience Items */}
                    {data.items?.map((exp, index) => (
                        <article key={index} className={`${st.listItem} anim-item`}>
                            <div className={st.itemContent}>
                                
                                <div className={st.itemPeriod}>
                                    <span className={st.periodBadge}>
                                        {exp.period}
                                    </span>
                                </div>
                                
                                <div className={st.itemCompanyContainer}>
                                    <h3 className={st.itemCompany}>
                                        {exp.company}
                                    </h3>
                                </div>
                                
                                <div className={st.itemMeta}>
                                    <div className={st.itemRoleInfo}>
                                        <div className={st.roleTitle}>{exp.role}</div>
                                        <div className={st.roleLocation}>{exp.location}</div>
                                    </div>
                                    <span className={`material-icons ${st.itemArrow}`}>arrow_outward</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>

            </div>
        </div>
    );
}
