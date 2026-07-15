# Hero video

**The final hero video has not been supplied yet.** The hero currently renders
its poster image only — `public/images/hero/poster.png` — which is exactly what
every viewer sees when the video is missing, blocked or unsupported. Nothing is
broken while this folder is empty.

## Adding the final video

1. Drop the encoded files in this folder:
   - `hero.webm` (VP9 or AV1)
   - `hero.mp4` (H.264, for Safari and older browsers)
2. Replace `public/images/hero/poster.png` with a real still **from the video's
   first frame**, at 1920×1080. Using the actual first frame is what makes the
   fade from poster to video invisible.
3. Register the sources in `src/components/sections/Hero.tsx` — the `sources`
   array passed to `<HeroVideo />`. It is empty today; that is the only edit
   needed.

```tsx
sources={[
  { src: "/video/hero.webm", type: "video/webm" },
  { src: "/video/hero.mp4", type: "video/mp4" },
]}
```

## Encoding requirements

The hero video is decoration, not content, so it must never cost the guest a
slow first paint.

- **No audio track.** It is muted anyway; the track is wasted bytes. Strip it.
- **Target under ~2.5 MB**, 8–12 seconds, seamlessly looping.
- **1920×1080, ~24–30 fps.**
- Keep the bitrate modest — this plays behind a dark scrim and heavy text.
- Put the moov atom first in the MP4 so it can start without the full file.

```bash
# Strip audio, compress, loop-friendly, faststart
ffmpeg -i source.mov -an -vf "scale=1920:-2,fps=25" \
  -c:v libx264 -crf 26 -preset slow -profile:v high -movflags +faststart \
  hero.mp4

ffmpeg -i source.mov -an -vf "scale=1920:-2,fps=25" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 \
  hero.webm

# First frame as the poster
ffmpeg -i hero.mp4 -vframes 1 -q:v 2 poster.png
```

## What the component already handles

`src/components/sections/HeroVideo.tsx` covers all of this — no extra work is
needed when the file lands:

- `autoPlay`, `muted`, `loop`, `playsInline`, `preload="metadata"`
- Poster painted first with `priority`; video fades in only once it plays
- Rejected autoplay, decode errors and missing files fall back to the poster
- `prefers-reduced-motion: reduce` skips the video entirely
- No controls, no audio, hidden from assistive technology
