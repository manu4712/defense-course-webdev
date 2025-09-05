# Defence Course Notes

## File Paths

There are two main types of file paths in HTML:

### Relative Path
- Directions from your current working folder.  
- Examples:
  ```html
  <img src="./images/logo.png" />    <!-- current folder -->
  <img src="../assets/photo.jpg" />  <!-- move one level up -->
  ```
- **Good practice:** use `./` explicitly to make paths clear.  
- Relative paths can only access files **inside the project folder**, not outside.

---

### Absolute Path
- Full address from the root of the system or web server.
- Examples:
  ```html
  <img src="https://example.com/images/logo.png" />
  ```
- Absolute paths on the **internet** are fine.  
- On **local machines**, browsers block absolute paths for security (to prevent files from reaching sensitive data).  

---

## HTML Boilerplate

- Browsers don’t throw errors if you skip boilerplate, because HTML was designed to be forgiving.  
- But without it, **behavior may differ across browsers**. Boilerplate ensures consistency.

**Example:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
```

**Key Parts:**
- `<!DOCTYPE html>` → Declares **HTML5**.  
- `<html>` → Root element.  
- `<head>` → Metadata (title, encoding, viewport).  
- `<body>` → Visible content.  
- **UTF-8** → Character encoding that supports all languages and emojis (unlike ASCII’s limited 256 characters).

---

## Core HTML Concepts

### `<div>`
A generic container to group elements for styling or layout.

```html
<div class="card">
  <h2>Title</h2>
  <p>Description text...</p>
</div>
```

---

### Attributes

- **class** → Reusable styling across multiple elements.
```html
<p class="highlight">Text with shared style</p>
```

- **id** → Unique identifier for one element.
```html
<p id="unique-text">Only one element with this ID</p>
```

---

### Semantic Tags
More meaningful than generic `<div>`.

- `<header>`, `<main>`, `<footer>`  
- **Benefits:**
  - Improve readability.  
  - Better for accessibility tools.  
  - Helpful for SEO.  

**Example:**
```html
<header>
  <h1>My Website</h1>
</header>

<main>
  <p>Welcome to my site.</p>
</main>

<footer>
  <p>© 2025 Manu</p>
</footer>
```

---

## Key Takeaways
- Use **relative paths** inside your project for safety.  
- Always include the **HTML boilerplate** for consistent behavior.  
- Use **semantic tags** for clarity, accessibility, and SEO.  
- Browsers forgive mistakes, but **good habits make professional code**.  
