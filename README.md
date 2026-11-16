# Stanislav — Minimal Editorial Portfolio

A responsive, image-led portfolio with **five selected projects** and separate detailed pages.

## Setup

The repository originally contained 52 numbered image/video files but no project metadata or code.

1. Edit the five entries in the `PROJECTS` array at the top of `app.js`.
2. Replace the provisional titles (`Archive I` through `Archive V`), descriptions, years and credits with real project information.
3. Assign each project's `media` list and `cover` to the correct existing images/videos. The provisional grouping is based on filenames, **not confirmed project associations**.
4. Edit the About copy and Instagram link as needed.

## Routes

- Homepage: `#/`
- Projects: `#/project/01` through `#/project/05`
- About: `#/about`

Routes work as direct links and with browser back/forward.

## Hosting

This site has no dependencies or build step. Enable GitHub Pages under **Settings → Pages → Deploy from a branch → main / root** once the pull request is merged, or use any static site host.

## Design

Minimal editorial typography, off-white background, photographic previews on hover, mobile adaptation, image gallery and video playback. Lazy-loading, keyboard-accessible links and reduced-motion support are included.
