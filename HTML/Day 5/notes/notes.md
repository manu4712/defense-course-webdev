# HTML Media and Multipage Websites - Defense Course Notes

## Summary
- Use the **audio** and **video** elements to embed media with native controls and multiple sources for cross-browser support
- Use the **iframe** element with a proper YouTube "embed" URL and allowfullscreen/fullscreen permissions for YouTube videos
- Build **multipage** sites by linking separate HTML files with anchor tags, using relative paths for local navigation

## Audio Basics

The `<audio>` element embeds sound and can use either a single `src` on `<audio>` or multiple `<source>` children; `controls` shows the default UI.

### Best Practices
- Multiple `<source>` tags with accurate `type` (MIME type) improve compatibility
- Common types are `audio/mpeg` (mp3), `audio/ogg`, and `audio/wav`
- Provide fallback text inside `<audio>` for browsers that don't support the element itself

### Example
```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
```

### Notes and Corrections
- It's fine to use `src` directly on `<audio>` for a single source, but multiple `<source>` elements are preferred for cross-browser support
- The type value should be correct MIME, e.g., `audio/mpeg` for MP3 (not "aduo/mp3")

## Video Basics

The `<video>` element works like `<audio>`: add `controls` and list multiple `<source>` files with correct `type` to handle codec differences.

### Key Features
- Include a short fallback message or a download link inside `<video>` for non-supporting browsers
- Optional attributes include `poster` (thumbnail), `width`/`height`, `autoplay`, `loop`, and `muted` (use carefully)

### Example
```html
<video controls poster="thumb.jpg" width="640">
  <source src="clip.webm" type="video/webm">
  <source src="clip.mp4" type="video/mp4">
  Sorry, your browser doesn't support embedded videos.
</video>
```

### Important Fallback Note
The fallback text appears if the `<video>` element itself isn't supported; it won't show just because all listed sources fail. Consider offering a download link inside.

## Embedding YouTube Videos

### URL Conversion
Convert a watch or short link to an embed URL:
- `https://www.youtube.com/watch?v=VIDEO_ID` → `https://www.youtube.com/embed/VIDEO_ID`
- `https://youtu.be/VIDEO_ID` → `https://www.youtube.com/embed/VIDEO_ID`

### Implementation
Use `<iframe>` with `src` set to the embed URL; enable fullscreen via `allow="fullscreen"` and/or `allowfullscreen`. Modern usage favors the `allow` attribute.

### Example
```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/NGYp1zCBthk"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
  allowfullscreen>
</iframe>
```

### Helpful Parameters
Add query params to the embed URL, e.g., `?start=90` to start at 1:30; use only documented parameters from YouTube's player docs.

## Multipage HTML Navigation

Create multiple HTML files (e.g., `index.html`, `about.html`, `contact.html`) and link them with `<a href="...">` using relative paths.

### Best Practice
Keep consistent structure and use a nav section reused across pages for better UX.

### Example
```html
<nav>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
</nav>
```

## Quick Best Practices

1. **Media Compatibility**: Prefer multiple `<source>` entries with correct `type` for audio/video to maximize compatibility
2. **Fallback Content**: Provide concise fallback text; consider a direct download link when media can't play
3. **YouTube Embeds**: Always switch to the `/embed/VIDEO_ID` URL and include fullscreen permission in `allow`/`allowfullscreen`