import type { Locale } from "@i18n/ui";
import { useTranslations } from "@i18n/utils";
import st from "./spacer.module.scss";

interface SpacerProps {
    lang: Locale;
    variant?: "small" | "medium" | "large" | "absolute";
    enableScroll?: boolean;
}

export default function Spacer({ 
    lang, 
    variant = "large", 
    enableScroll = false 
}: SpacerProps) {
    const t = useTranslations(lang);

    const variantClass = {
        small: st.spacerSmall,
        medium: st.spacerMedium,
        large: st.spacerLarge,
        absolute: st.spacerAbsolute,
    }[variant];

    return (
        <section 
            className={`${st.spacer} ${variantClass}`} 
            aria-label={`Spacer-${variant}`}
        >
            {enableScroll && (
                <div className={st.scrollIndicator}>
                    <span className={st.arrow}>↓</span>
                    <span className={st.label}>{t('spacer.scroll')}</span>
                </div>
            )}
        </section>
    );
}