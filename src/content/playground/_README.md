# Playground

Files starting with `_` are ignored by the collection.

To add a Playground item:

1. Put the images in `public/images/playground/{slug}/` (WebP, same width
   for every image in a set so they stack without seams in the preview).
2. Create `src/content/playground/{slug}.md`:

```md
---
title: "Item title"
category: "UI/UX Design"
description: "One line about the study."   # optional
year: 2026                                 # optional
thumbnail:
  src: "/images/playground/{slug}/01.webp"
  alt: "What the thumbnail shows"
images:                                    # shown top to bottom in the preview
  - src: "/images/playground/{slug}/01.webp"
    alt: "What this image shows"
order: 2                                   # position in the gallery
draft: false                               # true hides it
---
```

The gallery and the preview modal pick it up automatically.
