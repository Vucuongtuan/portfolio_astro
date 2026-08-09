import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { Angry, ArrowRight, Lightbulb } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const titleLargeClass = "font-sans text-[23vw] font-medium leading-[0.72] tracking-[-0.1em] text-[color:var(--master-hero-ink)] sm:text-[21vw] lg:text-[18vw]";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  noWrap?: boolean;
  style?: CSSProperties;
}

export function WordsPullUp({ text, className = "", showAsterisk = false, noWrap = false, style }: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from("[data-pull-word]", {
      y: 28,
      opacity: 0,
      duration: 0.7,
      stagger: 0.09,
      ease: "power3.out",
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={`inline-flex ${noWrap ? "flex-nowrap whitespace-nowrap" : "flex-wrap"} ${className}`} style={style}>
      {text.split(" ").map((word, index, words) => (
        <span
          key={`${word}-${index}`}
          data-pull-word
          className="relative inline-block text-white"
          style={{ marginRight: index === words.length - 1 ? 0 : "0.18em" }}
        >
          {word}
          {showAsterisk && index === words.length - 1 && <span className="absolute -right-[0.22em] top-[0.5em] text-[0.25em]">*</span>}
        </span>
      ))}
    </div>
  );
}

interface PrismaHeroProps {
  title: string;
  roleLabel: string;
  description: string;
  location: string;
  imageSrc: string;
  lightImageSrc?: string;
  navItems: Array<{ label: string; href: string }>;
  ctaLabel: string;
  ctaHref: string;
}

export function PrismaHero({ title, roleLabel, description, location, imageSrc, lightImageSrc, navItems, ctaLabel, ctaHref }: PrismaHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const typingBubbleRef = useRef<HTMLDivElement>(null);
  const typingMetaRef = useRef<HTMLSpanElement>(null);
  const typingTerminalRef = useRef<HTMLParagraphElement>(null);
  const typedTextRef = useRef<HTMLSpanElement>(null);
  const angryRef = useRef<HTMLDivElement>(null);
  const thoughtRef = useRef<HTMLDivElement>(null);
  const [activeImageSrc, setActiveImageSrc] = useState(imageSrc);
  const isLightTheme = activeImageSrc === lightImageSrc;

  const handleSectionLink = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#") || !document.querySelector(href)) return;
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("master:navigate", { detail: { href } }));
  };

  useEffect(() => {
    const updateImage = () => {
      const isLight = document.documentElement.classList.contains("light");
      setActiveImageSrc(isLight && lightImageSrc ? lightImageSrc : imageSrc);
    };

    updateImage();
    const observer = new MutationObserver(updateImage);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, [imageSrc, lightImageSrc]);

  useGSAP(() => {
    const nav = navRef.current;
    const section = sectionRef.current;
    const titleElement = titleRef.current;
    const roleElement = roleRef.current;
    const typingBubble = typingBubbleRef.current;
    const typingMeta = typingMetaRef.current;
    const typingTerminal = typingTerminalRef.current;
    const typedText = typedTextRef.current;
    const angry = angryRef.current;
    const thought = thoughtRef.current;
    if (!nav || !section || !titleElement || !roleElement || !typingBubble || !typingMeta || !typingTerminal || !typedText || !angry || !thought) return;

    const navStartY = nav.getBoundingClientRect().top + window.scrollY;
    const setNavPosition = () => {
      gsap.set(nav, { position: window.scrollY >= navStartY ? "fixed" : "absolute" });
    };
    setNavPosition();

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: setNavPosition,
      onRefresh: setNavPosition,
    });

    let roleHomeBounds: DOMRect | null = null;

    ScrollTrigger.create({
      trigger: roleElement,
      start: "top top+=18",
      end: "max",
      onEnter: () => {
        const roleBounds = roleElement.getBoundingClientRect();
        roleHomeBounds = roleBounds;
        const inset = 25;
        const rightInset = 15;

        gsap.set(roleElement, { position: "fixed", top: roleBounds.top, left: roleBounds.left, zIndex: 60 });
        gsap.to(roleElement, {
          top: inset,
          left: document.documentElement.clientWidth - roleBounds.width - rightInset,
          scale: 0.7,
          transformOrigin: "top right",
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf(roleElement);
        gsap.to(roleElement, {
          top: roleHomeBounds?.top ?? 18,
          left: roleHomeBounds?.left ?? 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.inOut",
          overwrite: true,
          onComplete: () => {
            gsap.set(roleElement, { clearProps: "position,top,left,zIndex,scale,transformOrigin" });
          },
        });
      },
    });

    gsap.from("[data-hero-enter]", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.14,
      delay: 0.35,
      ease: "power3.out",
    });

    gsap.from(typingBubble, { y: 16, opacity: 0, scale: 0.94, duration: 0.8, delay: 0.7, ease: "power3.out" });
    const typingTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.7, delay: 1.1 });
    typingTimeline
      .set([angry, thought], { autoAlpha: 0, scale: 0.65 })
      .set(typingTerminal, { autoAlpha: 1 })
      .set(typingBubble, { x: 0, backgroundColor: "rgba(11, 16, 32, 0.8)" })
      .set(typingMeta, { text: "typing..." })
      .set(typedText, { text: "" })
      .to(typedText, { text: "hello, world!", duration: 0.9, ease: "none" })
      .to({}, { duration: 1.1 })
      .set(typingMeta, { text: "running build" })
      .set(typedText, { text: "" })
      .to(typedText, { text: "npm run build", duration: 0.9, ease: "none" })
      .to({}, { duration: 0.55 })
      .set(typingMeta, { text: "error" })
      .set(typedText, { text: "" })
      .to(typedText, { text: "error: why won't it work?", duration: 1.25, ease: "none" })
      .to(typingBubble, { x: -4, duration: 0.055, repeat: 7, yoyo: true, ease: "none" })
      .to(typingBubble, { backgroundColor: "rgba(74, 22, 28, 0.88)", duration: 0.2 })
      .set(typingTerminal, { autoAlpha: 0 })
      .to(angry, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2)" })
      .to({}, { duration: 0.85 })
      .set(typingMeta, { text: "thinking..." })
      .to(angry, { autoAlpha: 0, scale: 0.65, duration: 0.18 })
      .to(typingBubble, { backgroundColor: "rgba(11, 16, 32, 0.8)", duration: 0.2 }, "<")
      .to(thought, { autoAlpha: 1, scale: 1, duration: 0.42, ease: "elastic.out(1, 0.45)" })
      .to({}, { duration: 1.5 });

    const handleThemeTransitionStart = (event: Event) => {
      const { theme } = (event as CustomEvent<{ theme: "light" | "dark" }>).detail;

      typingTimeline.pause();
      gsap.killTweensOf([typingBubble, typingMeta, typedText, angry, thought]);
      gsap.set([angry, thought], { autoAlpha: 0, scale: 0.65 });
      gsap.set(typingTerminal, { autoAlpha: 1 });
      gsap.set(typingBubble, { x: 0, backgroundColor: "rgba(11, 16, 32, 0.8)" });
      gsap.set(typingMeta, { text: "setting theme" });
      gsap.set(typedText, { text: "" });
      gsap.to(typedText, { text: `set theme: ${theme}`, duration: 0.8, ease: "none" });
    };

    const handleThemeTransitionEnd = () => typingTimeline.restart(true);
    window.addEventListener("theme-transition-start", handleThemeTransitionStart);
    window.addEventListener("theme-transition-end", handleThemeTransitionEnd);

    ScrollTrigger.create({
      trigger: titleElement,
      start: "top top+=18",
      end: "max",
      pin: true,
      pinReparent: true,
      pinSpacing: false,
      anticipatePin: 1,
    });
    gsap.to(titleElement, {
      scale: window.matchMedia("(min-width: 1024px)").matches ? 0.08 : 0.14,
      transformOrigin: "top left",
      ease: "none",
      scrollTrigger: { trigger: titleElement, start: "top top+=18", end: "+=180", scrub: 0.35 },
    });

    return () => {
      window.removeEventListener("theme-transition-start", handleThemeTransitionStart);
      window.removeEventListener("theme-transition-end", handleThemeTransitionEnd);
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="h-[100svh] w-full  p-2 sm:p-3">
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[color:var(--master-line)] bg-[var(--master-hero-bg)] md:rounded-[2rem]">
        <img src={activeImageSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${isLightTheme ? "from-white/10 via-white/0 to-white/25" : "from-black/10 via-black/0 to-black/40"}`} />

        <nav ref={navRef} className="absolute left-1/2 top-0 z-50 -translate-x-1/2 " aria-label="Master portfolio navigation">
          <div className="flex items-center gap-2 rounded-b-2xl bg-[#131311] px-3 py-2.5 sm:gap-4 sm:px-5 md:gap-7 md:rounded-b-3xl md:px-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleSectionLink(event, item.href)}
                className="whitespace-nowrap text-[9px] uppercase tracking-[0.05em] text-[color:var(--master-muted)] transition-colors hover:text-[color:var(--master-hero-ink)] sm:text-xs md:text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>


        <div ref={typingBubbleRef} className="absolute left-[48%] top-[45%] z-20 w-[min(20rem,54vw)] rounded-2xl border border-[#e1e0cc]/30 bg-[#0b1020]/80 p-4 text-[#e1e0cc] shadow-[0_16px_45px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-5">
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.14em] text-[#e1e0cc]/55 sm:text-[9px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8be9fd]" />
            <span ref={typingMetaRef}>typing...</span>
          </div>
          <p ref={typingTerminalRef} className="mt-2 min-h-[2.8em] font-mono text-[10px] leading-relaxed text-[#e1e0cc]/90 sm:text-xs" aria-live="polite">
            <span className="text-[#8be9fd]">&gt; </span><span ref={typedTextRef} /><span className="ml-0.5 inline-block h-[1em] w-px animate-pulse bg-[#e1e0cc] align-[-0.18em]" />
          </p>
          <div ref={angryRef} className="absolute inset-0 grid place-items-center" aria-hidden="true"><Angry className="h-9 w-9 text-[#ff9c9c] sm:h-11 sm:w-11" strokeWidth={1.5} /></div>
          <div ref={thoughtRef} className="absolute -right-5 -top-6 grid h-16 w-16 place-items-center rounded-[45%] border-2 border-[#e1e0cc] bg-[#e1e0cc] text-[#10172b] shadow-lg sm:h-[4.5rem] sm:w-[4.5rem]" aria-hidden="true">
            <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
            <span className="absolute -left-2 -top-2 text-sm">✦</span><span className="absolute -bottom-2 -right-1 text-xs">✦</span>
          </div>
          <span aria-hidden="true" className="absolute -bottom-2 left-[18%] h-4 w-4 rotate-45 border-b border-r border-[#e1e0cc]/30 bg-[#0b1020]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 sm:px-6 sm:pb-6 md:px-10 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-5">
            <div className="col-span-12 lg:col-span-8">
              <h1 ref={titleRef} className={`${titleLargeClass} pointer-events-none z-[70] text-white mix-blend-difference`}>
                <WordsPullUp text={title} showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex max-w-lg flex-col gap-5 pb-1 lg:col-span-4 lg:pb-4">
              <div ref={roleRef} className="w-fit font-sans text-lg font-medium tracking-[-0.04em] sm:text-xl">
                <WordsPullUp text={roleLabel} noWrap />
              </div>
              <div data-hero-enter>
                <p className="text-sm leading-relaxed text-[#e1e0cc]/75 sm:text-base">{description}</p>
              </div>
              <a data-hero-enter href={ctaHref} className="group inline-flex items-center gap-2 self-start rounded-full bg-[#e1e0cc] py-1 pl-4 pr-1 text-xs font-medium text-black transition-all hover:gap-3 sm:text-sm">
                {ctaLabel}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-9 sm:w-9"><ArrowRight className="h-3.5 w-3.5 text-[#e1e0cc]" strokeWidth={1.5} /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrismaHero;
