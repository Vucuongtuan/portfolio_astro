import type { Locale } from "@i18n/ui";
import st from "./bottom-screen.module.scss";
import clsx from "clsx";
import LiveClock from "../LiveClock/LiveClock";

interface Props {
  lang: Locale;
}

export default function BottomScreenClient({ lang }: Props) {
  return (
    <div className={st.bottomScreen}>
      <div className={st.leftSide}>
        <a href="/vi" className={clsx(st.langLink, lang === "vi" && st.active)}>VI</a>
        <span className={st.sep}>|</span>
        <a href="/en" className={clsx(st.langLink, lang === "en" && st.active)}>EN</a>
      </div>
      <div className={st.rightSide}>
        <LiveClock />
      </div>
    </div>
  );
}
