import React, { useState, useRef } from 'react';
import styles from './project-grid.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface Project {
    id: string;
    title: string;
    description: string;
    category?: 'personal' | 'work' | 'all';
    thumbnail?: string;
    images?: string[];
    tags?: string[];
    year?: string;
    links?: {
        github?: string;
        demo?: string;
    };
}

interface ProjectGridClientProps {
    projects: Project[];
    sectionTitle: string;
    lang: string;
    allText: string;
    personalText: string;
    workText: string;
    viewText: string;
}

export default function ProjectGridClient({ projects, sectionTitle, lang, allText, personalText, workText, viewText }: ProjectGridClientProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'personal' | 'work'>('all');
    const containerRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const filteredProjects = projects.filter(project => 
        activeTab === 'all' || (project.category && project.category === activeTab)
    );

    useGSAP(() => {
        if (!headerRef.current) return;
        
        gsap.from(headerRef.current.children, {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        });
    }, { scope: containerRef });

    useGSAP(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
        
        // Reset state
        gsap.set(cards, { opacity: 0, y: 50 });

        // Animate
        gsap.to(cards, { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: 'power3.out',
            scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            }
        });

        // Ensure triggers are updated after filtering
        ScrollTrigger.refresh();
    }, { scope: containerRef, dependencies: [activeTab] });

    return (
        <section className={styles.section} ref={containerRef} data-section="Works">
            <div className={styles.ctn}>
                <div className={styles.header} ref={headerRef}>
                    <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
                    
                    <div className={`${styles.tabs} scrollbar-hide`}>
                        <button 
                            className={`${styles.tabBtn} ${activeTab === 'all' ? styles.active : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            {allText}
                        </button>
                        <button 
                            className={`${styles.tabBtn} ${activeTab === 'personal' ? styles.active : ''}`}
                            onClick={() => setActiveTab('personal')}
                        >
                            {personalText}
                        </button>
                        <button 
                            className={`${styles.tabBtn} ${activeTab === 'work' ? styles.active : ''}`}
                            onClick={() => setActiveTab('work')}
                        >
                            {workText}
                        </button>
                    </div>
                </div>

                <div className={styles.gridCtn} ref={gridRef}>
                    {filteredProjects.map((project) => (
                        <a href={`${lang}/works/${project.id}`} key={project.id} className={`${styles.card} group`}>
                            <div className={styles.imageWrapper}>
                                {project.thumbnail && (
                                    <img src={project.thumbnail} alt={project.title} className={`${styles.image} group-hover:scale-105`} loading="lazy" />
                                )}
                                <div className={`${styles.overlay} group-hover:opacity-100`}>
                                    <span className={`${styles.viewBtn} group-hover:translate-y-0`}>{viewText}</span>
                                </div>
                            </div>
                            
                            <div className={styles.cardContent}>
                                <div className={styles.meta}>
                                    <span>{project.category === 'work' ? workText : personalText}</span>
                                    <span>{project.year}</span>
                                </div>
                                <h3 className={styles.title}>{project.title}</h3>
                                <p className={styles.description}>{project.description}</p>
                                
                                {project.tags && project.tags.length > 0 && (
                                    <div className={styles.tags}>
                                        {project.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <span className={styles.tag}>+{project.tags.length - 3}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
