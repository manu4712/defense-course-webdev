# Lecture 15: Event Listener and Handler – Comprehensive Notes

## Introduction to Events in JavaScript

Imagine your HTML page as a house: it has rooms (divs), furniture (paragraphs), and interactive objects like a doorbell (button). By itself, the doorbell is just a button on the wall—pushing it does nothing. It's static, silent, and cannot react to the world. 

**Events** are signals that something has happened (e.g., a "ding-dong" when you push the doorbell). An **event listener** is like the person in the house whose job is to listen for that signal. When they're alerted, an **event handler** is the action they take (e.g., getting up to open the door). Without events, a webpage remains a silent, static house; with events, it turns into a responsive home that behaves differently in response to the user.

## Three Core Components of Events
To make any webpage interactive, you need three things:

**1. Target Element:**
The HTML element that should respond to some action. (e.g., a button)

**2. Event Type:**
What specific action are you listening for? (e.g., a 'click')

**3. Listener/Handler:**
What code should be run when the event occurs? (e.g., a function that changes text or color)

## The Modern Way: `addEventListener()`
This is the recommended and powerful way to handle events in JavaScript. 

**Syntax:**
```javascript
targetElement.addEventListener('eventType', functionToRun);
```

**Example:**
HTML:
```html
<button id="action-button">Click Me</button>
<p id="status-text">Waiting for action...</p>
```

JavaScript:
```javascript
// Step 1: Select the Target Element
const myButton = document.getElementById('action-button');
const statusText = document.getElementById('status-text');

// Step 2: Define the Handler Function
function onButtonClick() {
  console.log("Button was clicked!");
  statusText.textContent = "Action Performed!";
  statusText.style.color = 'green';
}

// Step 3: Attach the Listener
myButton.addEventListener('click', onButtonClick);
```

**Key Point:** Always pass the function *name*, not the *call* (i.e., without parentheses). You are giving `addEventListener` a reference to your function—the "recipe" to use later.

## Common Event Types in JavaScript

### Mouse Events
```javascript
element.addEventListener('click', (e) => console.log('Clicked'));
element.addEventListener('dblclick', (e) => console.log('Double clicked'));
element.addEventListener('mousedown', (e) => console.log('Mouse down'));
element.addEventListener('mouseup', (e) => console.log('Mouse up'));
element.addEventListener('mousemove', (e) => console.log('Mouse moving'));
element.addEventListener('mouseenter', (e) => console.log('Mouse entered'));
element.addEventListener('mouseleave', (e) => console.log('Mouse left'));
```

### Keyboard Events
```javascript
document.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
  console.log('Key code:', e.code);
  console.log('Ctrl pressed:', e.ctrlKey);
  console.log('Shift pressed:', e.shiftKey);
  console.log('Alt pressed:', e.altKey);
});

document.addEventListener('keyup', (e) => console.log('Key released'));
document.addEventListener('keypress', (e) => console.log('Key press')); // Deprecated
```

### Form Events
```javascript
const input = document.querySelector('input');
const form = document.querySelector('form');

input.addEventListener('focus', () => console.log('Input focused'));
input.addEventListener('blur', () => console.log('Input blurred'));
input.addEventListener('input', (e) => console.log('Input value:', e.target.value));
input.addEventListener('change', (e) => console.log('Changed:', e.target.value));

form.addEventListener('submit', (e) => {
  e.preventDefault();    // Prevent form submission
  console.log('Form submitted');
});
```

### Window Events
```javascript
window.addEventListener('load', () => console.log('Page fully loaded'));
window.addEventListener('DOMContentLoaded', () => console.log('DOM ready'));
window.addEventListener('resize', () => console.log('Window resized'));
window.addEventListener('scroll', () => console.log('Page scrolled'));
```

## The Event Object: Your Information Packet

When an event occurs, the browser sends a special object—the event object—to your handler function. It contains detailed information about what just happened.

**Handler Example:**
```javascript
function onButtonClick(event) {
  console.log(event); // Inspect the event object
}
myButton.addEventListener('click', onButtonClick);
```
When you click the button, you'll see a PointerEvent or MouseEvent object with properties like position, modifier keys, and more.

**Most Important Properties:**

- `event.target`: The element that triggered the event. Useful in cases like lists, where one parent listener watches for events from many children.

  Example:
  ```html
  <ul id="item-list">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
  ```
  ```javascript
  const list = document.getElementById('item-list');
  list.addEventListener('click', function(event) {
    console.log("You clicked on:", event.target.textContent);
  });
  ```

- `event.preventDefault()`: Stops the browser's default action for an element, such as submitting a form.

  Example:
  ```html
  <form id="my-form">
    <input type="text" id="username">
    <button type="submit">Submit</button>
  </form>
  ```
  ```javascript
  const myForm = document.getElementById('my-form');
  myForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page reload
    const usernameInput = document.getElementById('username');
    console.log(`Form submitted with username: ${usernameInput.value}`);
    // Here you could send this data to a server via fetch()
  });
  ```

## Removing Event Listeners

If you add an event listener that fires often (like `mousemove` or `scroll`), it's good practice to remove it when no longer needed to prevent memory leaks. Removal requires a reference to the exact same function used to add it.

**Correct:**
```javascript
function handleMouseMove() { /* ... */ }
window.addEventListener('mousemove', handleMouseMove);
window.removeEventListener('mousemove', handleMouseMove); // This works
```

**Incorrect:**
```javascript
window.addEventListener('mousemove', () => { /* ... */ });
window.removeEventListener('mousemove', () => { /* ... */ }); // WRONG! Not the same function
```

## Bubbling and Capturing Explained

### The Setup
HTML Structure:
```html
<div id="grandparent">GRANDPARENT
  <div id="parent">PARENT
    <button id="child">CHILD (Click Me)</button>
  </div>
</div>
```

JavaScript:
```javascript
const grandparent = document.getElementById('grandparent');
grandparent.addEventListener('click', (event) => {
  console.log("--- Event Listener on GRANDPARENT was triggered ---");
  console.log("event.currentTarget:", event.currentTarget.id); // The listener element
  console.log("event.target:", event.target.id);              // Where the event originated
});
```

**Phases of Event Flow:**
1. **Capturing Phase (Trickle Down):**
   The event travels down the DOM tree from window to the target element, checking for listeners registered for capturing (`useCapture: true`).

2. **Target Phase:**
   The event arrives at the element that was actually acted upon (button).

3. **Bubbling Phase (Bubble Up):**
   The event travels back up the DOM tree, looking for listeners registered for bubbling (the default).

**Inside the Callback:**
- `event.currentTarget` is ALWAYS the element the listener is attached to (e.g., grandparent div)
- `event.target` is the element where the event started (e.g., child button)

**Example Output:**
When the child button is clicked, you see in the console:
```
--- Event Listener on GRANDPARENT was triggered ---
event.currentTarget: grandparent
event.target: child
```

**Event Delegation:**
You can put listeners on a high-level ancestor and "catch" events from deeply nested descendants. The bubbling phase guarantees this works!


## Summary & Conclusion
JavaScript events allow webpages to change from static, silent houses into responsive, interactive homes. Mastering event listeners and handlers unlocks dynamic web experiences. Focus on:
- Clearly identifying your target element, event type, and handler function
- Using `addEventListener()` for modern event listening
- Understanding the event object as your information packet
- Leveraging event delegation and understanding bubbling/capturing
- Cleaning up unused listeners for performance

With these concepts, you can confidently architect interactive applications that respond to your users, making your projects lively and engaging.

---

**Refer back to this markdown file anytime for a solid foundational understanding of JavaScript events!**
