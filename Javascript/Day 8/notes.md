# Lecture 08 — JavaScript Objects: The Complete, Practical Guide

Main takeaway: In JavaScript, an object is a dynamic container of labeled values (key–value pairs). Mastering object creation, property access (dot vs bracket), updates, deletion, methods with this, safe iteration (Object.keys/values/entries), copying (shallow vs deep with structuredClone), destructuring, and Symbols will unlock clean, modern, and robust code.

---

## Part 1 — The Core Concept: What Is an Object?

An object is a collection of labeled data: each label (the key) maps to a value.  
Keys are strings or Symbols. Values can be of any type (number, string, boolean, array, object, function, etc.).

Example mental model: A “person” object with labeled properties.

```js
// An object representing a person
let person = {
  name: "Alice",        // key "name" → "Alice"
  age: 30,              // key "age" → 30
  isStudent: true       // key "isStudent" → true
};
```

Why this matters: Objects are the primary way to model and organize data and behavior in JavaScript.

---

## Part 2 — CRUD: Create, Read, Update, Delete

A. Creating Objects

- Preferred: object literal syntax {}

```js
// Empty object
const car = {};

// Object with properties
const user = {
  username: "js_dev",
  loginCount: 57,
  "is-premium-member": true // keys with hyphens/spaces must be quoted
};
```

B. Reading (Accessing) Properties

- Dot notation: simple, readable; works only with valid identifiers.
```js
console.log(user.username); // "js_dev"
```

- Bracket notation: flexible; keys are strings; supports special characters and dynamic access.
```js
console.log(user["loginCount"]);          // 57
console.log(user["is-premium-member"]);   // true

const propertyToAccess = "username";
console.log(user[propertyToAccess]);      // "js_dev" (dynamic; impossible with dot)
```

Use dot when keys are simple identifiers; use brackets when keys contain special characters or when selecting keys dynamically.

C. Updating vs Adding

Same syntax: if the key exists → update; else → create.

```js
const book = { title: "The Hobbit" };
book.title = "The Lord of the Rings"; // update
book.author = "J.R.R. Tolkien";       // add
book.pages = 1178;
console.log(book);
// { title: "The Lord of the Rings", author: "J.R.R. Tolkien", pages: 1178 }
```

D. Deleting Properties

```js
delete book.pages;
console.log(book);
// { title: "The Lord of the Rings", author: "J.R.R. Tolkien" }
```

Tip: Prefer setting to undefined or null only when you intentionally keep the key. Use delete to remove the key entirely.

---

## Part 3 — Methods and the this Keyword

When a function is stored as a property value, it’s a method. Inside a method, this refers to the object the method is called on.

```js
const user = {
  name: "Alice",
  greeting: function () {
    // here, `this` === user when called as user.greeting()
    console.log(`Hello, my name is ${this.name}.`);
  }
};

user.greeting(); // "Hello, my name is Alice."
```

Key rules for this in objects:
- Method call form obj.method(): this is obj.
- If you extract the function and call it bare (const fn = obj.method; fn()), this becomes undefined in strict mode (or the global object in sloppy mode). Bind or use arrow functions with care (arrows capture lexical this and are not suitable as methods when you need dynamic this).

---

## Part 4 — Iterating Over Object Properties

Goal: Safely and clearly enumerate keys and values.

A. for...in (the old way)

```js
const car = { make: "Honda", model: "Civic", year: 2021 };
for (const key in car) {
  console.log(`Key: ${key}, Value: ${car[key]}`);
}
```

Gotcha: for...in iterates over enumerable properties, including those from the prototype chain. This can cause surprises. You can guard with hasOwnProperty, but modern methods are cleaner.

B. Modern, Safe Methods

- Object.keys(obj): array of own property keys (strings)
- Object.values(obj): array of own property values
- Object.entries(obj): array of [key, value] pairs

```js
const car = { make: "Honda", model: "Civic", year: 2021 };

console.log(Object.keys(car));    // ["make", "model", "year"]
console.log(Object.values(car));  // ["Honda", "Civic", 2021]

for (const [key, value] of Object.entries(car)) {
  console.log(`${key}: ${value}`);
}
```

Recommendation:
- Default: for (const [k, v] of Object.entries(obj)) { ... } for both key and value.
- Use Object.keys when you only need keys (and compute value via obj[key]).
- Use Object.values when keys are irrelevant.

Why avoid for...in?
- It includes inherited properties unless guarded, making it error-prone. Prefer Object.* methods for predictable iteration over own properties.

