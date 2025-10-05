# Lecture 07: Arrays in JavaScript

---

## Part 1: The Core Concept & Creation

**First Thought:**
An array is a numbered, ordered list of items. Think of it like a list of high scores, a grocery list, or a train with numbered cars. Each item has a specific position.

### A. Creating an Array
- Arrays can be created using square brackets `[]`.

```js
// An empty array (an empty list)
let emptyList = [];

// An array of numbers
let scores = [98, 85, 100, 92];

// An array of strings
let names = ["Alice", "Bob", "Charlie"];

// An array of mixed data types
let mixedData = [10, "hello", true, null];
```

### B. The `.length` Property
- Every array has a `.length` property that shows the total number of items.
- This value updates automatically when items are added or removed.

```js
let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits.length); // 3
```

### C. Accessing and Changing Elements (Zero-Based Indexing)
- Array indices start at 0!
- 1st item → index 0, 2nd item → index 1, etc.

```js
let fruits = ["Apple", "Banana", "Cherry"];
// Index:      0        1         2

// Accessing (reading) an element
console.log(fruits[0]); // "Apple"

// Changing (writing) an element
fruits[1] = "Blueberry";
console.log(fruits); // ["Apple", "Blueberry", "Cherry"]

// Getting the last element
console.log(fruits[fruits.length - 1]); // "Cherry"
```

- Accessing a non-existent index returns `undefined`.

---

## Part 2: Basic Array Modification (Mutating the Array)

### A. Adding/Removing from the END
- `.push(item1, item2, ...)` : Adds items to the end.
- `.pop()` : Removes the last item.

```js
let tasks = ["Wash dishes"];
tasks.push("Do laundry", "Buy groceries");
console.log(tasks); // ["Wash dishes", "Do laundry", "Buy groceries"]

let completedTask = tasks.pop();
console.log(completedTask); // "Buy groceries"
console.log(tasks); // ["Wash dishes", "Do laundry"]
```

### B. Adding/Removing from the BEGINNING
- `.unshift(item1, item2, ...)` : Adds items to the beginning.
- `.shift()` : Removes the first item.

```js
let queue = ["Person B", "Person C"];
queue.unshift("Person A");
console.log(queue); // ["Person A", "Person B", "Person C"]

let firstInLine = queue.shift();
console.log(firstInLine); // "Person A"
console.log(queue); // ["Person B", "Person C"]
```

> Note: `.shift()` and `.unshift()` can be slower on very large arrays.

---

## Part 3: Looping Over an Array (Iteration)

### A. The Classic for Loop
- Uses an index variable for full control.

```js
let scores = [98, 85, 100];
let total = 0;

for (let i = 0; i < scores.length; i++) {
  console.log(`Processing score at index ${i}: ${scores[i]}`);
  total = total + scores[i];
}
console.log(`The total score is: ${total}`); // 283
```

### B. The for...of Loop (Modern, Simple Way)
- Directly processes each value.

```js
let names = ["Alice", "Bob", "Charlie"];
for (const name of names) {
  console.log(`Hello, ${name}!`);
}
```

---

## Part 4: Advanced Array Manipulation

### A. The `splice()` Method (Surgery Tool)
- Add, remove, or replace elements at any position.
- Syntax: `array.splice(startIndex, deleteCount, item1, item2, ...)`

```js
let months = ["Jan", "March", "April", "June"];
// Removing "March"
months.splice(1, 1); // Start at index 1, remove 1 element
console.log(months); // ["Jan", "April", "June"]

// Adding "Feb"
months.splice(1, 0, "Feb"); // Start at index 1, remove 0, add "Feb"
console.log(months); // ["Jan", "Feb", "April", "June"]

// Replacing "April" with "May"
months.splice(2, 1, "May");
console.log(months); // ["Jan", "Feb", "May", "June"]
```

### B. The `slice()` Method (Making a Copy)
- Copies a portion of an array without changing the original.
- Syntax: `array.slice(startIndex, endIndex)` (end index not included)

```js
let animals = ["ant", "bison", "camel", "duck", "elephant"];

// Copy elements from index 2 to (not including) 4
let middleAnimals = animals.slice(2, 4);
console.log(middleAnimals); // ["camel", "duck"]

// Copy from index 2 to the end
let allButFirstTwo = animals.slice(2);
console.log(allButFirstTwo); // ["camel", "duck", "elephant"]

// Make a full copy
let fullCopy = animals.slice();
```

### C. The Spread Operator `...` (Modern Copy/Combine)
- The spread syntax can copy or merge arrays:

```js
const arr1 = ["a", "b"];
const arr2 = ["c", "d"];

// Make a copy
const copyOfArr1 = [...arr1]; // ["a", "b"]
// Combine two arrays
const combined = [...arr1, ...arr2]; // ["a", "b", "c", "d"]
// Add elements in the middle
const withMiddle = [...arr1, "x", "y", ...arr2]; // ["a", "b", "x", "y", "c", "d"]
```

---

## Part 5: Converting and Searching

### A. Array to String Conversion
- `.join(separator)` joins all elements into one string.

```js
const names = ["Alice", "Bob", "Charlie"];
const nameList = names.join(", ");
console.log(nameList); // "Alice, Bob, Charlie"
```

