import { useRef } from "react";
import type { Locale } from "@i18n/ui";
import st from "./bottom-screen.module.scss";
import clsx from "clsx";
import { useAdaptiveColor } from "src/hooks/useAdaptiveColor";

interface Props {
  lang: Locale;
}

export default function BottomScreenClient({ lang }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const clipPath = useAdaptiveColor(wrapperRef);

  const renderContent = () => (
    <>
      <a href="/vi" className={clsx(st.langLink, lang === "vi" && st.active)}>VI</a>
      <span className={st.sep}>|</span>
      <a href="/en" className={clsx(st.langLink, lang === "en" && st.active)}>EN</a>
    </>
  );

  return (
    <div ref={wrapperRef} className={st.wrapper}>
      <div className={clsx(st.bottomScreen, st.layerLight)}>
        {renderContent()}
      </div>
      <div
        className={clsx(st.bottomScreen, st.layerDark)}
        style={{ clipPath }}
        aria-hidden="true"
      >
        {renderContent()}
      </div>
    </div>
  );
}
