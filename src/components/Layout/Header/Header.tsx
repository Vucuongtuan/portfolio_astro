
import clsx from "clsx"
import st from "./header.module.scss"
import NavigationHeader from "./Navigation"
import type { Locale } from "@i18n/ui"
import ThemeToggle from "@components/Commons/ThemeToggle"

const SOCIAL_LINKS = ['W', 'A', 'C']

interface HeaderProps {
    lang: Locale;
}

export default function Header({ lang }: HeaderProps) {
    return (
         <header className={st.header}>
            <div className={st.peripheral}>
                <ul className={clsx(st.linkList, st.linkListHorizontal)}>
                    <li className={st.linkItem}>
                        <a
                            href={lang === 'vi' ? '/?ref=site-logo' : `/${lang}/?ref=site-logo`}
                            className={clsx(
                                st.link,
                                st.linkActive,
                                'peripheral-link'
                            )}
                        >
                            <span className={clsx('dot')} />
                            <span className={st.label}>VTC.</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="flex items-center gap-4 social-container">
            
               <div className={st.social}>
                  <NavigationHeader lang={lang}/>
               </div>
            </div>
        </header>
    )
}