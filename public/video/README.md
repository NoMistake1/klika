# Hero video

The production hero loops are in place.

| File | Role |
| --- | --- |
| `video-loop-desktop-optimized.mp4` | **Served** on viewports ≥ 768px |
| `video-loop-mobile-optimized.mp4` | **Served** on viewports < 768px |
| `video-loop-desktop.mp4` | Backup master — not referenced by any code |
| `video-loop-mobile.mp4` | Backup master — not referenced by any code |

Selection happens in `src/components/sections/HeroVideo.tsx` via a viewport
media query, so a phone never downloads the desktop file (or vice versa), and
only the chosen `<source>` is loaded — `preload="metadata"` keeps first paint
independent of video bytes.

Posters are `public/images/hero/fallback-desktop.webp` (landscape) and
`fallback-mobile.webp` (portrait), art-directed through a `<picture>` element.
The poster is always painted first; the video fades in over it once it is
actually playing, and every failure mode (blocked autoplay, reduced motion,
data saver, missing file) simply leaves the poster in place.

To swap the footage: replace the two `*-optimized.mp4` files (and ideally the
matching poster stills) under the same names — no code change needed. Keep
them muted-friendly (no audio track), seamlessly looping, and modest in
bitrate; they play behind a dark scrim and heavy text.
