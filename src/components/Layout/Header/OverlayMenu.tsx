import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations, getRoute } from "../../../i18n/utils";
import type { Locale } from "../../../i18n/ui";

interface OverlayMenuProps {
    lang: Locale;
    isOpen: boolean;
    onClose: () => void;
}

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

export default function OverlayMenu({ lang, isOpen, onClose }: OverlayMenuProps) {
    const t = useTranslations(lang);
    const container = useRef(null);
    const tl = useRef<gsap.core.Timeline>(null);

    useGSAP(() => {
        gsap.set(container.current, { yPercent: -100, autoAlpha: 0 }); // Initial state: hidden top

        tl.current = gsap.timeline({ paused: true })
            .to(container.current, {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.6,
                ease: "power4.inOut"
            })
            .from(".menu-item", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.2");

    }, { scope: container });

    // Handle Open/Close
    useGSAP(() => {
        if (isOpen) {
            tl.current?.play();
            document.body.style.overflow = 'hidden'; // Lock scroll
        } else {
            tl.current?.reverse();
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    return (
        <div 
            ref={container} 
            className="fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center invisible"
        >
            <button 
                onClick={onClose}
                className="absolute top-8 right-8 text-white p-4 hover:opacity-70 transition-opacity"
            >
                <span className="material-symbols-outlined text-4xl">close</span>
            </button>

            {/* Links */}
            <nav className="flex flex-col items-center gap-8">
                {LINKS.map((link, idx) => (
                    <a 
                        key={idx}
                        href={getRoute(lang, link.href)}
                        onClick={onClose}
                        className="menu-item text-4xl sm:text-6xl font-bold uppercase tracking-tighter hover:text-accent-default transition-colors text-white"
                    >
                        {t(link.key as any)}
                    </a>
                ))}
            </nav>

            <div className="absolute bottom-12 text-white/30 text-sm uppercase tracking-widest">
                Portfolio 2026
            </div>
        </div>
    )
}