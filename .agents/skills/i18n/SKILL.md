---
name: i18n
description: Guide for implementing internationalization (i18n) in the Astro portfolio project. Use this skill when adding translations, creating translation keys, and handling multi-language routing.
license: MIT
metadata:
  author: portfolio-team
  version: "1.0.0"
  category: i18n
  tags: internationalization, translations, locale, multi-language
---

# Internationalization (i18n) Guide

Comprehensive guide for implementing multi-language support in the portfolio_astro project.

## When to Use This Skill

Activate this skill when:

- Adding new text that needs translation
- Creating translation keys for components
- Handling language-based routing
- Working with locale detection

## i18n Structure

```
src/i18n/
├── ui.ts       # Translation strings for vi and en
└── utils.ts    # Helper functions (getLangFromUrl, useTranslations, getRoute)
```

## Supported Languages

| Locale | Name       | Default |
| ------ | ---------- | ------- |
| `vi`   | Vietnamese | ✅ Yes  |
| `en`   | English    | No      |

## Translation Structure (`ui.ts`)

```typescript
export type Locale = "vi" | "en";

export const languages = {
  vi: "Tiếng Việt",
  en: "English",
};

export const defaultLang = "vi";

export const ui = {
  vi: {
    // Navigation
    "nav.home": "Trang chủ",
    "nav.about": "Giới thiệu",
    "nav.projects": "Dự án",
    "nav.contact": "Liên hệ",

    // Section keys with pattern: [section].[element]
    "hero.greeting": "Tôi là Vũ Tuấn Cường.",
    "hero.role": "Tôi là một người đam mê công nghệ.",

    // Nested content with pattern: [section].[card].[property]
    "about.card1.title": "---",
    "about.card1.content": "Vietnamese content...",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.greeting": "I'm Vu Tuan Cuong.",
    "hero.role": "I'm a tech enthusiast.",

    "about.card1.title": "WHO I AM",
    "about.card1.content": "English content...",
  },
} as const;
```

## Key Naming Convention

### Standard Pattern

```
[section].[element]                    # hero.greeting
[section].[subsection].[element]       # about.card1.title
[section].[element].[property]         # about.card1.content
```

### Examples by Section

| Section    | Key Pattern               | Example                      |
| ---------- | ------------------------- | ---------------------------- |
| Navigation | `nav.[item]`              | `nav.home`, `nav.about`      |
| Hero       | `hero.[element]`          | `hero.greeting`, `hero.role` |
| About      | `about.[card].[property]` | `about.card1.title`          |
| Spacer     | `spacer.[element]`        | `spacer.scroll`              |
| Footer     | `footer.[element]`        | `footer.copyright`           |

## Usage in Components

### React Components

```tsx
import type { Locale } from "@i18n/ui";
import { useTranslations } from "@i18n/utils";

interface ComponentProps {
  lang: Locale;
}

export default function Component({ lang }: ComponentProps) {
  const t = useTranslations(lang);

  return (
    <div>
      <h1>{t("hero.greeting")}</h1>
      <p>{t("hero.role")}</p>
    </div>
  );
}
```

### Astro Components

```astro
---
import { getLangFromUrl, useTranslations } from "@i18n/utils";

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<div>
    <h1>{t('hero.greeting')}</h1>
</div>
```

## Utility Functions

### `getLangFromUrl(url: URL)`

Extracts locale from URL pathname.

```typescript
// URL: /en/about → returns 'en'
// URL: /about → returns 'vi' (default)

import { getLangFromUrl } from "@i18n/utils";
const lang = getLangFromUrl(Astro.url);
```

### `useTranslations(lang)`

Returns a `t()` function to get translation strings.

```typescript
import { useTranslations } from "@i18n/utils";

const t = useTranslations("vi");
t("nav.home"); // → "Trang chủ"
```

### `getRoute(lang, path)`

Creates correct URL based on locale.

```typescript
import { getRoute } from "@i18n/utils";

getRoute("vi", "/about"); // → "/about"
getRoute("en", "/about"); // → "/en/about"
getRoute("vi", "/"); // → "/"
getRoute("en", "/"); // → "/en/"
```

## Routing Structure

### File-based Routing

```
src/pages/
├── index.astro              # Redirect to /en/
├── vi/
│   └── index.astro          # Vietnamese home (/)
└── en/
    └── index.astro          # English home (/en/)
```

### Astro Config

```javascript
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: "vi",
    locales: ["vi", "en"],
    routing: {
      prefixDefaultLocale: false, // vi has no prefix, en has /en/
    },
  },
});
```

## Adding New Translations

### Step 1: Add keys to `ui.ts`

```typescript
// src/i18n/ui.ts
export const ui = {
  vi: {
    // ... existing keys
    "newSection.title": "Tiêu đề mới",
    "newSection.description": "Mô tả bằng tiếng Việt",
  },
  en: {
    // ... existing keys
    "newSection.title": "New Title",
    "newSection.description": "Description in English",
  },
} as const;
```

### Step 2: Use in Component

```tsx
const t = useTranslations(lang);

<h1>{t('newSection.title')}</h1>
<p>{t('newSection.description')}</p>
```

## Type Safety

### Locale Interface

```typescript
export type Locale = "vi" | "en";
```

### Props Pattern

```typescript
interface ComponentProps {
  lang: Locale; // REQUIRED for components with i18n
}
```

## Code Rules

### MUST DO ✅

1. **Always pass `lang` prop** to components with text
2. **Key naming** following pattern `section.element`
3. **Add both languages** when creating new keys (vi and en)
4. **Use `Locale` type** for lang props
5. **Fallback** - `ui.ts` automatically falls back to `defaultLang`

### MUST NOT DO ❌

1. **Hard-coded text** in components
2. **Missing translation** - must have both vi and en
3. **Using meaningless numbers** in keys
4. **Deep nested keys** > 3 levels

## i18n Checklist

- [ ] Add new keys to `ui.ts` (both vi and en)
- [ ] Import `Locale` type and `useTranslations`
- [ ] Pass `lang` prop to component
- [ ] Use `t('key')` for all text
- [ ] Test with both languages
- [ ] Verify URL routing works correctly
