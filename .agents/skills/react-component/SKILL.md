---
name: react-component
description: Guide for creating React components in the Astro portfolio project. Use this skill when creating or editing React components with SCSS modules, TypeScript interfaces, and GSAP animations.
license: MIT
metadata:
  author: portfolio-team
  version: "1.0.0"
  category: frontend
  tags: react, typescript, scss-modules, component-structure
---

# React Component Development Guide

Comprehensive guide for writing React components following the portfolio_astro project conventions.

## When to Use This Skill

Activate this skill when:

- Creating new React components (Section, Layout, Commons)
- Editing existing components
- Adding interactivity requiring client-side JavaScript
- Creating islands architecture with `client:load`, `client:visible`, etc.

## Component Directory Structure

```
src/components/
├── Commons/          # Shared components (ThemeToggle, GlobalBackground)
├── Layout/           # Header, Footer, Navigation
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── header.module.scss
│   │   ├── Navigation.tsx
│   │   └── navigation.module.scss
│   └── Footer/
└── Sections/         # Page sections (Hero, AboutMe, TechStack)
    └── [SectionName]/
        ├── [SectionName].tsx      # Main component
        ├── [section-name].module.scss  # Styles
        └── index.ts               # Re-export
```

## Standard Component Template

### 1. Main Component File (`.tsx`)

```tsx
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Locale } from "@i18n/ui";
import { useTranslations } from "@i18n/utils";
import st from "./[component-name].module.scss";

// Register GSAP plugins (if using)
gsap.registerPlugin(ScrollTrigger);

// Interface for Props - ALWAYS define explicitly
interface [ComponentName]Props {
    lang: Locale;
    // add other props as needed
}

// Export default - REQUIRED
export default function [ComponentName]({ lang }: [ComponentName]Props) {
    const t = useTranslations(lang);
    const sectionRef = useRef<HTMLElement>(null);

    // GSAP animations
    useGSAP(() => {
        // Animation logic here
    }, { scope: sectionRef });

    return (
        <section className={st.section} ref={sectionRef}>
            <div className={st.container}>
                {/* Content */}
            </div>
        </section>
    );
}
```

### 2. SCSS Module File (`.module.scss`)

```scss
// ========== SECTION WRAPPER ==========
.section {
  @apply relative w-full;
}

// ========== CONTAINER ==========
.container {
  @apply max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-24;
}

// ========== SUB-SECTIONS ==========
.leftCol {
  @apply lg:w-1/2;
}

.rightCol {
  @apply lg:w-2/3;
}

// ========== CARD STYLES ==========
.card {
  @apply relative;

  &:hover {
    // Hover states
  }
}

// ========== RESPONSIVE ==========
// Mobile-first approach with Tailwind breakpoints
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
```

### 3. Index File (`index.ts`)

```typescript
import [ComponentName] from './[ComponentName]';
export default [ComponentName];
```

## ClassName Conventions (REQUIRED)

| Purpose         | ClassName                         | Example                            |
| --------------- | --------------------------------- | ---------------------------------- |
| Section wrapper | `.section`, `.ctn`                | `<section className={st.section}>` |
| Container       | `.container`                      | `<div className={st.container}>`   |
| Main content    | `.main`, `.box`                   | `<div className={st.box}>`         |
| Columns         | `.leftCol`, `.rightCol`           | `<div className={st.leftCol}>`     |
| Cards           | `.card`, `.cardInner`             | `<article className={st.card}>`    |
| Decorations     | `.cardDecoTop`, `.cardDecoBottom` | Accent elements                    |

## Code Rules

### MUST DO ✅

1. **Export default** for all components
2. **TypeScript interfaces** for Props
3. **SCSS Modules** with `@apply` Tailwind
4. **Semantic HTML5** (`section`, `article`, `header`, `footer`, `ul/li`)
5. **i18n** - Use `useTranslations(lang)` for all text
6. **Refs** with `useRef` for GSAP animations
7. **Import aliases** using `@components`, `@i18n`, `@layouts`

### MUST NOT DO ❌

1. **Inline styles** - Use SCSS modules instead
2. **Hard-coded text** - Must use i18n keys
3. **Named exports** for main component (only export default)
4. **Complex logic in component** - Extract to utils/helpers
5. **Direct CSS classes** - Always use `st.className`

## Usage in Astro Page

```astro
---
import ComponentName from "@components/Sections/ComponentName";
---

<ComponentName lang="vi" client:load />
```

### Client Directives

| Directive        | When to Use                                           |
| ---------------- | ----------------------------------------------------- |
| `client:load`    | Component needs immediate hydration (Hero, Header)    |
| `client:visible` | Component below fold, hydrate when entering viewport  |
| `client:idle`    | Less critical component, hydrate when browser is idle |
| None             | Static HTML, no JavaScript needed                     |

## Reference Examples

- **Hero Section**: `src/components/Sections/Hero/HeroSection.tsx`
- **About Me**: `src/components/Sections/AboutMe/AboutMe.tsx`
- **Header**: `src/components/Layout/Header/Header.tsx`

## New Component Checklist

- [ ] Create folder in `Sections/`, `Layout/` or `Commons/`
- [ ] Create `.tsx` file with TypeScript interface
- [ ] Create `.module.scss` file with Tailwind @apply
- [ ] Create `index.ts` for re-export
- [ ] Add i18n keys to `src/i18n/ui.ts` (both vi and en)
- [ ] Import and use in `.astro` page
- [ ] Add GSAP animations if needed
