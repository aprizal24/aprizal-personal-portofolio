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
    // Editorial template only: true = hero image fills its card edge to edge (no inner padding).
    heroFill: z.boolean().default(false),
    // Editorial template only: true = small portrait device mockup — centred, never enlarged past its source size, height capped (~600px).
    heroDevice: z.boolean().default(false),
    // Page template: 'editorial' = redesigned case-study layout (CaseStudyEditorial.astro);
    // 'legacy' = the original template, kept until each case study is migrated.
    template: z.enum(['legacy', 'editorial']).default('legacy'),
    meta: z.array(z.object({ label: z.string(), value: z.string() })),
    outroTitle: z.string(),
    outroText: z.string().optional(),
  }),
});

/**
 * Playground — explorations shown on /playground/ as a gallery; each opens
 * in a preview modal (no page of its own). One Markdown file per item in
 * src/content/playground/ (files starting with "_" are ignored). Images go
 * in public/images/playground/{slug}/ and are shown in the modal top to
 * bottom, in the order listed.
 */
const playground = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/playground' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),              // e.g. "UI/UX Design"
    description: z.string().optional(),
    year: z.number().optional(),
    thumbnail: z.object({ src: z.string(), alt: z.string() }),
    images: z.array(z.object({ src: z.string(), alt: z.string() })).min(1),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { 'case-studies': caseStudies, playground };
