# Modern JavaScript Array Methods & Data Structures: In-Depth Guide

---

## What are Higher-Order Functions?

Higher-order functions are functions that accept another function as an argument (a "callback" function). This lets you delegate the looping, transforming, or filtering tasks to the array method so you don’t need manual `for` loops. This guide covers essential array methods and data collection objects for modern JavaScript development.

All code examples use this array:
```js
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200, inStock: true },
  { id: 2, name: "Book", category: "Books", price: 30, inStock: true },
  { id: 3, name: "Coffee Maker", category: "Appliances", price: 150, inStock: false },
  { id: 4, name: "Headphones", category: "Electronics", price: 200, inStock: true }
];
```

---

## 1. `.forEach()` — The Simple Looper

- **Purpose:** Execute a function once for each element. Does not return anything.
- **Use Cases:** Logging, updating UI, saving data; you don’t need a new array.

**Syntax:**
```js
array.forEach((element, index) => { /* ... */ });
```

**Example:** Log product names:
```js
console.log("--- Our Products ---");
products.forEach(product => { console.log(`- ${product.name}`); });
```

**Output:**
```
--- Our Products ---
- Laptop
- Book
- Coffee Maker
- Headphones
```

- Does not create a new array
- Cannot `break` or `continue`
- Returns `undefined`

---

## 2. `.map()` — The Transformer

- **Purpose:** Create a new array by transforming each element
- **Use Cases:** Build a new, modified array from existing data

**Syntax:**
```js
const newArray = array.map((element, index) => {
  return /* new value */;
});
```

**Example:** Only product names:
```js
const productNames = products.map(product => product.name);
console.log(productNames); // ["Laptop", "Book", "Coffee Maker", "Headphones"]
// products remains unchanged.
```

- Returns a new array of the same length
- Non-mutating (original array is unchanged)

---

## 3. `.filter()` — The Sieve / Bouncer

- **Purpose:** Create a shorter array of elements passing a condition
- **Use Cases:** Select a subset that matches specific criteria

**Syntax:**
```js
const newArray = array.filter((element, index) => {
  return /* true or false condition */;
});
```

**Example:** In-stock Electronics:
```js
const availableElectronics = products.filter(product =>
  product.inStock === true && product.category === "Electronics"
);
console.log(availableElectronics);
// Returns Laptop & Headphones objects
```

- New array can be shorter than original
- Non-mutating

---

## 4. `.reduce()` — The Accumulator / Snowball

- **Purpose:** "Roll up" the list into a single final value (sum, count, etc.)
- **Use Cases:** Calculate totals, summary values, grouping, etc.

**Syntax:**
```js
const finalValue = array.reduce((accumulator, currentValue, index) => {
  /* ... */
  return newAccumulator;
}, initialValue);
```

- `accumulator`: The running total from previous step
- `currentValue`: The current element
- `initialValue`: Where you start

**Example:** Total price of in-stock items:
```js
const totalStockValue = products.reduce((total, product) => {
  if (product.inStock) {
    return total + product.price;
  }
  return total;
}, 0);
console.log(`Final Total Stock Value: $${totalStockValue}`); // $1430
```

- Can return any value type (number, array, object)
- Non-mutating

---

## 5. Other Essential Array Methods

### `.find()` — Finds First Match
```js
const coffeeMaker = products.find(product => product.name === "Coffee Maker");
console.log(coffeeMaker); // Returns the Coffee Maker object
```
- Stops at the first match; returns `undefined` if not found

### `.some()` — Test if At Least One Match Exists
```js
const hasOutOfStockItems = products.some(product => product.inStock === false);
console.log(hasOutOfStockItems); // true
```
- Returns `true` as soon as one is found

### `.every()` — Test if All Match
```js
const areAllItemsInStock = products.every(product => product.inStock === true);
console.log(areAllItemsInStock); // false
```
- Returns `true` only if all match

---

# Data Collections: Set & Map

## Part 1: The `Set` Object

- Stores **unique** values (no duplicates)
- Best for adding, deleting, and checking existence

**Creating a Set:**
```js
const mySet = new Set();
const numbersArray = [1, 2, 3, 3, 4, 2, 5];
const numbersSet = new Set(numbersArray); // Set: { 1, 2, 3, 4, 5 }
```

**Core Methods:**
- `.add(value)`
- `.has(value)`
- `.delete(value)`
- `.clear()`
```js
const userRoles = new Set();
userRoles.add("editor").add("viewer");
userRoles.add("editor"); // Duplicate ignored
userRoles.delete("viewer");
userRoles.clear();
```

**Property:** `.size` (number of items in Set)

**Iteration:**
```js
for (const permission of permissions) { /* ... */ }
permissions.forEach(/* ... */);
```

**Real-World Uses:**
- **Remove duplicates:**
  ```js
  const uniqueEmails = [...new Set(["a@a.com", "b@b.com", "a@a.com"])] // ["a@a.com", "b@b.com"]
  ```
- **Uniqueness check:**
  ```js
  visitedUsers.has(userId)
  ```

---

## Part 2: The `Map` Object

- Key-value pairs, **keys can be any type** (not just strings)

**Problem with Plain Objects:**
```js
let myObject = {};
let keyObject1 = { id: 1 };
let keyObject2 = { id: 2 };
myObject[keyObject1] = "Value for key 1";
myObject[keyObject2] = "Value for key 2";
// Results: { "[object Object]": "Value for key 2" }
```

**Creating a Map:**
```js
const myMap = new Map();
const userMap = new Map([
  ["name", "Alice"],
  [true, "is verified"],
  [100, "points"]
]);
```

**Core Methods:**
- `.set(key, value)` (chaining possible)
- `.get(key)`
- `.has(key)`
- `.delete(key)`
- `.clear()`

**Property:** `.size` (number of key-value pairs)

**Iteration:**
```js
for (const [key, value] of userMap) { /* ... */ }
userMap.keys() // iterator of keys
userMap.values() // iterator of values
userMap.entries() // iterator of [key, value]
userMap.forEach(/* ... */)
```

**Real-World Uses:**
- Attach metadata to objects without modifying them
- High-performance caching
- "Dictionary" with non-string keys

---

## Part 3: Advanced — `WeakSet` and `WeakMap`

- "Weak" versions only hold **weak references** (doesn’t prevent garbage collection)
- Used for caching or metadata with objects
- Keys/elements **must be objects** (not primitives)
- **Limitations:** Cannot iterate, only `.has()`, `.get()`, `.set()`, `.delete()`

**Use Case:**
If you need to associate data with an object, and want data removed when the object is garbage collected (like when a DOM element is destroyed), use `WeakMap`/`WeakSet`.

---

# When to Use Which:

| Use...    | When you need...                                                |
|-----------|---------------------------------------------------------------|
| Array     | Ordered list, duplicates allowed, index-based access needed    |
| Set       | Unique values, fast existence checks, frequent add/delete      |
| Object    | Fixed, string keys, structure of a single entity (user, item)  |
| Map       | Key-value pairs, keys of any type, insertion order matters     |
| WeakSet/WeakMap | Caching metadata, automatic cleanup, keys must be objects |

---

## Summary
These methods and data structures are the backbone of modern JavaScript for handling collections, transformations, and searching/filtering logic. Understanding their strengths and idioms will make your code clearer, faster, and more maintainable.
