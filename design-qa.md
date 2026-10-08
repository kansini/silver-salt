# Gallery landing page — Design QA

Final result: passed.

## Scope
Redesign the existing Vue landing page into a photography and video portfolio inspired by https://huyml.co/, keeping Silver Salt branding, App Store download, Chinese/English, and light/dark preferences. This is an adapted portfolio composition, not a pixel-identical clone.

## Evidence
Evidence directory: /Users/ssflood/Documents/works/personal/silverSalt/silver_salt/promotion_output/gallery-qa/
- reference-desktop.jpg: live reference gallery, 1280 × 720.
- implementation-desktop.jpg: final first-work gallery, 1280 × 720.
- comparison.jpg: source and implementation side by side at identical viewport dimensions.
- implementation-mobile.jpg: responsive gallery, 390 × 844.
- implementation-download.jpg: final download region, 1280 × 720.
Browser screenshots were normalized to viewport pixels. The source capture shows its fifth project, while the implementation capture shows its first work; composition rather than identical content is compared.

## Five fidelity surfaces
1. Layout: fixed masthead, left metadata, central tilted media stream, right work details and index, and large lower-left counter match the reference's portfolio structure. Mobile uses a single media column with compact controls.
2. Typography: deliberately retains Silver Salt's Chinese display face and Latin branding. Text hierarchy, small metadata labels, generous spacing, and large counter were reviewed in full desktop and mobile captures.
3. Color and styling: warm gray paper, restrained rules and olive accent preserve the app's identity. Dark mode uses matching semantic colors and was visually checked.
4. Media: all 21 original photographs and 7 original videos are represented. Photos use contain sizing, preserving the complete artwork. WebP previews, video posters and fast-start MP4 derivatives keep browsing lightweight; originals remain available.
5. Interaction and motion: GSAP scroll progress drives the tilted stream and synchronized details/index. Filters, direct work selection, previous/next navigation, native fullscreen dialog, keyboard navigation and video controls were checked. Reduced-motion handling is implemented and reviewed in code; system preference emulation was not performed.

## Findings resolved
- Dialog focus restoration previously scrolled the clipped stage internally. Replaced overflow:hidden with overflow:clip and preserved the document scroll position. Actual coordinate click/open/close verification returned document scrollY=0 and stage scrollTop=0.
- The original download region was shorter than the desktop viewport and exposed the gallery counter above it. Set a viewport minimum height and bottom-aligned footer. Final capture shows downloadTop approximately 0 and a clean full-screen download region.
- Mobile filter targets were expanded, and previous/next controls received a paper backing to remain legible over nearby work previews.
No unresolved P0, P1 or P2 findings remain within the requested scope.

## Verification
- vue-tsc -b and vite build passed after the final stylesheet change.
- Verified all 63 manifest media paths exist.
- All/photo/video filters report 28/21/7 works.
- Work dropdown, full-size photo, video playback, ArrowRight navigation and Escape close checked.
- Active gallery video reached readyState 4, played muted, and had no media error.
- Desktop 1280 × 720 and mobile 390 × 844 checked without horizontal overflow.
- Chinese/English and light/dark controls checked; stored preferences survive reload.
- Captured browser warning/error log was empty.

## Material refresh — 2026-10-08
Current collection supersedes the initial 28-work counts above: 30 photos and 10 videos, 40 works total. Added 18 originals and removed 6 originals from the index. Rebuilt 50 WebP/MP4 preview files (16.02 MiB), validated all 90 manifest references and complete original-file coverage. Native source files were not altered. New photo IMG_1288 loads correctly; new video 0C86E37A plays muted with readyState 4 and no media error. Updated all/video filter counts are 40/10. Browser warning/error logs empty. Production TypeScript/Vite build passed. Repeated refresh produces an identical manifest and reuses unchanged preview files.

Refresh script: scripts/process-gallery.py, invoked with npm run gallery:refresh. Captions: scripts/gallery-captions.json. Content-hashed preview URLs avoid stale media after same-name replacements.

Updated screenshot: /Users/ssflood/Documents/works/personal/silverSalt/silver_salt/promotion_output/gallery-updated.jpg
Final material refresh result: passed.

## Fullscreen transition — 2026-10-08
Added GSAP photo entrance (0.55s) from the painted thumbnail bounds, and return (0.42s) on close. Background and controls fade independently. Thumbnail stays hidden while the viewer is open and is restored on exit. Original photos decode in the background while the preview remains visible. Fullscreen navigation to another work uses a fade/scale exit. Reduced-motion preferences bypass transitions; in-flight timelines are cleaned on close and unmount.

Production validation: opening, early Escape exit, reopening after exit, original photo loading, thumbnail restoration and scrollY=0 passed. Keyed surface/content containers preserve one background and one footer across repeated open/close cycles. Photo/video arrow navigation preserves video controls and clears old animation styles. TypeScript/Vite build passed.
Evidence: /Users/ssflood/Documents/works/personal/silverSalt/silver_salt/promotion_output/viewer-transition.png
Final fullscreen transition result: passed.
