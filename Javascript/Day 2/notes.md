# JavaScript Variables & Data Types: Comprehensive Notes

## Variable Declarations in JavaScript: `const`, `let`, and `var`

### 1. `const`

- **Block Scope:** A `const` variable can only be accessed within the block (`{ ... }`) where it is declared.
- **Reassignment:** Not allowed. Once a value is assigned, it cannot be changed. Trying to assign a new value throws a `TypeError`.
- **Initialization:** Mandatory. Must be initialized at the time of declaration. Declaring a `const` without a value results in a `SyntaxError`.
- **Hoisting:** `const` is hoisted but uninitialized, occupying the "Temporal Dead Zone" (TDZ) from the start of the block until its declaration. Accessing it before its declaration causes a `ReferenceError`.
- **Mutability:** Only the reference is constant, not the value. If a `const` holds an object or array, its properties/elements can still be changed.

**Examples:**

```javascript
// Block Scope
if (true) {
  const PI = 3.14159;
}
// console.log(PI); // ReferenceError: PI is not defined

// Reassignment
const GREETING = "Hello";
// GREETING = "Hi"; // TypeError

// Mutability
const CONFIG = { port: 8080 };
CONFIG.port = 3000; // Allowed. CONFIG still refers to the same object.

// Temporal Dead Zone
// console.log(MY_CONST); // ReferenceError
const MY_CONST = 100;
```

---

### 2. `let`

- **Block Scope:** Accessible only within the defining block.
- **Reassignment:** Allowed. You can change its value within its scope.
- **Initialization:** Optional. Declaring `let` without assigning a value sets it to `undefined`.
- **Hoisting:** Hoisted but uninitialized (TDZ applies). Accessing before declaration throws a `ReferenceError`.

**Examples:**

```javascript
// Block Scope
for (let i = 0; i < 3; i++) {
  // i is only visible here
}
// console.log(i); // ReferenceError

// Reassignment
let counter = 0;
counter = 1; // Allowed

// Initialization
let name; // undefined
name = "Alice";

// Temporal Dead Zone
// console.log(myLetVar); // ReferenceError
let myLetVar = "test";
```

---

### 3. `var`

- **Function Scope:** Accessible anywhere in the function it's declared (ignores block scope). If outside any function, it's globally scoped.
- **Reassignment & Redeclaration:** Both are allowed.
- **Initialization:** Optional. Defaults to `undefined` if not assigned.
- **Hoisting:** Declarations are hoisted and initialized to `undefined`. Variable can be accessed before its declaration without error.

**Examples:**

```javascript
// Function/Global Scope
if (true) {
  var leak = "I am visible outside the if-block";
}
console.log(leak); // "I am visible outside the if-block"

// Hoisting
console.log(myVar); // undefined
var myVar = "Hello";
console.log(myVar); // "Hello"

// Redeclaration
var x = 10;
var x = 20; // Allowed, x is now 20
```

---

### Summary Table: Variable Declarations

| Feature        | var           | let           | const           |
|:--------------:|:-------------:|:-------------:|:---------------:|
| **Scope**      | Function      | Block         | Block           |
| **Reassignable**| Yes          | Yes           | No              |
| **Redeclarable**| Yes          | No            | No              |
| **Hoisted Value**| undefined   | TDZ (uninit)  | TDZ (uninit)    |
| **Global Object**| Attaches    | No            | No              |
| **Modern Practice**| Avoid     | Use for reassign| Use as default  |

---

## Data Types in JavaScript

### 1. Primitive Types

Primitives are **fundamental, immutable data types**. Their value cannot be changed; modifications create a new primitive instead. Variables hold the value directly.

#### List of Primitive Types

- **String**
  - Textual data.  
    Syntax: single quotes (`'...'`), double quotes (`"..."`), or backticks (`\`...\`).
  - Example:
    ```javascript
    let name = "Alice";
    let greeting = 'Hello, World!';
    let template = `User: ${name}`; // Template literal
    ```

- **Number**
  - Both integers and floats; no distinction.
  - Special values: `Infinity`, `-Infinity`, `NaN`.
  - Example:
    ```javascript
    let integerValue = 100;
    let floatValue = 3.14;
    let notANumber = NaN; // Invalid math (0 / 0)
    let infinity = Infinity;
    ```

- **Boolean**
  - Logical values: `true` or `false`.
  - Example:
    ```javascript
    let isActive = true;
    let isComplete = false;
    ```

- **undefined**
  - Absence of value—default for declared but uninitialized variables.
  - Example:
    ```javascript
    let user;
    console.log(user); // undefined
    ```

- **null**
  - Intentional absence of any value.
  - Example:
    ```javascript
    let data = null;
    ```

  - **null vs. undefined:**  
    - `undefined` = default when variable is not assigned.  
    - `null` = explicit assignment by developer to indicate "no value".

- **BigInt**
  - Whole numbers larger than Number type's safe integer limit.
  - Syntax: Integer followed by `n` or using `BigInt()`.
  - Example:
    ```javascript
    const veryLargeNumber = 9007199254740991n;
    const anotherBigInt = BigInt(9007199254740992);
    ```

- **Symbol**
  - Unique, anonymous identifiers, used for unique property keys.
  - Created using `Symbol()`.
  - Example:
    ```javascript
    const id1 = Symbol('id');
    const id2 = Symbol('id');
    console.log(id1 === id2); // false (each Symbol is unique)
    ```

---

### 2. Object Type (Non-Primitive)

Objects are mutable **collections of key-value pairs**. Variables store references (memory addresses), not the actual object.

#### Types of Objects

- **Object Literals**
  - Example:
    ```javascript
    let person = {
      firstName: "John",
      lastName: "Doe",
      age: 30
    };
    ```

- **Arrays**
  - Ordered collections.  
    Example:
    ```javascript
    let numbers = [10, 20, 30, 40];
    ```

- **Functions**
  - Functions are objects too.
  - Example:
    ```javascript
    function greet() {
      console.log("Hello");
    }
    ```

- **Other Built-ins**
  - Examples: `Date`, `RegExp`, `Map`, `Set`, etc.

---

### Key Difference: Value vs. Reference

**Primitives**  
- Passed or assigned **by value**—copies the actual value.
- Example:
  ```javascript
  let a = 10;
  let b = a; // value 10 copied to b
  b = 20;    // b changes, a stays 10
  ```

**Objects**  
- Passed or assigned **by reference**—copies the reference (memory address).
- Example:
  ```javascript
  let obj1 = { value: 10 };
  let obj2 = obj1; // reference is copied
  obj2.value = 20; // modifies the object
  // Both obj1 and obj2 show value 20
  ```

---

### The `typeof` Operator

Used to check the data type at runtime.

```javascript
typeof "Hello"      // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof 10n          // "bigint"
typeof Symbol('id') // "symbol"

typeof { a: 1 }     // "object"
typeof [1, 2, 3]    // "object"
typeof function(){} // "function"
typeof null         // "object" (known bug)
```

---

## Summary and Tips

- Prefer `const` for variables by default as a best practice. Use `let` only if reassignment is required. Avoid `var` in modern code.
- Understand **TDZ** for both `let` and `const`; referencing before their declaration throws an error.
- Know how **primitive** and **object** types are managed in memory—value vs. reference assignment is crucial for debugging and writing robust JavaScript.
- Use `typeof` for quick checks, but remember its quirks (like `typeof null` returning "object").

---
