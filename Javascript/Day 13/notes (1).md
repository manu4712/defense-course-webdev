# Lecture 13: Introduction to the DOM (Document Object Model) – Easy, Practical Notes

## The Core Question

**How do HTML and JavaScript communicate?**

- **HTML:** Static markup language (just text with tags)
- **JavaScript:** Programming language (works with objects, functions, variables)
- **They speak different "languages"!**

### Real-World Analogy

- **HTML:** Blueprint of a house (static document)
- **JavaScript:** Construction crew (modifies the house)
- **DOM:** The actual, built house — the bridge between HTML and JavaScript

**Key Point:**  
The DOM lets JavaScript understand and manipulate HTML — it's the essential connector!

---

## PART 1: What is the DOM?

### DOM — Simple Definition

**"The DOM (Document Object Model) is a tree-like representation of your HTML that JavaScript can understand and modify."**

#### Visualizing the DOM Tree

HTML:

```html
<html>
  <head>
    <title>My Site</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>Hello there!</p>
  </body>
</html>
```

The DOM Tree (in the browser):

```
document
└── html
    ├── head
    │   └── title
    │       └── "My Site"
    └── body
        ├── h1
        │   └── "Welcome"
        └── p
            └── "Hello there!"
```

---

## Key DOM Concepts

### 1. Everything is a Node

- **Element Nodes:** Represent HTML tags like `<div>`, `<p>`, `<h1>`
- **Text Nodes:** Represent the actual text inside tags
- **Document Node:** The root; represents the whole document

### 2. HTML Elements Become JavaScript Objects

Example HTML:

```html
<h1 id="title">Hello</h1>
```

How JavaScript "sees" it:

```javascript
{
  tagName: "H1",
  id: "title",
  textContent: "Hello",
  style: { color: "", fontSize: "" },
  parentElement: body,
  children: [],
  // ... and more properties/methods
}
```

**Key Point:**  
*Every HTML tag becomes a JavaScript object with properties and methods!*

### 3. The `window` and `document` Objects

- **window:** Browser environment (global object; has alert, setTimeout, localStorage, etc.)
- **document:** Represents your HTML page as a DOM tree

Hierarchy:

```
Window (global object)
└── document (the DOM)
    └── documentElement (<html>)
        ├── head
        └── body
            └── (all your elements)
```

---

## PART 2: Selecting DOM Elements in JavaScript

### Sample HTML for Reference

```html
<div id="main-container" class="container">
  <h1 class="title">Main Title</h1>
  <p>This is the first paragraph.</p>
  <p class="content">This is the second paragraph with a class.</p>

  <ul id="item-list">
    <li class="item">Item 1</li>
    <li class="item special">Item 2</li>
    <li class="item">Item 3</li>
  </ul>

  <form name="login-form">
    <input type="text" name="username">
  </form>
</div>

<div class="container footer">
  <p>Footer content.</p>
</div>
```

### 1. Classic, Specific Selection Methods

#### A. `document.getElementById('id')`

- **Purpose:** Gets the element with a unique ID
- **Usage:**
  ```javascript
  const mainContainer = document.getElementById('main-container');
  mainContainer.style.border = '2px solid red';
  ```

#### B. `document.getElementsByTagName('tagName')`

- Gets all elements with a specific tag (like `p`, `li`)
- Returns a "live" HTMLCollection — auto-updating if DOM changes
- **Usage:**
  ```javascript
  const allParagraphs = document.getElementsByTagName('p');
  allParagraphs[0].style.fontStyle = 'italic';
  ```

#### C. `document.getElementsByClassName('className')`

- Gets all elements with the specified class name
- Also returns a "live" HTMLCollection
- **Usage:**
  ```javascript
  const allItems = document.getElementsByClassName('item');
  allItems[0].style.color = 'green';
  ```

---

### 2. Modern, Powerful Query Selection Methods

#### A. `document.querySelector('cssSelector')`

- Gets the first element that matches a CSS selector
- **Usage:**
  ```javascript
  const specialItem = document.querySelector('.item.special');
  specialItem.style.color = 'orange';
  ```

#### B. `document.querySelectorAll('cssSelector')`

- Gets *all* elements matching a selector (returns a static NodeList, not live)
- **Usage:**
  ```javascript
  const listItems = document.querySelectorAll('#item-list li');
  listItems.forEach(item => {
    item.style.fontWeight = 'bold';
  });
  ```

---

### 3. Other Methods

#### `document.getElementsByName('name')`

- Selects elements by their `name` attribute (mostly forms)
- **Usage:**
  ```javascript
  const usernameInput = document.getElementsByName('username');
  ```

---

## Traversing the DOM (Moving Around the Tree)

Once you select an element, you can navigate relatives.

```javascript
const itemList = document.getElementById('item-list');

const parentContainer = itemList.parentElement;
const listChildren = itemList.children;
const firstLi = itemList.firstElementChild;
const lastLi = itemList.lastElementChild;

const specialLi = document.querySelector('.special');
const nextItem = specialLi.nextElementSibling;
const prevItem = specialLi.previousElementSibling;
```

---

## Choosing the Best Selection Method

