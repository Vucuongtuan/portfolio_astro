---
name: content-collection
description: Guide for using Astro Content Collections in the portfolio project. Use this skill when creating schemas, managing content, and querying data from collections.
license: MIT
metadata:
  author: portfolio-team
  version: "1.0.0"
  category: content
  tags: astro, content-collections, zod, markdown
---

# Astro Content Collections Guide

Comprehensive guide for using Content Collections in the portfolio_astro project.

## When to Use This Skill

Activate this skill when:

- Creating new content schemas
- Adding content items (Markdown files)
- Querying and displaying data from collections
- Handling i18n in content

## Content Collections Structure

```
src/content/
├── config.ts           # Schema definitions
├── tech-stack/         # Collection folder
│   ├── frontend.md
│   ├── backend.md
│   └── tools.md
└── [other-collections]/
```

## Schema Definition (`config.ts`)

### Current Example

```typescript
import { defineCollection, z } from "astro:content";

// Schema for Tech Stack Collection
const techStackCollection = defineCollection({
  type: "content", // Markdown files
  schema: z.object({
    id: z.string(),
    order: z.number(),
    category: z.object({
      vi: z.string(),
      en: z.string(),
    }),
    items: z.array(
      z.object({
        name: z.string(),
        icon: z.string().optional(),
        level: z
          .enum(["beginner", "intermediate", "advanced", "expert"])
          .optional(),
        url: z.string().url().optional(),
      })
    ),
  }),
});

// Schema for Projects Collection
const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    publishDate: z.date().optional(),
  }),
});

export const collections = {
  "tech-stack": techStackCollection,
  // 'projects': projectsCollection,
};
```

## Zod Schema Patterns

### Basic Types

```typescript
z.string(); // Required string
z.string().optional(); // Optional string
z.number(); // Required number
z.boolean(); // Required boolean
z.boolean().default(false); // With default value
z.date(); // Date type
```

### Advanced Types

```typescript
// Enum
z.enum(["beginner", "intermediate", "advanced", "expert"]);

// Array
z.array(z.string());
z.array(z.object({ name: z.string() }));

// Object
z.object({
  vi: z.string(),
  en: z.string(),
});

// URL validation
z.string().url();

// Optional with default
z.array(z.string()).optional().default([]);
```

### i18n Pattern in Schema

```typescript
// For fields that need translation
category: z.object({
  vi: z.string(),
  en: z.string(),
});
```

## Content File Structure

### Markdown with Frontmatter

```markdown
---
id: "01"
order: 1
category:
  vi: "Frontend"
  en: "Frontend"
items:
  - name: "React"
    icon: "react"
    level: "advanced"
    url: "https://react.dev"
  - name: "Vue"
    icon: "vue"
    level: "intermediate"
---

# Optional Markdown Content

Additional content here if needed.
```

## Querying Data from Collections

### In Astro Components

```astro
---
import { getCollection, getEntry } from 'astro:content';

// Get all entries
const allTechStack = await getCollection('tech-stack');

// Get a specific entry
const frontend = await getEntry('tech-stack', 'frontend');

// Filter entries
const featuredProjects = await getCollection('tech-stack', ({ data }) => {
  return data.featured === true;
});

// Sort by order
const sortedTech = allTechStack.sort((a, b) => a.data.order - b.data.order);
---

<ul>
  {sortedTech.map((item) => (
    <li>{item.data.category.vi}</li>
  ))}
</ul>
```

### In React Components (via Props)

```astro
---
// Page.astro
import { getCollection } from 'astro:content';
import TechStackClient from '@components/TechStack/TechStackClient';

const techStack = await getCollection('tech-stack');
const sortedData = techStack.sort((a, b) => a.data.order - b.data.order);
---

<TechStackClient data={sortedData} lang="vi" client:load />
```

```tsx
// TechStackClient.tsx
interface TechStackProps {
  data: CollectionEntry<"tech-stack">[];
  lang: Locale;
}

export default function TechStackClient({ data, lang }: TechStackProps) {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.data.category[lang]}</h2>
          <ul>
            {item.data.items.map((tech) => (
              <li key={tech.name}>{tech.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

## Creating a New Collection

### Step 1: Define Schema

```typescript
// src/content/config.ts
const newCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    // ... other fields
  }),
});

export const collections = {
  // ... existing
  "new-collection": newCollection,
};
```

### Step 2: Create Content Folder and Files

```
src/content/new-collection/
├── item-1.md
├── item-2.md
└── item-3.md
```

### Step 3: Query in Page

```astro
---
import { getCollection } from 'astro:content';
const items = await getCollection('new-collection');
---
```

## Type Safety

### Import Collection Types

```typescript
import type { CollectionEntry } from "astro:content";

// Type for one entry
type TechStackEntry = CollectionEntry<"tech-stack">;

// Props with collection data
interface Props {
  data: CollectionEntry<"tech-stack">[];
}
```

### Infer Schema Types

```typescript
import { z } from "astro:content";

const techItemSchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
});

type TechItem = z.infer<typeof techItemSchema>;
```

## Best Practices

### MUST DO ✅

1. **Zod validation** for all schemas
2. **i18n objects** for fields that need translation
3. **Sort by order** when displaying
4. **Type imports** from `astro:content`
5. **Default values** for optional fields

### MUST NOT DO ❌

1. **Hard-coded data** in components
2. **Missing validation** in schemas
3. **Ignore TypeScript** types
4. **Query in React** (only query in Astro, pass via props)

## Content Collection Checklist

- [ ] Define schema in `config.ts`
- [ ] Export in `collections` object
- [ ] Create content folder and files
- [ ] Validate frontmatter matches schema
- [ ] Query data in Astro component
- [ ] Pass data via props to React components
- [ ] Handle i18n for translated fields
