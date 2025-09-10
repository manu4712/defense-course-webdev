# CSS Introduction

## What is CSS?
- **CSS = Cascading Style Sheets**
- HTML handles **structure & meaning**, CSS handles **presentation & style**.
- Inline styles exist in HTML, but are messy for large projects.
- Ways to apply CSS:
  1. **Inline** → `style=""` inside element.  
  2. **Internal** → `<style>` tag inside `<head>`.  
  3. **External** → separate `.css` file linked via `<link>` (best for reusability).

---

## Selectors
- **Tag selector** → `h1 { }`
- **Class selector** → `.classname { }` → for groups of elements
- **ID selector** → `#idname { }` → for unique elements
- **Grouping selector** → `h1, p, .note { }`

---

## Colors
- **Named colors** → ~140 names (limited)
- **RGB / RGBA** → `rgb(0–255, 0–255, 0–255)` + alpha (0–1 transparency)
- **Hexadecimal** → `#rrggbb` (0–f values)
- **HSL / HSLA** → Hue (color), Saturation (intensity), Lightness (brightness), Alpha (transparency)

---

## Fonts
- **font-family** → choose typeface (e.g., Arial, "Times New Roman")
- **font-size** → units:
  - `px` → pixel (device-dependent; resolution = width × height, each pixel stores RGB values ~3 bytes)
  - `em` → relative to parent font size (e.g., `2em` = 2 × parent size)
  - `rem` → relative to root `<html>` font size (default ~16px in most browsers)
  - `vw` / `vh` → % of viewport width/height
  - `%` → relative to parent size
- **font-weight** → values from 100 (thin) → 900 (bold)
- **font-style** → normal, italic, oblique
- **Shorthand** → `font: style weight size family;` (size + family required)

---
