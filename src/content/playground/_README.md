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
dateAdded: 2026-10-23                      # the day you add it; newest is shown first
order: 1                                   # only breaks ties between items added the same day (higher = newer)
draft: false                               # true hides it
---
```

Optional extras (see `sneakpeek.md`):

```md
subtitle: "Short subtitle"                 # shown before the category
tools: ["Figma", "HTML"]                   # listed under the description
thumbnail:
  src: "/images/playground/{slug}/card-poster.webp"   # poster of the loop
  alt: "…"
  video: "/images/playground/{slug}/card.mp4"         # muted loop on the card, 1080:964 ratio
video:                                     # shown above the images in the preview
  src: "/images/playground/{slug}/showcase.mp4"
  poster: "/images/playground/{slug}/poster.webp"
  label: "What the video shows"
```

Videos: H.264 MP4, no audio track, `-movflags +faststart`.

The gallery and the preview modal pick it up automatically. Set `dateAdded`
to the day you add the item and it appears first; nothing else needs
reordering.
