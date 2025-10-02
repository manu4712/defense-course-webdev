# JavaScript Strings and Date Object — Detailed Notes

## 1. Introduction to Strings
A **string** is a primitive data type in JavaScript representing a sequence of characters. It can include letters, numbers, punctuation, and symbols—making it the main way to store and manipulate textual data in your programs.

**Key Characteristics of Strings:**
- **Primitive:** Strings are immutable, meaning you cannot modify them in place.
- **Indexed:** Each character has a numeric position starting at 0.
- **Object-like:** Despite being primitive, strings have built-in methods and properties (like `.length`). When you use these, JavaScript temporarily wraps the value in a String object.

---

## 2. Creating Strings
There are three ways to create string literals in JavaScript:

**Single Quotes ('...'):**
```javascript
let singleQuoted = 'Hello, world!';
```

**Double Quotes ("..."):**
Functionally the same, but convenient when you want to include the opposite quote inside the string.
```javascript
let doubleQuoted = "He said, 'Hello!'";
let singleQuotedWithDouble = 'She replied, "Hi!"';
```

**Template Literals (backticks \`\` - ES6):**
Most powerful, enabling string interpolation and multi-line strings.
```javascript
let templateLiteral = `This is a template literal.`;
```

---

## 3. Core Properties and Concepts

### A. `.length` Property
The `.length` property shows how many characters are present in a string.
```javascript
let greeting = "Hello";
console.log(greeting.length); // 5

let emptyString = "";
console.log(emptyString.length); // 0
```

### B. Accessing Characters (Zero-Based Indexing)
Access characters using square brackets:
```javascript
let message = "JavaScript";
console.log(message[0]); // "J"
console.log(message[4]); // "S"
console.log(message[message.length - 1]); // "t" (last character)
```

### C. Immutability of Strings
Strings cannot be changed in-place. Any modification returns a new string—original stays the same.
```javascript
let name = "alex";
name[0] = "A"; // Does nothing
console.log(name); // "alex"

let upperName = name.toUpperCase();
console.log(upperName); // "ALEX"
console.log(name); // Still "alex"
```

---

## 4. Essential String Methods
All string methods return new strings.

### A. Changing Case
- `.toUpperCase()`: All characters to uppercase
- `.toLowerCase()`: All characters to lowercase

```javascript
let whisper = "please be quiet";
let shout = whisper.toUpperCase(); // "PLEASE BE QUIET"
```

### B. Searching Substrings
- `.indexOf(substring)`: Index of first occurrence; -1 if not found
- `.lastIndexOf(substring)`: Index of last occurrence; -1 if not found
- `.includes(substring)`: Returns `true` if substring is found

```javascript
let sentence = "The quick brown fox jumps over the lazy fox.";
console.log(sentence.indexOf("fox"));     // 16
console.log(sentence.lastIndexOf("fox")); // 40
console.log(sentence.indexOf("cat"));     // -1
console.log(sentence.includes("jumps"));  // true
console.log(sentence.includes("cat"));    // false
```

### C. Extracting Substrings
- `.slice(start, end)`: Extracts section (end not included). Supports negative indices.
- `.substring(start, end)`: Similar to `.slice()`, but no negative indices.
- `.substr(start, length)`: **Deprecated**. Avoid using.

```javascript
let text = "JavaScript";
console.log(text.slice(0, 4));   // "Java"
console.log(text.slice(4));      // "Script"
console.log(text.slice(-6));     // "Script"
console.log(text.substring(2,5)); // "vaS"
```

### D. Replacing Substrings
- `.replace(searchValue, newValue)`: Replaces the first occurrence
- `.replaceAll(searchValue, newValue)`: Replaces all occurrences

```javascript
let greeting = "hello world, hello there";
let newGreeting = greeting.replace("hello", "hi"); // "hi world, hello there"
let allNewGreeting = greeting.replaceAll("hello", "hi"); // "hi world, hi there"
```

**Old global replace:** Use Regex: `greeting.replace(/hello/g, "hi")`

### E. Trimming Whitespace
- `.trim()`: Trims whitespace from both ends
- `.trimStart()` / `.trimEnd()`: Start or end only

```javascript
let userInput = "   user@example.com   ";
console.log(userInput.trim()); // "user@example.com"
```

### F. Splitting Strings
- `.split(separator)`: Splits string into array

```javascript
let csvData = "item1,item2,item3";
console.log(csvData.split(",")); // ["item1", "item2", "item3"]
let words = "The quick brown fox";
console.log(words.split(" ")); // ["The", "quick", "brown", "fox"]
let letters = "abc";
console.log(letters.split("")); // ["a", "b", "c"]
```

---

## 5. Template Literals (ES6)

### A. Variable Interpolation
Embed variables or expressions using ${...}.
```javascript
let name = "Alice";
let age = 30;
let message = `Hello, my name is ${name} and I am ${age} years old.`;
let futureMessage = `Next year, I will be ${age + 1}.`;
```

### B. Multi-line Strings
Template literals can include line breaks directly.

```javascript
let html = `
  <div>
    <p>Hello</p>
  </div>
`;
```

---

# The JavaScript Date Object

## 1. Core Concept: A Single Moment in Time
The Date object encapsulates a single moment—represented as the *number of milliseconds* since the Unix Epoch (Jan 1, 1970, UTC).

**Why?** This makes calculation and comparison of dates easy.

---

## 2. Creating Date Objects

### A. Current Moment
```javascript
const now = new Date(); // Current date and time
```

### B. From a Timestamp
Timestamps are milliseconds since the Unix Epoch (1970-01-01 UTC).
```javascript
const ts = Date.now(); // Current timestamp as a number
const da = new Date(ts); // Makes a Date from timestamp
```

### C. Specific Date and Time (Recommended)
Specify components: year, month (0-indexed!), date, hour, minute, second, ms.
```javascript
const myDate = new Date(2025, 8, 4, 6, 20, 11, 125); // 4 Sep 2025, 06:20:11.125 local time
console.log(myDate.toString());
```
**CRITICAL GOTCHA: Months are zero-indexed!**
- 0 = January
- ...
- 8 = September

---

## 3. Getting Information (Getters)
Extract date components with methods (local timezone):
```javascript
const now = new Date();
console.log(now.getFullYear()); // 2025
console.log(now.getMonth());    // 8 (September)
console.log(now.getDate());     // 4 (day of month)
console.log(now.getDay());      // 4 (0=Sunday...6=Saturday)
console.log(now.getHours());    // e.g., 6
console.log(now.getMinutes());  // e.g., 20
```

---

## 4. Changing a Date (Setters & Mutability)
Date objects are mutable—you can change them in place.
```javascript
const da = new Date(1759262295036);
da.setMonth(4); // Sets month to May (index 4)
console.log(da); // The 'da' object is modified
```

---

## 5. Date Auto-Correction (Rollover)
JS Date will "auto-correct" impossible dates:
```javascript
const a = new Date(2025, 1, 30); // Feb 30th, 2025
console.log(a); // Mar 2, 2025 (auto-corrected)
```

Helpful for date math (e.g., adding days), but can cause sneaky bugs!

---

## 6. String Formatting for Display
Date objects must be formatted to be human-friendly:
- `.toString()`: Complete string (local time)
- `.toDateString()`: Date only (local)
- `.toISOString()`: Universal UTC string (great for servers or databases)
- `.toLocaleString()`: User's regional settings — best for user display

```javascript
const now = new Date();
console.log(now.toString());      // e.g., Mon Oct 28 2024 04:15:00 GMT+0530 (India Standard Time)
console.log(now.toDateString());  // e.g., Mon Oct 28 2024
console.log(now.toISOString());   // e.g., 2024-10-27T22:45:00.000Z
console.log(now.toLocaleString());// e.g., 28/10/2024, 4:15:00 am (India)
```

---

## 7. Critical Gotchas and Problems with Date

1. **Months are 0-indexed:** January is 0, December is 11! This causes confusion and bugs.
  ```javascript
  new Date(2025, 0, 1);   // Jan 1, 2025
  new Date(2025, 11, 25); // Dec 25, 2025
  ```
2. **Date objects are mutable:** Setters change the original object, which can lead to unintended side effects.

3. **Weird auto-correction:**
  ```javascript
  new Date(2025, 1, 30); // Becomes March 2, 2025
  new Date('2025-02-30'); // Invalid Date!
  ```

4. **Inconsistencies:**
  ```javascript
  new Date(2025, 0); // Jan 1, 2025 (Month only)
  new Date(2025);    // Jan 1, 1970 + 2025 ms!
  ```

---

## 8. Fixing JS Dates: Modern Libraries and Upcoming Features

Due to these quirks, many developers use libraries:
- **Day.js:** Lightweight (2KB) and easy API
- **date-fns:** Modular and functional approach
- **Luxon:** Powerful, supports time zones
- **Temporal API (Upcoming):**
  - Modern built-in, fixes all core issues
  - Immutable, reliable, and much easier to use!
  ```javascript
  const date = Temporal.PlainDate.from('2025-10-01');
  date.add({ days: 3 }); // Returns new date, original unchanged
  date.toString(); // '2025-10-01'
  ```

---

## Key Takeaways
- Strings are indexed, immutable primitives with helpful methods.
- Dates are mutable objects representing a UTC-based timestamp.
- **Dates have many quirks** (months = 0, auto-corrections, mutability), so read the docs and prefer modern libraries or the Temporal API for advanced work.
