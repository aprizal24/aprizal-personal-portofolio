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
 * Experiments / playground — small studies that don't need a full case study.
 * One Markdown file per experiment in src/content/experiments/ (files starting
 * with "_" are ignored). Images go in public/images/experiments/{slug}/.
 * Entries are drafts by default; set `draft: false` to publish, and switch
 * `features.experiments` in src/data/site.ts on with the first real entry.
 */
const experiments = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/experiments' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum([
      'UI concept',
      'Visual experiment',
      'Typography',
      'Poster',
      'Redesign',
      'Dashboard',
      'Motion',
      'Interface study',
    ]),
    year: z.number(),
    summary: z.string().optional(),
    image: z.string(),
    imageAlt: z.string(),
    imageWidth: z.number().optional(),
    imageHeight: z.number().optional(),
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string(), width: z.number().optional(), height: z.number().optional() }))
      .optional(),
    link: z.string().url().optional(), // e.g. a Dribbble/Behance post
    order: z.number().default(0),
    draft: z.boolean().default(true),
  }),
});

export const collections = { 'case-studies': caseStudies, experiments };
