# Lecture 14: DOM Manipulation – Comprehensive Notes

## Introduction to DOM Manipulation

Once you select an element in the DOM and store it in a variable, you gain full control over that piece of your webpage. With this power, you can edit content, change element properties, and restructure your entire page. There are **three key categories** of DOM manipulation:

1. **Editing What's Inside (Content & HTML)**
2. **Editing the Tag Itself (Attributes, Classes, and Styles)**
3. **Editing the Page Structure (Creating, Adding, and Removing Elements)**

---

## Part 1: Editing the Content Inside an Element

**Editing the stuff inside an element's opening and closing tags** directly changes what the user sees.

**HTML Example:**
```html
<div id="welcome-box"> Please log in to see your messages. </div>
```

**JavaScript Selection:**
```javascript
const welcomeBox = document.getElementById('welcome-box');
```

### A. `.textContent`: Plain Text, Safe and Secure
- **Purpose:** Gets or sets _only the pure text_ inside an element, ignoring HTML tags.
- **Use Case:** Always prefer `.textContent` for simple text changes to keep things secure.
```javascript
// Read the text
console.log(welcomeBox.textContent); // "Please log in to see your messages."

// Change the text
welcomeBox.textContent = "Welcome back, Alice!";
```
- **Security:** Setting `.textContent` will _display_ any code as plain text, not execute it. This is crucial to avoid XSS attacks!
```javascript
welcomeBox.textContent = "<script>alert('hacked!');</script>";
// Shown as text. Not executed.
```

### B. `.innerHTML`: HTML Content, Powerful but Risky
- **Purpose:** Gets or sets _all the HTML markup_ inside an element.
- **Use Case:** Use **only** with _trusted data_. Never use `.innerHTML` for content from user input.
```javascript
const welcomeMessage = `
  <h2>Welcome back, Alice!</h2>
  <p>You have <strong>5</strong> new messages.</p>
`;
welcomeBox.innerHTML = welcomeMessage;
```
- **Security Risk:** `.innerHTML` can run any HTML or script included in the content. Only use with your own code.

---

## Part 2: Editing the Element's Tag Itself

Now, you can change **attributes**, manage **classes**, and update **inline styles**.

**HTML Example:**
```html
<div id="profile-pic-container" class="card">
  <img src="default-avatar.png" alt="User avatar">
</div>
```

**JavaScript Selection:**
```javascript
const profileContainer = document.getElementById('profile-pic-container');
const profileImage = profileContainer.querySelector('img');
```

### A. Common Attributes (As Element Properties)
- Change directly in JS:
```javascript
profileImage.src = 'images/alice.png';
profileImage.alt = 'A photo of Alice';
profileContainer.id = 'user-123-avatar';
```

### B. CSS Classes: The `.classList` Toolbox
- **Best practice:** Use `.classList` for flexible, readable class logic:
```javascript
profileContainer.classList.add('is-active');    // Adds 'is-active'
profileContainer.classList.remove('card');      // Removes 'card'
profileContainer.classList.toggle('selected');  // Adds/removes with each call
profileContainer.classList.contains('selected'); // Checks for a class (returns true/false)
```
- **CSS:** Keep styles in your CSS file, and toggle classes from JS.

### C. Inline Styles: `.style` Property (CamelCase!)
- Critical rule: Hyphenated CSS properties become camelCase.
```javascript
profileContainer.style.border = '2px solid blue';
profileContainer.style.borderRadius = '50%';
profileContainer.style.width = '150px';
profileContainer.style.height = '150px';
```
- Use only for *dynamic* styles. Use `.classList` for regular styling.

---

## Part 3: Editing the Page Structure: Creating, Adding, Removing Elements

### A. Creating a New Element
```javascript
const newParagraph = document.createElement('p');
newParagraph.textContent = "This is a brand new paragraph created by JavaScript.";
newParagraph.classList.add('info-text');
```

### B. Adding the New Element: Modern and Classic Methods

