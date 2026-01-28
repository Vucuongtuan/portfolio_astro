import ThemeToggle from "@components/Commons/ThemeToggle";
import type { Locale } from "@i18n/ui";
import clsx from "clsx";
import { useState } from "react";
import useRoute from "src/hooks/useRoute";




export default function FooterLayer({lang}: {lang?: Locale}) {

    return (
          <footer className="fixed bottom-0 left-0 right-0 p-8 flex justify-between items-end z-50 pointer-events-none mix-blend-difference text-white">
            <div className="pointer-events-auto flex gap-6">
                   <div className="pointer-events-auto">
                   <ThemeToggle  />
               </div>
                <div className="border border-white/30 px-2 py-1 text-base font-mono font-bold flex items-center gap-2 select-none backdrop-blur-[2px]">
                    <a className={clsx(` hover:opacity-100 dark:text-white transition-opacity font-normal`,
                        lang === 'en' ? 'opacity-100 ' : 'opacity-50'
                    )} href="/en">EN</a>
                    <span className="opacity-50 font-normal">/</span>
                    <a className={clsx(` hover:opacity-100 transition-opacity font-normal`,
      
      lang === 'vi' ? 'opacity-100 ' : 'opacity-50'
                    )} href="/vi">VI</a>
                </div>
                {/* <a className="peripheral-link text-[10px] uppercase tracking-[0.2em]" href="#">GH</a> */}
                {/* <a className="peripheral-link text-[10px] uppercase tracking-[0.2em]" href="#">TW</a> */}
            </div>
       
            <div className="pointer-events-auto">
                <span className="peripheral-link text-base uppercase tracking-tighter">©2026 - {lang}</span>
            </div>
        </footer> 
    )
}