| Goal                           | Best Method              | Why?                                                |
| ------------------------------ | ------------------------ | --------------------------------------------------- |
| Get a single, unique element   | getElementById()         | Fastest, direct                                     |
| Get first element match        | querySelector()          | Flexible, familiar CSS syntax                       |
| Get all elements, complex rule | querySelectorAll()       | Flexible, easy to loop with .forEach()              |
| Get all by tag/class, live     | getElementsByTagName(), getElementsByClassName() | "Live" auto-updating collections                |

---

## PART 3: Reading and Modifying DOM Elements (Properties & Methods)

### 1. Manipulating Content — `textContent`, `innerHTML`, `innerText`

#### A. `.textContent` — The Safest Way

- Returns/sets the *raw text* inside an element (ignores HTML)
- **Always treats content as text (prevents security risks)**
- **Read:**
  ```javascript
  const desc = document.getElementById('description');
  console.log(desc.textContent);  // No HTML tags, just text
  ```
- **Write:**
  ```javascript
  desc.textContent = "Click <a href='#'>here</a>!"; // Sets literal text
  ```

#### B. `.innerHTML` — Powerful but Risky

- Returns/sets *everything inside* an element (including HTML markup)
- **Can create new HTML elements**
- **Potential XSS security risk if content is user-generated!**
- **Read:**
  ```javascript
  console.log(desc.innerHTML);  // Includes <strong> and other tags
  ```
- **Write:**
  ```javascript
  desc.innerHTML = "Updated: <strong>New Features!</strong>";
  ```

#### C. `.innerText` — "Smart" but Tricky

- Returns/sets text *as visible to the user* (style-aware; ignores hidden elements, obeys CSS)
- **Usually not needed—prefer `.textContent`**
- **Read:**
  ```javascript
  console.log(productName.innerText);  // Only visible text
  ```

#### Table: Content Properties Summary

| Property      | Includes HTML? | CSS Aware? | Speed    | Security (on Write) |
| ------------- | -------------- | ---------- | -------- | ------------------- |
| textContent   | No             | No         | Fastest  | Safe                |
| innerHTML     | Yes            | No         | Slower   | Dangerous           |
| innerText     | No             | Yes        | Slowest  | Safe                |

---

### 2. Manipulating Attributes (`id`, `className`, `classList`, `getAttribute`, `setAttribute`)

#### A. `.id` and `.className`

- *Directly reads/sets the `id` or `class` attributes*
- **Note:** `.className` *overwrites all classes*, use `.classList` for smarter control

```javascript
const card = document.getElementById('product-card');
console.log(card.id);         // "product-card"
card.id = 'new-card-id';      // Changes ID
card.className = "card-dark"; // OVERWRITES all classes!
```

#### B. `.classList`

- *Modern way*, best practice for working with classes
  - `.add('className')`
  - `.remove('className')`
  - `.toggle('className')`
  - `.contains('className')`
- **Usage:**
  ```javascript
  card.classList.add('in-cart');
  card.classList.remove('featured');
  card.classList.toggle('selected');

  if (card.classList.contains('in-cart')) {
    console.log("This item is in the cart.");
  }
  ```

#### C. `.getAttribute()` / `.setAttribute()`

- *Generic, works with any attribute (even custom ones)*
- **Usage:**
  ```javascript
  card.setAttribute('data-product-id', 'xyz-123');
  const productId = card.getAttribute('data-product-id');
  card.removeAttribute('class');
  ```

---

### 3. Changing Styles — The `.style` Property

- Represents the inline `style="..."` attribute
- **Property names are camelCased!**
  - `background-color` → `backgroundColor`
- **Usage:**
  ```javascript
  title.style.color = 'blue';
  title.style.backgroundColor = '#f0f0f0';
  title.style.fontSize = '24px';
  ```

- **Only sees inline styles.**  
  To access styles from CSS files, use:  
  `window.getComputedStyle(element)`

**Best Practice:**  
Prefer using `.classList` to apply CSS classes for styling. Keeps logic and styles separate.

---

## Prerequisite: How Do You Actually Change Content in Practice?

Given starting HTML:

```html
<h1>Hello World</h1>
<p>This is a paragraph.</p>
```

And JavaScript (`script.js`):

```javascript
// Change "Hello World" to "Goodbye World"
document.querySelector('h1').textContent = "Goodbye World";

// Make the paragraph red
document.querySelector('p').style.color = "red";

// Add a new button
const button = document.createElement('button');
button.textContent = "Click Me!";
document.body.appendChild(button);
```

---

## Summary

**The DOM:**
- Converts HTML into a "house" JavaScript can walk through
- Lets you select, read, modify, and style everything on your page
- You use selection methods to grab elements, then modify properties, attributes, or styles

**Golden Rules:**
- Use `getElementById` for unique IDs (fastest)
- Use `querySelector` and `querySelectorAll` for CSS-like flexibility (default choice!)
- Use `.classList` for adding/removing/toggling CSS classes
- Use `.textContent` for safely reading/writing text
- Use `.innerHTML` ONLY when you trust the content and need rich HTML
- **Keep styles in CSS, use classes — don't clutter logic with style changes**

**DOM knowledge unlocks interactive, dynamic web pages with JavaScript!**