---

## Part 5 — Reference Semantics and Copying Objects

A. Objects Are Reference Types

Assigning one object variable to another copies the reference, not the data.

```js
let obj1 = { value: 10 };
let obj2 = obj1;   // both point to the same object
obj2.value = 20;
console.log(obj1.value); // 20
```

B. Shallow Copy (Top-level copy only)

- Spread syntax (modern, readable)
- Object.assign (older, equivalent for shallow copy)

```js
const original = { name: "Alice", age: 30 };

// Spread
const copy = { ...original };
copy.age = 31;

console.log(original.age); // 30
console.log(copy.age);     // 31

// Note: shallow copy → nested objects are still shared references
const originalUser = {
  name: "Alice",
  age: 30,
  address: { city: "New York" } // nested
};

const shallowCopy = { ...originalUser };
shallowCopy.address.city = "London";
console.log(originalUser.address.city); // "London" (shared reference)
```

C. Deep Copy (Recursive copy of all nested values)

Modern, built-in: structuredClone(value)

```js
const originalUser = {
  name: "Alice",
  age: 30,
  joined: new Date("2023-01-15"),
  address: { city: "New York" },
  roles: ["editor", "viewer"]
};

const deepClone = structuredClone(originalUser);

// mutate clone
deepClone.age = 31;
deepClone.address.city = "London";
deepClone.roles.push("admin");
deepClone.joined.setFullYear(2024);

// original unchanged
console.log(originalUser.age);                 // 30
console.log(originalUser.address.city);        // "New York"
console.log(originalUser.roles);               // ["editor", "viewer"]
console.log(originalUser.joined.getFullYear()); // 2023
```

Support (modern environments): Chrome 98+, Firefox 94+, Safari 15.4+, Node.js 17+.  
Limitations: Cannot clone functions, DOM nodes, or preserve class prototypes (prototype chain is discarded). Will throw DataCloneError for functions and some unsupported types.

Example failure:

```js
const original = {
  name: "Alice",
  sayHi: function () { console.log("Hi"); }
};

try {
  const clone = structuredClone(original);
} catch (e) {
  console.error(e.name);    // "DataCloneError"
  console.error(e.message); // "... could not be cloned."
}
```

Legacy/maximum robustness: Lodash _.cloneDeep for complex cases (e.g., class instances, circular refs). Requires dependency and careful use.

Quick comparison:
- structuredClone: default for deep data cloning; fast; supports Date, Map, Set; cannot clone functions or keep prototypes.
- JSON.parse(JSON.stringify(obj)): only for JSON-safe data; loses functions, undefined, Dates; slower and lossy. Avoid unless data is simple.
- _.cloneDeep: robust, handles edge cases; external dependency.

---

## Part 6 — Modern ES6+ Object Syntax

A. Property Value Shorthand

```js
const name = "Alice";
const age = 30;

// Old
const userOld = { name: name, age: age };

// New
const userNew = { name, age }; // cleaner
```

B. Method Shorthand

```js
// Old
const userOld = {
  sayHi: function () {
    console.log("Hi");
  }
};

// New
const userNew = {
  sayHi() {
    console.log("Hi");
  }
};
```

C. Computed Property Names

Use expressions/variables as keys with [] in literals.

```js
const propertyName = "email";
const user = {
  name: "Alice",
  [propertyName]: "alice@example.com"
};

console.log(user); // { name: "Alice", email: "alice@example.com" }
```

---

## Part 7 — The Modern Way to Loop: Object.keys / values / entries

Core idea: Convert object parts to arrays, then use for...of.

Given:

```js
const user = { name: "Alice", forklift: "Linde", age: 30, isStudent: true };
```

1) Object.keys(obj) — Keys only

```js
const keys = Object.keys(user);
// ["name", "forklift", "age", "isStudent"]
for (const key of keys) {
  const value = user[key];
  console.log(`The key is "${key}" and the value is "${value}".`);
}
```

2) Object.values(obj) — Values only

```js
const values = Object.values(user);
// ["Alice", "Linde", 30, true]
for (const value of values) {
  console.log(`The value is: ${value}`);
}
```

3) Object.entries(obj) — Pairs

```js
const entries = Object.entries(user);
// [ ["name","Alice"], ["forklift","Linde"], ["age",30], ["isStudent",true] ]

for (const [key, value] of entries) {
  console.log(`Key: ${key}, Value: ${value}`);
}
```

