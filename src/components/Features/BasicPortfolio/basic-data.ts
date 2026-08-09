import { getCollection, getEntry } from "astro:content";
import type { Locale } from "@i18n/ui";

export const technologyIcons: Record<string, string> = {
  "JavaScript (ES6+)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Go / Golang": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  "SQL / NoSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "HTML5 / CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  "React / Next.js / Remix / React Native / Expo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Vue / Nuxt.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "Node.js / ExpressJS / NestJS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Asp.net Core Web API / Entity Framework / WinForms Application": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  "GO / net-http / Gin-Gonic / GORM ": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  Astro: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg",
  GSAP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Fluter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "Git / GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  RabbitMQ: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg",
  Redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  Codex: "https://cdn.simpleicons.org/openai/ffffff",
  Postman: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
};

export async function getBasicPortfolioData(lang: Locale) {
  const [projectsEntry, stack, experienceEntry] = await Promise.all([
    getEntry("projects", lang),
    getCollection("tech-stack"),
    getEntry("experience", lang),
  ]);

  const projects = projectsEntry?.data.items ?? [];
  const skills = stack
    .sort((a, b) => a.data.order - b.data.order)
    .flatMap((entry) => entry.data.items.map((item) => ({
      name: item.name,
      icon: technologyIcons[item.name],
    })))
    .filter((skill) => Boolean(skill.icon));

  return { projects, skills, experience: experienceEntry?.data };
}
