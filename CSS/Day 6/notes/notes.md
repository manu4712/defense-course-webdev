# Lecture 06: Media Queries, Shadows and Overflow

## Media Queries

### The First Principle: One Size Does Not Fit All

Modern web design faces a fundamental challenge: websites are viewed on an incredible variety of screens - from 27-inch desktop monitors to 6-inch phone screens. A design optimized for desktop is fundamentally unusable on mobile.

### The Core Problem

**How do we create a single website that adapts its layout for different screen sizes?**

- **Mobile (narrow)**: Simple, single-column layout
- **Tablet (medium)**: Two-column layout  
- **Desktop (wide)**: Three-column layout

We need CSS "if-then" statements to apply different styles based on device properties, especially viewport width.

### The Solution: Media Queries

The `@media` rule is CSS's native conditional statement.

**Syntax:** `@media media-type and (media-feature)`

- `@media`: The "if" statement
- `media-type`: Device type (usually `screen`)
- `(media-feature)`: The condition to check

### Key Media Features

#### 1. max-width (Desktop-First Approach)

**Question it asks:** "Is the browser window this width or smaller?"

**Logic:** Sets an upper bound - styles apply from 0px up to the specified max-width.

```css
/* Default styles (for desktop) */
.container {
  grid-template-columns: 1fr 1fr 1fr; /* 3 columns */
}

/* Tablet styles */
@media screen and (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr 1fr; /* 2 columns */
  }
}

/* Mobile styles */
@media screen and (max-width: 767px) {
  .container {
    grid-template-columns: 1fr; /* 1 column */
  }
}
```

#### 2. min-width (Mobile-First Approach) ⭐ **Recommended**

**Question it asks:** "Is the browser window this width or wider?"

**Logic:** Sets a lower bound - styles apply from the specified min-width up to infinity.

```css
/* Default styles (for mobile) */
.container {
  grid-template-columns: 1fr; /* 1 column by default */
}

/* Tablet styles AND UP */
@media screen and (min-width: 768px) {
  .container {
    grid-template-columns: 1fr 1fr; /* 2 columns */
  }
}

/* Desktop styles AND UP */
@media screen and (min-width: 1024px) {
  .container {
    grid-template-columns: 1fr 1fr 1fr; /* 3 columns */
  }
}
```

**Why mobile-first is better:** Cleaner, more efficient, and follows progressive enhancement.

#### 3. Combined Form: Targeting Specific Ranges

Use `and` keyword to combine conditions for specific viewport ranges.

**Syntax:** `@media screen and (min-width: [smaller-value]) and (max-width: [larger-value])`

```css
/* Tablet-only styles (768px to 1023px) */
@media screen and (min-width: 768px) and (max-width: 1023px) {
  body {
    background-color: lightgoldenrodyellow;
  }
  .container {
    grid-template-columns: 1fr 1fr;
  }
}
```

---

## Box Shadows

### The First Principle: Light Creates Shadow, Shadow Creates Depth

On 2D screens, we simulate depth using shadows. Real shadows give visual cues about an object's position in 3D space.

### The Problem

How do we create realistic shadows for rectangular HTML elements? Simple borders create outlines, not depth.

### The Solution: box-shadow Property

**Full Syntax:** `box-shadow: [inset] offsetX offsetY blurRadius spreadRadius color;`

### Step-by-Step Shadow Creation

#### Step 1: Position (offsetX and offsetY)

Controls where the shadow appears relative to the element.

- **offsetX**: Positive = right, Negative = left
- **offsetY**: Positive = down, Negative = up

```css
.box {
  box-shadow: 10px 5px black;
  /* Hard shadow - 10px right, 5px down */
}
```

#### Step 2: Blur Radius (The Key to Realism)

Makes shadow edges soft and natural.

- `0` = Sharp edges (default)
- Larger values = Softer, more diffuse shadows

```css
.box {
  box-shadow: 10px 5px 15px black;
  /* Now with 15px blur - much more realistic! */
}
```

#### Step 3: Color with Transparency (The Secret to Subtlety)

Real shadows are semi-transparent. Use `rgba()` for realistic shadows.

```css
.box {
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  /* Modern, subtle shadow - light coming from above */
}
```

#### Step 4: Spread Radius (Controlling Size)

Controls shadow size before blur is applied.

- **Positive value**: Expands shadow
- **Negative value**: Contracts shadow

```css
.box {
  box-shadow: 0 0 20px 5px rgba(0, 150, 255, 0.5);
  /* Large, glowing effect */
}
```

#### Step 5: Inset (Inner Shadows)

Creates shadows inside the element instead of behind it.

```css
.input-field:focus {
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  /* Inner shadow for pressed/active state */
}
```

### Multiple Shadows

Combine multiple shadows with commas for realistic depth effects.

```css
.card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12),    /* Close shadow */
              0 1px 2px rgba(0,0,0,0.24);     /* Ambient shadow */
}
```

---

## Overflow

### The First Principle: Fixed Boxes vs. Fluid Content

- **Boxes**: Have fixed dimensions (width/height)
- **Content**: Is fluid and unpredictable in size

### The Core Problem

**What happens when content is bigger than its container?**

Example: 200px tall box with 400px of content

### The Solution: overflow Property

Controls how browsers handle overflowing content.

**Analogy: An Overfilled Cup of Water**
- Box = Cup with fixed size
- Content = Water being poured
- Overflow = More water than cup can hold

### The Four overflow Values

#### 1. `overflow: visible` (Default)

**What it does:** Content spills out of box boundaries

**Analogy:** Water overflows and spills all over the table

**When used:** This is the default - browser prioritizes showing all content

```css
.box {
  height: 100px;
  overflow: visible; /* Content will spill out */
}
```

#### 2. `overflow: hidden`

**What it does:** Clips content at box boundaries - overflowing content becomes invisible

**Analogy:** Put a flat lid on the overflowing cup

**When to use:**
- Enforce strict design boundaries
- Create masking effects
- Contain absolutely positioned child elements

```css
.box {
  height: 100px;
  overflow: hidden; /* Extra content is cut off */
}
```

#### 3. `overflow: scroll`

**What it does:** Adds scrollbars (both horizontal and vertical) always, whether needed or not

**Analogy:** Cup in a holder with scroll wheels that are always there

```css
.box {
  height: 100px;
  overflow: scroll; /* Always shows scrollbars */
}
```

#### 4. `overflow: auto` ⭐ **Most Common Choice**

**What it does:** Smart scrollbars - only appear when actually needed

**Analogy:** Smart holder that only shows scroll wheels when cup is actually overflowing

**When to use:** 95% of the time when you want scrollable areas (chat windows, sidebars, code blocks)

```css
.box {
  height: 100px;
  overflow: auto; /* Scrollbars appear only if needed */
}
```

### Controlling Individual Axes

Control horizontal and vertical overflow separately:

```css
.gallery {
  overflow-x: scroll;  /* Horizontal scrollbar */
  overflow-y: hidden;  /* No vertical scrolling */
}
```

---

## Quick Reference

### Common Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

### Modern Shadow Recipe
```css
.card {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
```

### Best Practices
- Use **mobile-first** approach with `min-width`
- Use `overflow: auto` for most scrollable containers
- Keep shadows subtle with low opacity (`rgba(0,0,0,0.1)`)
- Test responsive designs on real devices