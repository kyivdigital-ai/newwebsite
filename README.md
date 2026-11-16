# Stanislav — Selected Work

Responsive editorial portfolio with three confirmed projects and a separate detail/gallery page for each.

## Current project structure

1. **PDF Magazine** — four images named `project pdf...`
2. **Hatice Schmidt** — two images and one video named `project hatice...`
3. **Ukraine Design Week** — one image named `project ukraine design 3.2.jpg`

All other media labelled `another project` are deliberately not shown until the projects they belong to have been identified. None are deleted.

### Media needing attention

The following videos are only 2 bytes and **cannot play**:
- `project ukraine design week 3.1.mp4`
- `another project 26.mp4`
- `another project35.mp4`

Replace them with real MP4 files, then add their names to the appropriate `media` array in `app.js`.

## Edit projects

The `PROJECTS` array in `app.js` contains the displayed project names, cover photos, gallery media, descriptions and temporary role/year fields. The displayed titles follow the filenames. Roles, dates and descriptions should be reviewed before publication.

## Hosting

No dependencies or build step. The static site works when served from the repository root, for example with GitHub Pages. URLs use hash routing (`#/project/01` etc.) so they can be shared without server-side routing.

The project is in branch `portfolio-editorial-v1`; merge PR #1 into main only after reviewing content.

## Archive

Navigation now includes **ARCHIVE** (`#/archive`): an irregular, responsive gallery of 30 photos and 7 unique videos from the previously unassigned work. Media files are interleaved in a deliberately scattered order.

- Edit `ARCHIVE_MEDIA` at the top of `app.js` to change order or add media later.
- All video controls are overlaid, with muted play in view, optional sound and pause.
- Images load lazily; videos pause outside the viewport, and reduced-motion/save-data preferences disable automatic playback.
- Duplicate video uploads were deduplicated by Git SHA, and 2-byte broken video placeholders excluded.

Project galleries also include newly uploaded PDF Magazine images/video, the renamed Hatice video, and the Ukraine Design Week video.

## Berlin time and weather

The homepage contact section shows the current Berlin local time (CET/CEST automatically, using browser `Intl.DateTimeFormat`) and a weather summary when available.

The weather comes from `api/berlin-weather.mjs`, a Vercel Node Function that proxies the MET Norway Locationforecast API. It identifies the project with a contact email and returns a 3-hour CDN-cached result to avoid excessive upstream requests. MET Norway data may be used commercially with attribution; the page links to the source when it shows a forecast.

On a host without Vercel Functions, or if the upstream service fails, the clock still works but the weather is hidden instead of showing made-up conditions.