Why preferred:
- Reads clearly
- Iterates only own properties
- Works great with destructuring

Traditional for...in pitfalls:

```js
// Mutating Object.prototype (never do this)
Object.prototype.isInherited = true;
const person = { name: "Bob" };

for (const key in person) {
  console.log(key); // "name", and "isInherited" (inherited)
}

console.log(Object.keys(person)); // ["name"] (safe)
```

To safely use for...in you must guard:

```js
for (const key in person) {
  if (Object.prototype.hasOwnProperty.call(person, key)) {
    // safe branch
  }
}
```

Recommendation summary:
- Default: for (const [k, v] of Object.entries(obj)) { ... }
- Keys only: for (const k of Object.keys(obj)) { ... }
- Values only: for (const v of Object.values(obj)) { ... }
- Avoid for...in unless inspecting prototype chain intentionally.

---

## Part 8 — Destructuring Assignment (ES6)

A. Object Destructuring

Extract properties by name, with optional renaming, defaults, and nesting.

```js
const user = {
  id: 123,
  name: "Alice",
  email: "alice@example.com",
  profile: { isAdmin: true }
};

// Basic
const { name, age } = user;
console.log(name); // "Alice"
console.log(age);  // undefined

// Renaming
const { name: userName, email } = user;
console.log(userName); // "Alice"

// Defaults
const { name: personName, role = "User" } = user;
console.log(personName); // "Alice"
console.log(role);       // "User"

// Nested destructuring
const { profile: { isAdmin } } = user;
console.log(isAdmin); // true
```

B. Array Destructuring

Extract by position, skip with commas, and combine with defaults.

```js
const scores = [98, 85, 100, 92];

// First two
const [firstScore, secondScore] = scores;
console.log(firstScore);  // 98
console.log(secondScore); // 85

// Skipping
const [winner, , thirdPlace] = scores;
console.log(winner);     // 98
console.log(thirdPlace); // 100

// Defaults
const [a = 0, b = 0, c = 0, d = 0, e = 0] = scores;
console.log(e); // 0 (no 5th score)
```

Practical patterns:
- Destructure function parameters for clean APIs.
- Combine with rest (...) for flexible captures: const { id, ...rest } = obj;

---

## Part 9 — Symbols: Unique, Hidden Property Keys

Symbols are unique, immutable identifiers ideal for non-colliding property keys and metadata.

A. Creating Symbols

```js
const sym1 = Symbol("description");
const sym2 = Symbol("description");
console.log(sym1 === sym2); // false (always unique)
```

B. Using Symbols as Keys

Bracket notation required.

```js
const user = { name: "Alice" };
const secretId = Symbol("userId");

user[secretId] = "xyz-987-abc";
console.log(user[secretId]);   // "xyz-987-abc"
console.log(user["secretId"]); // undefined
```

Benefit: No collision with normal string keys; safe extensibility.

C. Symbol Keys Are Omitted from Normal Iteration

```js
for (const key in user) {
  console.log(key); // "name" only
}

console.log(Object.keys(user)); // ["name"]

// Get symbol keys explicitly
const symbolKeys = Object.getOwnPropertySymbols(user);
console.log(symbolKeys);           // [Symbol(userId)]
console.log(user[symbolKeys[0]]);  // "xyz-987-abc"
```

Use cases:
- Internal metadata
- “Private-ish” keys (not truly private but hidden from common enumeration)
- Avoiding collisions in shared objects or libraries

---

## Part 10 — Practical Patterns and Best Practices

- Prefer object literal {} for clarity and speed of authoring.
- Choose property access wisely:
  - Dot for simple identifiers
  - Bracket for special characters or dynamic keys
- Add/update via assignment; remove via delete when key must not exist afterward.
- Methods: Use method shorthand; be mindful of this binding.
- Iteration: Prefer Object.keys/values/entries with for...of and destructuring.
- Copying:
  - Shallow copy with {...obj} or Object.assign({}, obj)
  - Deep copy with structuredClone for data; consider _.cloneDeep for legacy/complex cases
- Destructuring:
  - Improves readability and reduces boilerplate
  - Use defaults and renaming to make intent explicit
- Symbols:
  - Use for unique keys and hidden metadata
  - Retrieve with Object.getOwnPropertySymbols when needed

---

## Part 11 — Common Pitfalls and How to Avoid Them

