import { defineCollection, z } from 'astro:content';

// Schema cho Tech Stack Collection (Markdown với frontmatter)
const techStackCollection = defineCollection({
  type: 'content', // Markdown files
  schema: z.object({
    id: z.string(), // "01", "02", "03"
    order: z.number(), // Thứ tự hiển thị
    category: z.object({
      vi: z.string(),
      en: z.string(),
    }),
    items: z.array(
      z.object({
        name: z.string(),
        icon: z.string().optional(), // Icon class hoặc SVG path
        level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
        url: z.string().url().optional(), // Link đến docs
      })
    ),
  }),
});

// Schema cho Project Collection
const projectsCollection = defineCollection({
  type: 'data', // JSON/YAML files
  schema: z.object({
    sectionTitle: z.string(),
    items: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnail: z.string().optional(),
        images: z.array(z.string()).optional(),
        category: z.enum(['personal', 'work', 'all']).default('personal'),
        tags: z.array(z.string()).optional(),
        role: z.string().optional(),
        duration: z.string().optional(),
        teamSize: z.string().optional(),
        goals: z.string().optional(),
        features: z.array(z.string()).optional(),
        links: z.object({
          github: z.string().url().optional(),
          demo: z.string().url().optional(),
        }).optional(),
        year: z.string().optional(),
      })
    ),
  }),
});

// Schema cho Experience Collection
const experienceCollection = defineCollection({
  type: 'data', // JSON/YAML files
  schema: z.object({
    title: z.string(),
    listHeader: z.object({
        period: z.string(),
        organization: z.string(),
        roleLocation: z.string(),
    }),
    items: z.array(
      z.object({
        period: z.string(),
        company: z.string(),
        role: z.string(),
        location: z.string(),
      })
    ),
    cta: z.object({
        text: z.string(),
        url: z.string().optional(),
    })
  }),
});



// Schema cho About Collection
const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    quote: z.string(),
  }),
});

export const collections = {
  'tech-stack': techStackCollection,
  'experience': experienceCollection,
  'about': aboutCollection,
  'projects': projectsCollection,
};
