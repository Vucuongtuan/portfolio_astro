import clsx from "clsx"
import { useState, useEffect } from "react";
import st from "./navigation.module.scss"
import { useTranslations, getRoute } from "../../../i18n/utils"
import OverlayMenu from "./OverlayMenu";
import type { Locale } from "../../../i18n/ui";

const LINKS = [{
    key: 'nav.home',
    href: '/',
},{
    key:'nav.about',
    href:'/about',
},{
    key:'nav.projects',
    href:'/projects',
}] as const;

interface NavigationHeaderProps {
    lang: Locale;
}

export default function NavigationHeader({ lang }: NavigationHeaderProps){
    const t = useTranslations(lang);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Ngưỡng scroll để kích hoạt hamburger (50px)
            setIsScrolled(scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className="flex items-center justify-end min-h-[40px]">
                {/* Horizontal Menu (Visible when at top) */}
                <ul className={clsx(
                    st.linkList, 
                    st.linkListHorizontal, 
                    "transition-all duration-500 ease-in-out origin-right",
                    isScrolled ? "opacity-0 scale-x-50 pointer-events-none absolute right-0" : "opacity-100 scale-100 relative"
                )}>
                    {LINKS.map((link,idx) => (
                        <li key={link.href+'-'+idx} className="ml-8 first:ml-0">
                            <a
                                href={getRoute(lang, link.href)}
                                className={clsx(
                                    st.link, 
                                    'peripheral-link text-sm uppercase tracking-widest hover:text-accent-default transition-colors'
                                )}
                            >
                                {t(link.key as any)}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Hamburger Button (Visible when scrolled) */}
                <button 
                    onClick={() => setIsMenuOpen(true)}
                    className={clsx(
                        "flex flex-col gap-1.5 p-2 group hover:gap-2 transition-all duration-300 absolute right-0",
                        isScrolled ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
                    )}
                    aria-label="Menu"
                >
                    <span className="w-8 h-0.5 bg-current block transition-all group-hover:bg-accent-default"></span>
                    <span className="w-8 h-0.5 bg-current block transition-all group-hover:bg-accent-default group-hover:w-6 ml-auto"></span>
                    <span className="w-8 h-0.5 bg-current block transition-all group-hover:bg-accent-default"></span>
                </button>
            </div>

            {/* Fullscreen Overlay Menu */}
            <OverlayMenu 
                lang={lang} 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
            />
        </>
    );
}