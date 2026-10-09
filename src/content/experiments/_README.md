# Experiments

This folder is intentionally empty. Files starting with `_` are ignored by the collection.

To publish the first experiment:

1. Add the images to `public/images/experiments/{slug}/`.
2. Create `src/content/experiments/{slug}.md`:

```md
---
title: "Experiment title"
kind: "UI concept"        # UI concept · Visual experiment · Typography · Poster · Redesign · Dashboard · Motion · Interface study
year: 2026
summary: "One line about the study."   # optional
image: "/images/experiments/{slug}/main.webp"
imageAlt: "Describe what the image shows"
imageWidth: 1600                       # optional, prevents layout shift
imageHeight: 1200
order: 1
draft: false
---

Optional short write-up.
```

3. In `src/data/site.ts`, set `features.experiments` to `true`. That adds Experiments to the navigation and the sitemap and removes `noindex`.
