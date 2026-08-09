import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, Download, Sparkle } from "lucide-react";
import type { Locale } from "@i18n/ui";
import { useTranslations } from "@i18n/utils";
import st from "./basic-features.module.scss";

const fundingVideo = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4";
const softwareVideo = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4";
const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

type FormStatus = "idle" | "sending" | "success" | "error";

interface BasicFeaturesProps {
  lang: Locale;
  about: { title: string; quote: string; body: string };
  experience: { title: string; items: Array<{ period: string; company: string; role: string; location: string }> };
  projects: Array<{ id: string; title: string; description: string; category?: "personal" | "work" | "all"; tags?: string[]; year?: string; role?: string; duration?: string; teamSize?: string; goals?: string; features?: string[]; thumbnail?: string; href: string }>;
  tools: Array<{ name: string; icon: string }>;
}

function Label({ children, align = "center" }: { children: string; align?: "center" | "start" }) {
  return (
    <p className={`${st.label} ${align === "start" ? st.labelStart : ""}`}>
      <Sparkle aria-hidden="true" />
      <span>{children}</span>
      <Sparkle aria-hidden="true" />
    </p>
  );
}

function Video({ src }: { src: string }) {
  return <video className={st.video} src={src} autoPlay loop muted playsInline aria-hidden="true" />;
}

