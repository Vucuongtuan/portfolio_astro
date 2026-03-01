import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Locale } from '@i18n/ui';
import styles from './tech-stack.module.scss';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

export interface TechCategory {
  id: string;
  category: string;
  items: string[];
}

interface TechStackClientProps {
  lang: Locale;
  stackCategories: TechCategory[];
}

const uiText = {
  vi: {
    sectionLabel: '02. Khả năng',
    title: 'CÔNG NGHỆ',
    subtitle: 'Một kho vũ khí kỹ thuật số luôn phát triển.',
    subtitleLine2: 'Được nhóm theo chức năng, thành thạo qua thực hành.',
  },
  en: {
    sectionLabel: '02. Capabilities',
    title: 'THE STACK',
    subtitle: 'An evolving arsenal of digital tools.',
    subtitleLine2: 'Grouped by function, mastered by practice.',
  },
};

export const TechStackClient: React.FC<TechStackClientProps> = ({ lang, stackCategories }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = uiText[lang];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(`.${styles["horizontal-item"]}`);
      const horizontalContainer = document.querySelector(`.${styles["horizontal-container"]}`);
      
      if(horizontalContainer) {
          gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: 1,
              end: () => "+=" + ((horizontalContainer as HTMLElement).scrollWidth - window.innerWidth),
            }
          });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.ctn} data-section="TechStack">
      <header className={styles.label}>{t.sectionLabel}</header>
      
      <div className={styles["horizontal-container"]}>
          
          <article className={`${styles["horizontal-item"]} ${styles["intro-card"]}`}>
              <h2>
                {t.title.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {word}
                    {i < t.title.split(' ').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
              <p>
                {t.subtitle} <br/>
                {t.subtitleLine2}
              </p>
              <div className={styles["decor-lines"]}>
                 <div></div>
                 <div></div>
              </div>
          </article>

          {stackCategories.map((cat, idx) => (
              <article key={idx} className={`${styles["horizontal-item"]} ${styles["tech-card"]} group`}>
                  <header className={styles.header}>
                      <span className={styles.id}>{cat.id}</span>
                      <h3 className={styles.category}>{cat.category}</h3>
                  </header>

                  <ul className={styles.list}>
                      {cat.items.map((tech, tIdx) => (
                          <li key={tIdx} className={styles.item}>
                              <span>{tech}</span>
                              <span className={styles.arrow}>→</span>
                          </li>
                      ))}
                  </ul>
                  
                  <div className={styles["corner-decor"]}></div>
              </article>
          ))}
           
          <div className={`${styles["horizontal-item"]} ${styles["next-section-btn"]}`}>
               <button 
                 onClick={() => {
                   const wrapper = containerRef.current;
                   if (wrapper) {
                     const nextSection = wrapper.nextElementSibling as HTMLElement;
                     if (nextSection) {
                       nextSection.scrollIntoView({ behavior: 'smooth' });
                     }
                   }
                 }}
                 aria-label="Scroll to next section"
                 className={clsx("group")}
               >
                    <div className={clsx(styles.glow, "group-hover:opacity-30")}></div>
                    <div className={clsx(styles.circle, "group-hover:border-white")}>
                        {/* Arrow Down Icon */}
                        <svg 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                          />
                        </svg>
                    </div>
               </button>
          </div>

      </div>
    </section>
  );
};
