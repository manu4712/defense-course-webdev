# Lecture 17: Event Loop in JavaScript
## Complete Guide to JavaScript's Single-Threaded Nature

---

## Table of Contents
1. [Core Concepts](#core-concepts)
2. [Single-Threaded Execution](#single-threaded-execution)
3. [Synchronous vs Blocking](#synchronous-vs-blocking)
4. [Web APIs](#web-apis)
5. [The Event Loop](#the-event-loop)
6. [Task Queues](#task-queues)
7. [Real-World Examples](#real-world-examples)
8. [JavaScript Doesn't Wait](#javascript-doesnt-wait)
9. [Common Patterns](#common-patterns)
10. [Key Takeaways](#key-takeaways)

---

## Core Concepts

### What is an API?

An **API (Application Programming Interface)** is any way for code to talk to other code. It has three key aspects:

- **Interface**: How to interact with it
- **Abstraction**: You don't need to know HOW it works internally
- **Contract**: What to send, what you'll get back

### The Fundamental Truth About JavaScript

JavaScript is **single-threaded**. This means:
- Only ONE line of code executes at a time
- There is only ONE call stack
- Nothing can run simultaneously
- It's like a single-lane road where cars must go one after another

---

## Single-Threaded Execution

### Example 1: Basic Sequential Execution

```javascript
console.log('First');
console.log('Second');
console.log('Third');

// Output:
// First
// Second
// Third
```

**What happens:**
1. JavaScript reads line 1 and executes `console.log('First')`
2. JavaScript reads line 2 and executes `console.log('Second')`
3. JavaScript reads line 3 and executes `console.log('Third')`

This ALWAYS runs in order. JavaScript can't execute Second and Third simultaneously. Each statement must complete before the next one starts.

### Visual Representation

```
┌─────────────────────────────────────┐
│      Call Stack (Single Thread)     │
├─────────────────────────────────────┤
│  Only ONE thing executes at a time  │
│  Like a single-lane road            │
└─────────────────────────────────────┘
```

---

## Synchronous vs Blocking

### What is Synchronous Code?

Synchronous code is **blocking**. Each line must complete before the next line starts. When a function runs, nothing else can happen until it's done.

### Example 2: Blocking Code Problem

```javascript
function slowFunction() {
  // Simulate slow work (like heavy calculation)
  let sum = 0;
  for (let i = 0; i < 3000000000; i++) {
    sum += i;
  }
  return sum;
}

console.log('Start');
slowFunction(); // This BLOCKS everything
console.log('End'); // This waits for slowFunction to finish
```

**What happens:**
1. Console logs "Start"
2. `slowFunction()` starts executing
3. The browser FREEZES for several seconds during the loop
4. You can't click buttons, scroll, or do anything
5. The loop finally completes
6. Console logs "End"

**The Problem:** The user's browser becomes unresponsive. This is called **blocking the main thread**.

### Timeline of Execution

```
Time 0ms:   console.log('Start') → Output: "Start"
Time 1ms:   slowFunction() starts
Time 5000ms: Loop finishes
Time 5001ms: console.log('End') → Output: "End"

During 1ms-5000ms: Browser is FROZEN! 🔒
```

---

## Web APIs

### What Are Web APIs?

The browser provides APIs that run **OUTSIDE** of JavaScript's single thread. These are called **Web APIs**. They handle tasks asynchronously so JavaScript doesn't block.

### Key Point: Delegation

When you call a Web API:
1. JavaScript calls the function
2. The browser takes over the work
3. JavaScript continues immediately
4. The result comes back later via a callback or Promise

### Example 3: setTimeout Web API

```javascript
console.log('1. Start');

// setTimeout is a Web API, NOT JavaScript code
setTimeout(() => {
  console.log('2. Inside timeout');
}, 2000);

console.log('3. End');

// Output:
// 1. Start
// 3. End
// (2 seconds later)
// 2. Inside timeout
```

**What happened step by step:**
1. JavaScript: `console.log('1. Start')` executes → Output: "1. Start"
2. JavaScript: Calls `setTimeout()`
3. Browser: "Okay, I'll handle the timer" → Takes it over
4. JavaScript: Continues immediately to line 3
5. JavaScript: `console.log('3. End')` executes → Output: "3. End"
6. JavaScript: Call stack is empty
7. Browser: (After 2 seconds) "Timer finished! Here's your callback"
8. JavaScript: Executes the callback → Output: "2. Inside timeout"

**Timeline:**

```
JavaScript View:
├─ console.log('1. Start')
├─ setTimeout() [delegate to browser]
├─ console.log('3. End')
└─ [wait for callback]

Browser View:
├─ Received setTimeout request
├─ Start 2 second timer
├─ (2 seconds pass)
├─ Timer complete! Callback ready
└─ Tell JavaScript to run callback
```

### Example 4: Multiple Web API Calls

```javascript
console.log('A');

setTimeout(() => console.log('B'), 0);
setTimeout(() => console.log('C'), 0);

console.log('D');

// Output:
// A
// D
// B
// C
```

**Why not A, B, C, D?**
- `setTimeout(..., 0)` doesn't mean "run immediately"
- It means "run as soon as possible AFTER the call stack is empty"
- Both B and C are registered but don't execute until the stack is clear

---

## The Event Loop

### What Is The Event Loop?

The **event loop** is the mechanism that:
1. Monitors the call stack
2. Monitors the task queues
3. Moves tasks from queues to the call stack when appropriate
4. Coordinates between JavaScript and Web APIs

### The Event Loop Algorithm

```
while (eventLoop.waitForTask()) {
  const macrotask = eventLoop.nextMacrotask();
  if (macrotask) {
    macrotask.execute();
  }

  const microtask = eventLoop.nextMicrotask();
  while (microtask) {
    microtask.execute();
    const nextMicrotask = eventLoop.nextMicrotask();
    microtask = nextMicrotask;
  }

  if (isRepaintTime()) {
    doRepaint();
  }
}
```

**In simpler terms:**
1. Execute one macrotask
2. Execute ALL microtasks
3. Repaint if needed
4. Repeat

### The Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│              Browser/Node.js Runtime                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │        JavaScript Engine (V8, SpiderMonkey)      │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │      Call Stack (Single Thread)            │  │  │
│  │  │  - main code executes here, one at a time  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │      Memory Heap                          │  │  │
│  │  │  - Objects stored here                     │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Web APIs (Browser APIs)               │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  - setTimeout / setInterval (timers)            │  │
│  │  - fetch / XMLHttpRequest (network)             │  │
│  │  - DOM events (click, scroll, etc.)             │  │
│  │  - FileSystem (fs.readFile in Node.js)          │  │
│  │  - All run in SEPARATE threads!                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Event Loop                            │  │
│  │  - Checks if call stack is empty                │  │
│  │  - Moves tasks from queues to stack             │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Task Queues                           │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  📌 Microtask Queue (HIGH PRIORITY)             │  │
│  │     - Promises (.then, .catch, .finally)       │  │
│  │     - queueMicrotask()                          │  │
│  │     - MutationObserver                          │  │
│  │                                                 │  │
│  │  📌 Macrotask Queue (LOWER PRIORITY)           │  │
│  │     - setTimeout / setInterval                  │  │
│  │     - setImmediate (Node.js)                    │  │
│  │     - I/O operations                            │  │
│  │     - UI events                                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Task Queues

### Two Types of Queues

#### 1. Microtask Queue (Priority: HIGH)

Items in this queue execute FIRST, and ALL microtasks execute before any macrotask.

**What goes in the Microtask Queue:**
- Promise callbacks (`.then()`, `.catch()`, `.finally()`)
- `queueMicrotask()` function
- `MutationObserver`

```javascript
Promise.resolve().then(() => {
  console.log('Microtask: I have HIGH priority!');
});

setTimeout(() => {
  console.log('Macrotask: I have LOWER priority');
}, 0);

// Output:
// Microtask: I have HIGH priority!
// Macrotask: I have LOWER priority
```

#### 2. Macrotask Queue (Priority: LOWER)

After all microtasks complete, ONE macrotask executes, then event loop checks microtasks again.

**What goes in the Macrotask Queue:**
- `setTimeout()`
- `setInterval()`
- `setImmediate()` (Node.js)
- I/O operations
- UI rendering events

### The Queue Priority Rule

```
┌────────────────────────────────────────────────┐
│          Call Stack                            │
│     (Executes synchronous code)                │
└──────────────┬─────────────────────────────────┘
               │
        [Stack Empty?]
               │
          ┌────┴────┐
          │          │
     YES  │          │  NO
          │          │
          ▼          ▼
    ┌──────────┐  [Wait]
    │[Continue]│
    └────┬─────┘
         │
    Execute ALL
    Microtasks
    (Promises)
         │
         ▼
    Execute ONE
    Macrotask
    (setTimeout)
         │
         ▼
    Check for
    Repaint
         │
         ▼
    [Repeat]
```

---

## Real-World Examples

### Example 5: Complete Event Loop Demonstration

```javascript
console.log('1. Synchronous');

setTimeout(() => {
  console.log('2. Timeout 0ms');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise');
});

console.log('4. Synchronous');

// Output:
// 1. Synchronous
// 4. Synchronous
// 3. Promise
// 2. Timeout 0ms
```

**Step-by-step execution:**

```
Step 1: Execute Synchronous Code
├─ console.log('1. Synchronous')
│  └─ Output: "1. Synchronous" ✓
├─ setTimeout(...) registered
│  └─ Moved to Macrotask Queue
├─ Promise.resolve().then(...) registered
│  └─ Moved to Microtask Queue
└─ console.log('4. Synchronous')
   └─ Output: "4. Synchronous" ✓

Step 2: Call Stack is Empty
└─ Event Loop checks queues

Step 3: Execute Microtask Queue (Priority!)
├─ Promise callback executes
└─ console.log('3. Promise')
   └─ Output: "3. Promise" ✓

Step 4: Execute Macrotask Queue
├─ setTimeout callback executes
└─ console.log('2. Timeout 0ms')
   └─ Output: "2. Timeout 0ms" ✓
```

### Example 6: Complex Queue Scenario

```javascript
console.log('A');

setTimeout(() => {
  console.log('B');
  Promise.resolve().then(() => console.log('C'));
}, 0);

Promise.resolve()
  .then(() => {
    console.log('D');
    setTimeout(() => console.log('E'), 0);
  })
  .then(() => console.log('F'));

console.log('G');

// Output: A, G, D, F, B, C, E
```

**Detailed execution trace:**

```
Phase 1: Synchronous Code Execution
├─ console.log('A') → Output: "A" ✓
├─ setTimeout() → Queue to Macrotask Queue
├─ Promise.resolve().then() → Queue to Microtask Queue
└─ console.log('G') → Output: "G" ✓

Call Stack: [empty]
Microtask Queue: [Promise.then(D, F)]
Macrotask Queue: [setTimeout(B)]

Phase 2: Execute ALL Microtasks
├─ First microtask: console.log('D') → Output: "D" ✓
├─ Adds setTimeout(E) → Queue to Macrotask Queue
└─ Second microtask: console.log('F') → Output: "F" ✓

Call Stack: [empty]
Microtask Queue: [empty]
Macrotask Queue: [setTimeout(B), setTimeout(E)]

Phase 3: Execute ONE Macrotask
├─ First macrotask: console.log('B') → Output: "B" ✓
├─ Adds Promise.then(C) → Queue to Microtask Queue
├─ Event loop sees microtasks exist
└─ Execute microtasks before next macrotask

Phase 4: Execute Microtasks Again
├─ Promise.then(C): console.log('C') → Output: "C" ✓

Call Stack: [empty]
Microtask Queue: [empty]
Macrotask Queue: [setTimeout(E)]

Phase 5: Execute Next Macrotask
└─ console.log('E') → Output: "E" ✓
```

### Example 7: fetch() and Promises

```javascript
console.log('Start');

fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log('Data:', data));

console.log('End');

// Output:
// Start
// End
// (network request completes)
// Data: {...}
```

**What happened:**
1. `console.log('Start')` executes synchronously
2. `fetch()` is called → Returns a Promise immediately → JavaScript continues
3. `.then()` callbacks are queued to Microtask Queue
4. `console.log('End')` executes synchronously
5. Call stack is empty
6. Event loop executes microtasks (the `.then()` callbacks)
7. The first `.then()` waits for network response
8. Network completes → Second `.then()` executes → Logs data

---

## JavaScript Doesn't Wait

### The Most Important Concept

**JavaScript doesn't know or care if something is async. It just calls functions and handles return values.**

### Why?

JavaScript's contract with functions is simple:

```
1. Call the function
2. Get a return value (immediately)
3. Continue to the next line
```

JavaScript ALWAYS continues immediately. It never pauses or waits.

### Example 8: JavaScript's Perspective

```javascript
// From JavaScript's point of view, ALL functions work the SAME way:

const result1 = Math.random();                    // Call, get value, continue
const result2 = document.getElementById('btn');   // Call, get value, continue
const result3 = setTimeout(() => {}, 1000);       // Call, get value, continue
const result4 = fetch('/api/data');               // Call, get value, continue

// JavaScript doesn't care what's returned
// It just gets SOMETHING back and moves on
```

**What gets returned:**

```javascript
const result1 = Math.random();           // Returns: 0.723 (number)
const result2 = document.getElementById('btn'); // Returns: <button> (element)
const result3 = setTimeout(() => {}, 1000);     // Returns: 1 (timer ID)
const result4 = fetch('/api/data');             // Returns: Promise {<pending>}
```

**Key insight:** JavaScript got a return value for all four. It doesn't distinguish between them. It just uses what it got!

### Example 9: Proof That JavaScript Never Waits

```javascript
console.log('1');

// This looks like it should wait, but it doesn't!
fetch('/api/data');

console.log('2');  // Runs immediately!

// Output:
// 1
// 2
// (JavaScript never paused!)
```

**Behind the scenes:**

```javascript
// What fetch() actually returns:
const promise = fetch('/api/data');
console.log(promise);  // Promise { <pending> }

// JavaScript got SOMETHING (a Promise object)
// It's not the actual data, but it IS a return value
// So JavaScript moves on immediately
```

### Example 10: Synchronous vs Asynchronous Return Values

```javascript
// SYNCHRONOUS FUNCTION
function syncFunction() {
  return 42;  // Return the actual value
}

// ASYNCHRONOUS FUNCTION
function asyncFunction() {
  return new Promise(resolve => {
    setTimeout(() => resolve(42), 1000);  // Return a Promise (not the value)
  });
}

// JavaScript calls both the SAME way:
const a = syncFunction();    // Gets 42
const b = asyncFunction();   // Gets Promise { <pending> }

// JavaScript doesn't "know" or "care" which is which
// It just gets what the function returns
```

**Timeline comparison:**

```
SYNC FUNCTION:
Time 0ms: Call syncFunction()
Time 1ms: Get return value: 42
Time 2ms: Use value: 42 ✓

ASYNC FUNCTION:
Time 0ms: Call asyncFunction()
Time 1ms: Get return value: Promise {<pending>}
Time 2ms: Continue with Promise object
Time 3ms: Promise resolves (somewhere later)
          Callback executes with value: 42
```

---

## Common Patterns

### Pattern 1: Callback Pattern (Old Way)

```javascript
// Function accepts a callback to receive result later
function downloadData(onComplete) {
  setTimeout(() => {
    const data = { name: 'John', age: 30 };
    onComplete(data);  // Call the callback with data
  }, 1000);
}

// Usage:
downloadData((data) => {
  console.log('Downloaded:', data);
});

console.log('Request sent!');

// Output:
// Request sent!
// (1 second later)
// Downloaded: { name: 'John', age: 30 }
```

**How it works:**
1. `downloadData()` is called with a callback function
2. The function returns immediately
3. JavaScript continues and logs "Request sent!"
4. 1 second later, the browser says "download complete"
5. The callback function is executed with the data

### Pattern 2: Promise Pattern (Modern Way)

```javascript
// Function returns a Promise
function downloadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: 'John', age: 30 };
      resolve(data);  // Promise resolves with data
    }, 1000);
  });
}

// Usage:
downloadData()
  .then(data => console.log('Downloaded:', data))
  .catch(error => console.error('Error:', error));

console.log('Request sent!');

// Output:
// Request sent!
// (1 second later)
// Downloaded: { name: 'John', age: 30 }
```

**Advantages over callbacks:**
- Better readability with chaining
- Built-in error handling with `.catch()`
- Easier to handle multiple sequential operations

### Pattern 3: async/await Pattern (Syntactic Sugar)

```javascript
// Using async/await (looks synchronous but it's Promise under the hood)
async function downloadAndProcess() {
  try {
    const data = await downloadData();  // Looks like it waits
    console.log('Downloaded:', data);
    
    const processed = await processData(data);
    console.log('Processed:', processed);
  } catch (error) {
    console.error('Error:', error);
  }
}

// But behind the scenes it's:
// downloadData()
//   .then(data => {
//     return processData(data)
//       .then(processed => {
//         console.log('Processed:', processed);
//       })
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   })
```

**Important:** JavaScript still doesn't "wait". The `await` keyword just pauses the async function, but the JavaScript engine continues executing other tasks.

### Pattern 4: Working with Web APIs

```javascript
// Timer API
function delayedGreeting() {
  setTimeout(() => console.log('Hello!'), 2000);
}

// Network API
function fetchUser(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => response.json());
}

// DOM Event API
document.getElementById('btn').addEventListener('click', (event) => {
  console.log('Button clicked!');
});

// File API (Node.js)
function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// All these use the same principle:
// 1. Call the API
// 2. Get a return value (or undefined)
// 3. Result comes later via callback/Promise
```

---

## Key Takeaways

### 1. Single-Threaded Nature
- JavaScript has ONE call stack
- Only ONE line of code executes at a time
- Nothing runs simultaneously
- This is why async mechanisms are needed

### 2. Synchronous Code Blocks
- Each line must complete before the next
- Blocking code freezes the browser
- Users can't click, scroll, or interact
- This is a poor user experience

### 3. Web APIs Are the Solution
- Browser provides APIs that run outside JavaScript
- These handle timers, network requests, events, etc.
- They run in separate threads
- JavaScript continues immediately after calling them

### 4. The Event Loop Coordinates Everything
- It monitors the call stack and queues
- When the stack is empty, it moves tasks from queues
- It follows priority rules: microtasks before macrotasks
- It's the bridge between JavaScript and Web APIs

### 5. Queue Priority
- Microtasks (Promises) execute with HIGH priority
- Macrotasks (setTimeout) execute with LOWER priority
- ALL microtasks execute before ONE macrotask
- This affects code execution order

### 6. JavaScript Doesn't Wait
- JavaScript calls functions and gets return values
- It ALWAYS continues immediately
- Async functions return Promises/callbacks, not results
- The result comes later when the browser is ready

### 7. Async Patterns
- **Callbacks:** Function calls you with result
- **Promises:** `.then()` gets called with result
- **async/await:** Looks synchronous but it's Promises

### 8. Web APIs Include
- **Timers:** setTimeout, setInterval
- **Network:** fetch, XMLHttpRequest
- **Events:** click, scroll, resize, etc.
- **File I/O:** fs.readFile, fs.writeFile (Node.js)
- **DOM:** getElementById, querySelector, etc.

---

## Visual Summary: Complete Flow

```javascript
// Complete example with visual trace
console.log('📍 1. Start');

setTimeout(() => {
  console.log('📍 6. setTimeout callback');
}, 0);

Promise.resolve()
  .then(() => console.log('📍 4. Promise 1'))
  .then(() => console.log('📍 5. Promise 2'));

console.log('📍 2. End');

// EXECUTION TRACE:
// ┌─────────────────────────────────────────┐
// │ Call Stack Phase                        │
// ├─────────────────────────────────────────┤
// │ console.log('📍 1. Start')  ✓          │
// │ setTimeout() → Macrotask Queue         │
// │ Promise.then() → Microtask Queue       │
// │ console.log('📍 2. End')  ✓            │
// │ [Stack Empty!]                         │
// └─────────────────────────────────────────┘
//           ↓
// ┌─────────────────────────────────────────┐
// │ Microtask Queue Phase                   │
// ├─────────────────────────────────────────┤
// │ console.log('📍 4. Promise 1')  ✓       │
// │ console.log('📍 5. Promise 2')  ✓       │
// │ [Microtask Queue Empty!]                │
// └─────────────────────────────────────────┘
//           ↓
// ┌─────────────────────────────────────────┐
// │ Macrotask Queue Phase                   │
// ├─────────────────────────────────────────┤
// │ console.log('📍 6. setTimeout')  ✓      │
// │ [Macrotask Queue Empty!]                │
// └─────────────────────────────────────────┘

// OUTPUT:
// 📍 1. Start
// 📍 2. End
// 📍 4. Promise 1
// 📍 5. Promise 2
// 📍 6. setTimeout callback
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Thinking setTimeout(fn, 0) Runs Immediately

```javascript
// WRONG assumption: This runs right after console.log('A')
setTimeout(() => console.log('B'), 0);
console.log('A');

// Output: A, B (not B, A!)

// CORRECT: setTimeout waits for call stack to empty
// 0ms just means "as soon as possible"
```

### ❌ Mistake 2: Forgetting Promises Are Microtasks

```javascript
// WRONG: Thinking Promises and setTimeout have same priority
setTimeout(() => console.log('A'), 0);
Promise.resolve().then(() => console.log('B'));

// Output: B, A (Promises have priority!)
// NOT: A, B
```

### ❌ Mistake 3: Thinking await Pauses JavaScript Globally

```javascript
// WRONG: Thinking this blocks everything
async function demo() {
  console.log('Start');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('End');
}

// CORRECT: It only pauses the async function
// Other code can still execute during the await
```

### ❌ Mistake 4: Not Understanding fetch() Returns Promise

```javascript
// WRONG: Expecting data immediately
const data = fetch('/api').json();
console.log(data);  // Promise, not actual data!

// CORRECT: Use .then() or await
fetch('/api')
  .then(response => response.json())
  .then(data => console.log(data));

// OR with async/await
const response = await fetch('/api');
const data = await response.json();
console.log(data);
```

---

## Practice Exercises

### Exercise 1: Predict the Output

```javascript
console.log('A');

setTimeout(() => console.log('B'), 0);
setTimeout(() => console.log('C'), 10);

Promise.resolve()
  .then(() => console.log('D'))
  .then(() => console.log('E'));

console.log('F');

// What's the output? (Scroll down for answer)
```

**Answer:** A, F, D, E, B, C

**Explanation:**
- Sync: A, F
- Microtasks (high priority): D, E
- Macrotasks (lower priority): B (0ms), C (10ms)

---

### Exercise 2: Understanding setTimeout Chain

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve()
  .then(() => {
    console.log('4');
    setTimeout(() => console.log('5'), 0);
  })
  .then(() => console.log('6'));

console.log('7');

// What's the output?
```

**Answer:** 1, 7, 4, 6, 2, 3, 5

**Explanation:**
1. Sync: 1, 7
2. Microtask: 4 (adds setTimeout to queue)
3. Microtask: 6
4. Macrotask: 2 (adds Promise to queue)
5. Microtask: 3
6. Macrotask: 5

---

## Resources for Further Learning

### Concepts to Deepen
- Promise.all() and Promise.race()
- async/await in detail
- Error handling in async code
- Concurrent vs Sequential async operations
- Performance implications of blocking code

### Tools to Experiment
- Browser DevTools (Console, Performance tab)
- Chrome DevTools > Performance > Record
- JavaScript Visualizer: http://latentflip.com/loupe
- Node.js REPL for testing

---

## Conclusion

The event loop is the heart of JavaScript's asynchronous programming. Understanding it deeply gives you:

✅ Better debugging skills
✅ Better performance optimization
✅ Better understanding of async patterns
✅ Ability to predict code execution order
✅ Confidence in writing non-blocking code

**Remember:** JavaScript doesn't wait. It delegates to the browser. The event loop brings results back when ready.