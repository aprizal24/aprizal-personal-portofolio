import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    role: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    order: z.number(),
    // Fields the existing markup needs beyond the core set above.
    type: z.string(), // "Mobile app" / "Web app" label on the homepage
    summary: z.string(), // homepage blurb (differs from the case-study hero text)
    tagline: z.string(), // "Next case study" card blurb
    heroImage: z.string(),
    heroAlt: z.string(),
    heroLayout: z.enum(['split', 'stacked']),
    meta: z.array(z.object({ label: z.string(), value: z.string() })),
    outroTitle: z.string(),
    outroText: z.string().optional(),
  }),
});

export const collections = { 'case-studies': caseStudies };