### B. Simple Searching
- `.indexOf(item)` : Index of first occurrence, or -1 if not found.
- `.lastIndexOf(item)` : Index of last occurrence.
- `.includes(item)` : Checks if item exists (returns true/false).

```js
const numbers = [10, 20, 30, 20, 40];

console.log(numbers.indexOf(20));    // 1
console.log(numbers.lastIndexOf(20)); // 3
console.log(numbers.indexOf(99));    // -1
console.log(numbers.includes(30));   // true
console.log(numbers.includes(99));   // false
```

---

## Advanced Array Methods: Sorting, Flattening, and Deleting

### 1. Sorting Arrays: The `.sort()` Method
- By default, `.sort()` turns every element into a string and sorts lexicographically.

**Sorting Strings (Works as Expected):**
```js
let fruits = ["Cherry", "Apple", "Banana"];
fruits.sort();
console.log(fruits); // ["Apple", "Banana", "Cherry"]
```

**Sorting Numbers (Gotcha!):**
```js
let numbers = [100, 2, 5, 25, 1];
numbers.sort();
console.log(numbers); // [1, 100, 2, 25, 5] (Incorrect order for numbers)
```

- Numbers are converted to strings, so "100" comes before "2".

#### B. The Correct Way to Sort Numbers
- Use a compare function: `.sort((a, b) => a - b)`
- If result is:
  - Negative (< 0): a before b
  - Positive (> 0): a after b
  - 0: order remains

```js
let numbers = [100, 2, 5, 25, 1];
// Ascending
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 5, 25, 100]
// Descending
numbers.sort((a, b) => b - a);
console.log(numbers); // [100, 25, 5, 2, 1]
```

### 2. Flattening Arrays: The `.flat()` Method (ES2019)
- Flattens one level deep by default.

```js
const nestedArray = [1, 2, [3, 4]];
const flattened = nestedArray.flat();
console.log(flattened); // [1, 2, 3, 4]
```

- Can flatten deeper with a number argument, or use `Infinity` to fully flatten.

```js
const deeplyNested = [1, [2, [3, [4]]]];
const flatTwoLevels = deeplyNested.flat(2); // [1, 2, 3, [4]]
const completelyFlat = deeplyNested.flat(Infinity); // [1, 2, 3, 4]
```

- `.flat()` also removes empty slots.

### 3. Deleting Elements in an Array

#### Method 1: `.pop()` or `.shift()` (Cleanest Way)
- Removes from end or start; updates length and indices.

#### Method 2: `.splice()` (Most Versatile Way)
- Remove from anywhere and re-indexes array.

```js
let items = ["a", "b", "c", "d"];
items.splice(2, 1); // Removes "c"
console.log(items); // ["a", "b", "d"]
console.log(items.length); // 3
```

#### Method 3: `delete` Operator (AVOID)
- Leaves a "hole" and does **not** update `.length`.

```js
let letters = ["a", "b", "c"];
delete letters[1];
console.log(letters); // ["a", empty, "c"]
console.log(letters[1]); // undefined
console.log(letters.length); // 3
```

- This can lead to bugs and unexpected behaviors. Avoid using `delete` on arrays.

---

## Why is Array Not a "Real" Array in JavaScript?

### The C++ Array: A Row of Houses
- Memory is one solid foundation (continuous, block allocation).
- All elements **must be the same type** (e.g., `int`).
- Indexing is done by **mathematical offset**. Fastest possible way to access.
- No gaps allowed.

### The JavaScript Array: A Wall of P.O. Boxes
- It's **just an object** under the hood, with numbers as keys.
- **Can be sparse**: You can have index 0 and index 1000. There's no need to "build" boxes in between.
- **Heterogeneous:** Can store different types.
- **Access is a property lookup, not a math calculation.**

#### Example:
```js
let jsArray = [];
jsArray[0] = "first item";
jsArray[1000] = "last item";
console.log(jsArray.length); // 1001
console.log(jsArray[500]); // undefined
```

- In C++, this would crash. In JS, it's fine.

#### Heterogeneous Example:
```js
let mixedArray = [10, "hello", true, { id: 1 }];
```

Everything is just a property value tied to a numbered key.

#### Access vs. Object
```js
// Getting item at index 1000
does not use math, it uses
jsArray["1000"] // just like user["name"]
```

### JavaScript Engine Optimizations
- V8 (Chrome/Node) tries to optimize: If array is dense and homogeneous, it stores it like a C++ array for speed.
- **But:** If you make it sparse, add mixed types, or delete from the middle, it "de-optimizes" and goes to the slower object/hash map mode.
  - Triggers: Sparse index, mixed types, deleting from the middle.

#### Summary Table

| Feature                  | True Array (C++)              | JavaScript Array                  |
|--------------------------|-------------------------------|-----------------------------------|
| Underlying Structure     | Contiguous block of memory    | Specialized object (keyed by num) |
| Elements                 | Must be same type (homogeneous)| Can be different types            |
| Memory Layout            | Dense (no gaps)               | Can be sparse (with huge gaps)    |
| Access Method            | Fast math offset calc         | Slower property/key lookup        |

### Final Notes
A JavaScript Array is not a fundamental memory structure like C/C++ arrays. It's a high-level object optimized to behave *like* a list for developer convenience. It has special properties and methods, but is fundamentally an object with tricks and optimizations under the hood.

---

*End of Lecture 07: Arrays in JavaScript*