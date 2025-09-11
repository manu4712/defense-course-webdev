# Day 8 – CSS Box Model

## CSS Box Model
The CSS box model describes how every element is structured with four layers: **Content**, **Padding**, **Border**, and **Margin**.  
- Content: actual text or media inside the box  
- Padding: space between content and border, inside the element  
- Border: line surrounding the padding and content  
- Margin: outer space that separates the element from others  

```html
<div class="box-model">Box Model</div>
```

```css
.box-model {
  background: #f3f6ff;
  padding: 16px;             /* inside space */
  border: 4px solid #4b6bfb; /* surrounding line */
  margin: 12px;              /* outside space */
}
```

---

## Block vs Inline Elements
Block elements take the full available width, start on a new line, and allow setting width/height and all box properties.  
Inline elements sit within text flow, only as wide as their content; width/height are ignored, and vertical margin/padding has limited layout effect by default.  

```html
<p>Inline: <span class="inline">span</span> continues on the same line.</p>
<div class="block">Block starts on a new line</div>
```

```css
.inline {
  display: inline;        /* default for span */
  padding: 0 8px;         /* horizontal padding shows */
  margin: 0 8px;          /* horizontal margin affects flow */
  border: 1px solid #999;
  /* width/height are ignored by inline formatting */
}

.block {
  display: block;         /* default for div */
  width: 240px;
  height: 60px;
  padding: 8px;
  border: 2px solid #333;
  margin: 8px 0;
}
```

---

## Inline-Block
inline-block sits inline with text but allows setting width/height, padding, and margins like block-level boxes.  

```html
<span class="pill">Tag</span>
<span class="pill">Badge</span>
```

```css
.pill {
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid #aaa;
  border-radius: 999px;   /* rounded pill */
  width: 100px;           /* works with inline-block */
  text-align: center;
  margin-right: 8px;
}
```

---

## Border Radius
Use border-radius to create rounded corners; values can be uniform, per-corner, or fully circular with 50%.  

```html
<div class="rounded">Rounded corners</div>
<div class="circle"></div>
```

```css
.rounded {
  border: 2px solid #555;
  padding: 12px;
  border-radius: 12px;              /* uniform rounding */
}

.circle {
  width: 80px;
  height: 80px;
  background: #4b6bfb;
  border-radius: 50%;               /* perfect circle */
}
```

---

## Padding, Margin, Border Shorthand
Shorthand helps set multiple sides quickly: padding and margin accept 1–4 values; border accepts width, style, and color in one line.  

```css
.card {
  /* padding: top right bottom left */
  padding: 16px 24px 20px 24px;

  /* margin: vertical horizontal */
  margin: 12px 24px;

  /* border: width style color */
  border: 1px solid #e0e0e0;

  /* per-side overrides */
  border-top: 2px solid #4b6bfb;
}
```

---

## Display Property
- display: block — behaves like a block element in flow layout  
- display: inline — behaves like inline content within line boxes  
- display: inline-block — inline placement with block box sizing capabilities  

```html
<div class="d-block">Block</div>
<span class="d-inline">Inline</span>
<span class="d-inline-block">Inline-Block</span>
```

```css
.d-block { display: block; }
.d-inline { display: inline; }
.d-inline-block {
  display: inline-block;
  width: 140px;
  height: 40px;
  padding: 8px;
  border: 1px dashed #888;
}
```

---

## Box-Sizing
With the default content-box, width/height apply only to content; padding and border increase total size.  
With **border-box**, width/height include content, padding, and border, keeping the element's total size predictable.  

```html
<div class="cb">content-box (grows)</div>
<div class="bb">border-box (fixed)</div>
```

```css
.cb, .bb {
  width: 200px;
  padding: 20px;
  border: 5px solid #4b6bfb;
  background: #eef3ff;
  margin-bottom: 8px;
}
.cb { box-sizing: content-box; }  /* total width = 200 + 40 + 10 = 250px */
.bb { box-sizing: border-box; }   /* total width = 200 including padding+border */
```

---

## Global Border-Box Practice
A common practice is to apply border-box universally for consistent layouts; extending to ::before and ::after covers pseudo-elements too.  

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

---

## Responsiveness
Prefer max-width over fixed width so boxes shrink on small screens but don't exceed a maximum on large screens.  

```html
<img class="responsive" src="photo.jpg" alt="Responsive image" />
<div class="container">Responsive container</div>
```

```css
.responsive {
  max-width: 100%;
  height: auto;                 /* maintain aspect ratio */
  display: block;
}

.container {
  max-width: 640px;
  padding: 16px;
  margin: 0 auto;               /* center within parent */
  background: #fafafa;
  border: 1px solid #e5e7eb;
}
```