- Mistaking reference copy for data copy: obj2 = obj1 shares data; use spreads or structuredClone appropriately.
- Using dot notation with invalid keys: "is-premium-member" must use brackets: obj["is-premium-member"].
- Losing this by extracting methods: const fn = obj.method; fn() changes this; bind or call on the original object.
- Using for...in without guarding inherited properties: prefer Object.entries or check with Object.prototype.hasOwnProperty.call(obj, key).
- Deep copying with JSON.stringify/parse: Dates become strings, functions and undefined are lost. Use structuredClone for rich data.
- Expecting structuredClone to preserve class instances or functions: it doesn’t. Consider custom cloning or libraries for such cases.

---

## Part 12 — Quick Reference (Cheat Sheet)

Create:
```js
const obj = { a: 1, "b-c": 2 };
```

Read:
```js
obj.a;           // dot (valid identifier)
obj["b-c"];      // bracket (special chars)
obj[keyVar];     // dynamic
```

Add/Update:
```js
obj.x = 10;      // add/update
```

Delete:
```js
delete obj.x;
```

Method + this:
```js
const o = {
  x: 1,
  inc() { this.x++; }
};
o.inc();
```

Iterate:
```js
for (const [k, v] of Object.entries(obj)) { ... }
```

Shallow copy:
```js
const copy = { ...obj };
// or
const copy2 = Object.assign({}, obj);
```

Deep copy (data):
```js
const deep = structuredClone(obj);
```

Destructure:
```js
const { a, b: bee = 2 } = obj;
const [first, , third] = arr;
```

Computed keys:
```js
const key = "email";
const u = { [key]: "a@b.com" };
```

Symbol keys:
```js
const id = Symbol("id");
obj[id] = 123;
Object.getOwnPropertySymbols(obj); // [id]
```

---

## Part 13 — Practice Exercises

- Create a product object with name, price, and a method discount(percent) that updates price using this.
- Given an object with keys that include hyphens, read them dynamically using a variable list of keys.
- Write a function that takes any object and returns a shallow copy without keys whose values are null.
- Convert an object to an array of “key=value” strings using Object.entries and map.
- Deep clone a nested configuration object using structuredClone and prove mutations don’t leak back.

---

## Part 14 — Real-World Scenarios

- Config management: Start with defaults, override with user settings via spread. Beware shallow vs deep merge if nested.
- API responses: Destructure needed fields out of large payloads for clarity.
- Feature flags/metadata: Store extra flags in Symbols to avoid collisions with API keys.
- State updates (frontend): Create new object copies to keep immutability (helps with change detection), using shallow copy for flat data or structuredClone for nested slices.

---

By internalizing these patterns—creation, access, methods with this, safe iteration, copying depth, ES6+ conveniences, destructuring, and Symbols—object handling in JavaScript becomes predictable, readable, and resilient for both simple scripts and production-scale applications.


## Appendix — How Arrays and Objects Are Stored Under the Hood (Engine View)

- **Arrays as Objects with Elements Backing Store:** JavaScript arrays are specialized objects with an internal "elements backing store," optimized for dense, integer-indexed data. They are not contiguous C arrays from JS’s perspective.
- **Element Kinds & Transitions:** Engines classify array elements by kind (SMI-only, double, object). Adding a non-SMI to an SMI-only array triggers a transition to a more general backing store. Resizing may allocate a new backing store and copy existing values; this is invisible to JS code.
- **SMI vs Heap References:** SMIs (small integers) are stored compactly; non-SMI values (objects, strings, etc.) are stored as pointers to heap objects. Doubles may have dedicated storage to avoid boxing.
- **Hidden Classes (Shapes) for Objects:** Objects use hidden classes (also called shapes) that describe their property layout. Properties may reside inline (in-object slots) or in an out-of-object properties store once inline capacity is exceeded. Objects created or extended in the same order share hidden classes, enabling fast property access via fixed offsets.
- **Dictionary Mode for Dynamic Objects:** When an object undergoes many unpredictable additions/deletions, engines may switch it to dictionary mode (hash-table–like storage), which is slower than hidden-class–based access.
- **Inline Caches (ICs) & Fast Property Access:** Engines accelerate property access with inline caches that record the hidden classes seen at a call site and emit specialized machine code paths (monomorphic/polymorphic ICs), dramatically speeding up repeated property lookups.
- **Engine Internals Are Abstracted:** Concepts like "base address changes," "element pointers," or "map pointers" are internal implementation details. JavaScript code cannot observe or manipulate them. Rely on JavaScript’s high-level semantics; engines handle the optimizations under the hood.