function Marquee({ items, direction }: { items: Array<{ name: string; icon: string }>; direction: "left" | "right" }) {
  const duplicatedItems = [...items, ...items];
  return (
    <div className={st.marqueeMask}>
      <div className={`${st.marqueeTrack} ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>
        {duplicatedItems.map((tool, index) => (
          <span className={`liquid-glass ${st.iconTile}`} key={`${direction}-${index}`} title={tool.name}>
            <img src={tool.icon} alt={tool.name} loading="lazy" decoding="async" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BasicFeatures({ lang, about, experience, projects, tools }: BasicFeaturesProps) {
  const t = useTranslations(lang);
  const toolRows = [tools.slice(0, 8), tools.slice(8, 16)];
  const [formData, setFormData] = useState({ user_name: "", user_email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [selectedProject, setSelectedProject] = useState<BasicFeaturesProps["projects"][number] | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: formData.user_name,
        email: formData.user_email,
        message: formData.message,
        to_name: "Vu Tuan Cuong",
      }, EMAILJS_PUBLIC_KEY);
      setFormData({ user_name: "", user_email: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={st.section} aria-labelledby="basic-features-title">
      <div className={st.cardGrid}>
        <div className={st.leftColumn}>
          <article className={`noise-overlay ${st.card} ${st.aboutCard}`}>
            <Label align="start">{about.title}</Label>
            <div className={st.aboutContent}>
              <h2 id="basic-features-title">{t("hero.greeting")}</h2>
              <p>{about.body}</p>
            </div>
          </article>
          <article className={`${st.card} ${st.experienceCard}`}>
            <Label align="start">{experience.title}</Label>
            <ul className={st.experienceList}>
              {experience.items.map((item) => (
                <li key={`${item.company}-${item.period}`}>
                  <span>{item.period}</span>
                  <div><strong>{item.role}</strong><p>{item.company}</p><small>{item.location}</small></div>
                </li>
              ))}
            </ul>
          </article>
          <a className={`liquid-glass ${st.cvCard}`} href="/images/VuTuanCuong_CV_Web_Developer.pdf" download>
            <span>{experience.title === "Kinh nghiệm làm việc" ? "Tải CV" : "Download CV"}</span>
            <Download strokeWidth={1.5} />
          </a>
          <article className={`noise-overlay ${st.card} ${st.settingsCard}`}>
            <Label align="start">{t("basic.language")}</Label>
            <div className={st.settingRow}>
              <span>{t("basic.language")}</span>
              <nav className={st.languageSwitch} aria-label={t("basic.language")}>
                <a className={lang === "vi" ? st.languageActive : ""} href="/vi/basic">VI</a>
                <a className={lang === "en" ? st.languageActive : ""} href="/en/basic">EN</a>
              </nav>
            </div>
          </article>
        </div>

        <article className={`${st.card} ${st.projectCard}`}>
          <Video src={fundingVideo} />
          {selectedProject ? (
            <div className={st.projectDetail}>
              <header className={st.detailHeader}>
                <button type="button" onClick={() => setSelectedProject(null)}><span aria-hidden="true">←</span> {t("basic.selectedWork")}</button>
                <em>{selectedProject.category === "work" ? t("works.work") : selectedProject.category === "all" ? t("works.all") : t("works.personal")}</em>
              </header>
              {selectedProject.thumbnail ? <img src={selectedProject.thumbnail} alt="" className={st.detailImage} /> : <div className={st.detailFallback} aria-hidden="true" />}
              <div className={st.detailContent}>
                <p>{selectedProject.year}</p>
                <h2>{selectedProject.title}</h2>
                <p className={st.detailDescription}>{selectedProject.description}</p>
                <dl className={st.detailMeta}>
                  <div><dt>{t("basic.role")}</dt><dd>{selectedProject.role ?? "—"}</dd></div>
                  <div><dt>{t("basic.duration")}</dt><dd>{selectedProject.duration ?? "—"}</dd></div>
                  <div><dt>{t("basic.team")}</dt><dd>{selectedProject.teamSize ?? "—"}</dd></div>
                </dl>
                <section className={st.detailSection}>
                  <h3>{t("basic.overview")}</h3>
                  <p>{selectedProject.goals ?? selectedProject.description}</p>
                </section>
                <section className={st.detailSection}>
                  <h3>{t("basic.stack")}</h3>
                  <ul className={st.detailStack}>{selectedProject.tags?.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </section>
                {selectedProject.features?.length ? <section className={st.detailSection}><h3>{t("basic.features")}</h3><ol className={st.detailFeatures}>{selectedProject.features.slice(0, 4).map((feature) => <li key={feature}>{feature}</li>)}</ol></section> : null}
              </div>
            </div>
          ) : (
            <>
              <header className={st.projectHeader}>
                <p>{t("basic.selectedWork")}</p>
                <span>{t("basic.projectsDelivered")}</span>
              </header>
              <ol className={st.projectList}>
                {projects.map((project, index) => (
                  <li key={project.id}>
                    <button type="button" onClick={() => setSelectedProject(project)} aria-label={`${t("works.view")} ${project.title}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><h3>{project.title}</h3><p>{project.description}</p></div>
                      <em className={st.projectCategory}>{project.category === "work" ? t("works.work") : project.category === "all" ? t("works.all") : t("works.personal")}</em>
                      <time>{project.year}</time>
                    </button>
                  </li>
                ))}
              </ol>
            </>
          )}
        </article>

        <div className={st.column}>
          <article className={`${st.card} ${st.softwareCard}`}>
            <Video src={softwareVideo} />
            <Label>{t("basic.dailyStack")}</Label>
            <div className={st.marquees}>
              <Marquee items={toolRows[0]} direction="left" />
              <Marquee items={toolRows[1]} direction="right" />
            </div>
          </article>
          <article className={`noise-overlay ${st.card} ${st.contactCard}`}>
            <Label align="start">{t("contact.title")}</Label>
            <div className={st.contactIntro}>
              <a href={`mailto:${t("landing.email")}`}>{t("landing.email")}</a>
              <p>{t("contact.subtitle")}</p>
              <span><a href="https://github.com/Vucuongtuan" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/vtc-b450b9313" target="_blank" rel="noreferrer">LinkedIn</a></span>
            </div>
            <form className={st.contactForm} onSubmit={handleSubmit}>
              <div className={st.contactFields}>
                <input type="text" name="user_name" placeholder={t("contact.name")} value={formData.user_name} onChange={(event) => setFormData({ ...formData, user_name: event.target.value })} required />
                <input type="email" name="user_email" placeholder={t("contact.email")} value={formData.user_email} onChange={(event) => setFormData({ ...formData, user_email: event.target.value })} required />
              </div>
              <textarea name="message" placeholder={t("contact.message")} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} required />
              <button type="submit" disabled={status === "sending"}>{status === "sending" ? t("contact.sending") : t("contact.submit")} <ArrowUpRight strokeWidth={1.5} /></button>
              {status === "success" && <p className={st.formSuccess}>{t("contact.success")}</p>}
              {status === "error" && <p className={st.formError}>{t("contact.error")}</p>}
            </form>
          </article>
        </div>
      </div>

    </section>
  );
}