**HTML Reference:**
```html
<div id="parent-container">
  <p id="first-child">First Paragraph</p>
  <p id="reference-element">I am the reference point.</p>
  <p id="last-child">Last Paragraph</p>
</div>
```

**JavaScript Reference:**
```javascript
const parent = document.getElementById('parent-container');
const referenceElement = document.getElementById('reference-element');
```

#### 1. Add Inside (as Child)
- `.append()` (To end):
  ```javascript
  parent.append(newElement);
  ```
- `.prepend()` (To start):
  ```javascript
  parent.prepend(newElement);
  ```
- `.appendChild()` (Classic):
  ```javascript
  parent.appendChild(newElement);
  ```
- `.insertBefore(newNode, referenceNode)` (Classic):
  ```javascript
  parent.insertBefore(newElement, referenceElement);
  ```

#### 2. Add Next to (as Sibling)
- `.after(newNode)`:
  ```javascript
  referenceElement.after(newElement);
  ```
- `.before(newNode)`:
  ```javascript
  referenceElement.before(newElement);
  ```
- `.insertAdjacentElement(position, element)`:
  Four positions: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'.
  ```javascript
  referenceElement.insertAdjacentElement('afterend', newElement); // After sibling
  parent.insertAdjacentElement('afterbegin', newElement); // First child
  ```

#### **Summary Table: Where to Use What**
| Goal                  | Modern Method               | Classic Method                         |
|-----------------------|----------------------------|----------------------------------------|
| Add as LAST child     | parent.append(el)           | parent.appendChild(el)                 |
| Add as FIRST child    | parent.prepend(el)          | parent.insertBefore(el, parent.firstChild) |
| Add BEFORE element    | referenceEl.before(el)      | parent.insertBefore(el, referenceEl)   |
| Add AFTER element     | referenceEl.after(el)       | parent.insertBefore(el, referenceEl.nextElementSibling) |

**Recommendation:** Use modern methods (`append`, `prepend`, `before`, `after`) whenever possible. They're more flexible and intuitive.

### C. Removing an Element
- Simplest method is `.remove()`:
```javascript
if (profileImage) {
  profileImage.remove();
}
```

---

## DOM Optimization: DocumentFragment for Performance

**First Thought:** Any change to the live DOM is expensive! Work "offline" in a DocumentFragment and update the DOM once.

### Why Is This Important?
- **Live DOM updates force the browser** to recalculate layout, paint pixels, and update more than just your element.
- If you add 1000 nodes one-by-one to the live DOM, you get 1000 slow reflows.

### The Solution: Use DocumentFragment
- **What is it?** A lightweight, in-memory DOM node not part of the main document.
- **API:** Same as an element (appendChild, append)
- **Performance:** Changing a fragment is cheap—no reflows.

**Example: Adding 1000 Items Efficiently**

```javascript
const list = document.getElementById('my-list');
console.time("Loop WITH fragment");
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const newItem = document.createElement('li');
  newItem.textContent = `Item ${i + 1}`;
  fragment.appendChild(newItem);
}
list.appendChild(fragment); // ONE reflow only!
console.timeEnd("Loop WITH fragment");
```

### The "Magic" When Appending a Fragment
- The fragment itself is **not** added to the DOM.
- All its children are moved into the target element.
- The fragment is emptied.

### Summary Table: DocumentFragment
| Feature          | Description                                           |
|------------------|------------------------------------------------------|
| What is it?      | In-memory, "offline" DOM container                   |
| Why use it?      | Batch updates—speed and efficiency                   |
| How to use?      | 1. createFragment 2. Append children 3. Attach       |
| When to use?     | Adding many nodes in a loop                          |

**Always use DocumentFragment** when batching lots of DOM changes. You avoid unnecessary browser work and keep the page snappy!

---

## Final Takeaway

With `.textContent`, `.innerHTML`, `.classList`, `.style`, and methods for adding/removing elements (plus fragments for performance!), you have all the tools needed to transform a static HTML page into a dynamic application.