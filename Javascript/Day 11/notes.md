# Lecture 11 Notes: Scope and Closures in JavaScript

## Main Takeaway
Understanding **scope** and **closures** is fundamental for mastering JavaScript. Scope controls variable visibility and accessibility, while closures allow functions to "remember" variables from their birth context, creating powerful private features and callback mechanisms.

---

## Part 1: Scope – What Can See What?

### What is Scope?
**Scope** refers to the visibility and accessibility of variables. It answers the question: "From where can I access this variable?"
Think of scope like different rooms in a house:
- Variables declared in a room are accessible only within that room.
- You can look out from inner rooms to outer rooms.
- You cannot look in from outer rooms to inner rooms.

### The Three Types of Scope

#### 1. Global Scope (The House Itself)
- Variables declared outside any function or block.
```javascript
const globalVar = "I'm global";
function someFunction() {
  console.log(globalVar); // ✅ Can access
}
someFunction();           // "I'm global"
console.log(globalVar);   // ✅ Can access from anywhere
```
**Real-world analogy:** Like the air outside—everyone can access it.

#### 2. Function Scope (A Room)
- Variables declared inside a function are only accessible inside that function.
```javascript
function myFunction() {
  const functionVar = "I'm in the function";
  console.log(functionVar); // ✅ Works
}
myFunction();               // "I'm in the function"
console.log(functionVar);   // ❌ ReferenceError: functionVar is not defined
```
**Key point:**
- `var`, `let`, and `const` are all function-scoped, but `let` / `const` are also block-scoped.

#### 3. Block Scope (A Closet in a Room)
- Variables declared with `let` or `const` inside `{}` are block-scoped.
```javascript
if (true) {
  let blockVar = "I'm in a block";
  const alsoBlockVar = "Me too";
  var notBlockScoped = "I'm different!";
  console.log(blockVar);    // ✅ Works
}
console.log(blockVar);      // ❌ ReferenceError
console.log(alsoBlockVar);  // ❌ ReferenceError
console.log(notBlockScoped);// ✅ Works! (var ignores block scope)
```
**Important:**
- `var` is NOT block-scoped, only function-scoped!

Example:
```javascript
function testVar() {
  if (true) {
    var x = 10;
  }
  console.log(x);  // ✅ 10 (var leaks out of block!)
}

function testLet() {
  if (true) {
    let y = 10;
  }
  console.log(y);  // ❌ ReferenceError (let is block-scoped)
}
```

### Lexical Scope (The Key Concept!)
- Scope is determined by **where you write the code**, NOT where you call it.
```javascript
const name = "Global";
function outer() {
  const name = "Outer";
  function inner() {
    const name = "Inner";
    console.log(name); // Which "name" will this print?
  }
  inner();
}
outer(); // "Inner"
```
#### Why "Inner"?
JavaScript looks for variables in this order:
- Current scope (inner function)
- If not found, check outer scope (outer function)
- If not found, check global scope
- If still not found – ReferenceError

**This is called the Scope Chain.**

### The Scope Chain in Action
```javascript
const level1 = "Global";
function outer() {
  const level2 = "Outer";
  function middle() {
    const level3 = "Middle";
    function inner() {
      const level4 = "Inner";
      console.log(level4); // "Inner"
      console.log(level3); // "Middle"
      console.log(level2); // "Outer"
      console.log(level1); // "Global"
    }
    inner();
  }
  middle();
}
outer();
```
**Visual representation:**
- `inner()` scope ↓ (can look up)
- `middle()` scope ↓ (can look up)
- `outer()` scope ↓ (can look up)
- Global scope

But you **cannot** look down:
```javascript
function outer() {
  function inner() {
    const secret = "Hidden";
  }
  inner();
  console.log(secret); // ❌ ReferenceError (can't look INTO inner function)
}
```

---

## Part 2: CLOSURES – Functions Remember Their Birthplace

### What is a Closure?
A **closure** is a function that "remembers" variables from its outer scope—even after the outer function has finished executing.

This is one of the most important concepts in JavaScript!

#### Basic Closure Example
```javascript
function outer() {
  const message = "Hello";
  function inner() {
    console.log(message); // Accesses outer's variable
  }
  return inner; // Return the function
}
const myFunction = outer(); // outer() finishes executing
myFunction(); // "Hello" – inner still knows "message"
```
What just happened?
- `outer()` runs and creates `message`
- `inner()` is defined INSIDE `outer()` – it "closes over" `message`
- `outer()` returns `inner` and finishes
- Normally, `message` would be garbage collected, BUT
- `inner` still has a reference to `message` – **this is a closure!**

#### Why Closures Exist
- **Without closures:** Functions would only access their own variables and globals.
- **With closures:** Functions can "carry" their environment with them!

#### Example: Private Variables
Closures enable truly private variables:
```javascript
function createCounter() {
  let count = 0; // Private variable
  return function() {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// "count" is NEVER directly accessible!
console.log(count); // ❌ ReferenceError
```
Key insight: `count` lives on even though `createCounter()` finished!
The returned function "closes over" it.

#### Real-World Example: Private Bank Account
Closures let you create truly private variables:
```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // PRIVATE
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (amount > balance) {
        return "Insufficient funds";
      }
      balance -= amount;
      return balance;
    },
    getBalance: function() {
      return balance;
    }
  };
}
const myAccount = createBankAccount(100);
console.log(myAccount.getBalance()); // 100
myAccount.deposit(50); // 150
myAccount.withdraw(30); // 120
console.log(myAccount.balance); // undefined
myAccount.balance = 9999999; // Doesn't affect real balance!
console.log(myAccount.getBalance()); // 120 - still protected
```
**Why this works:** All three methods (`deposit`, `withdraw`, `getBalance`) are closures that remember the `balance` variable.

---

## Higher-Order Functions in JavaScript

### Simplest Definition
- A **higher-order function** is any function that either:
  - Takes a function as an argument **OR**
  - Returns a function as a result

That's it!

### Why "Higher-Order"?
- Think hierarchy:
  - Regular values → numbers, strings, booleans
  - First-order functions → functions that work with regular values
  - Higher-order functions → functions that work with other functions
- In JavaScript, functions are **first-class citizens**. They can be passed around, returned, and stored in variables.

### Type 1: Functions That Take Functions as Arguments

#### Example 1: Array Methods
```javascript
const numbers = [1, 2, 3, 4, 5];
// map is a higher-order function, takes function as argument
const doubled = numbers.map(function(num) {
  return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]
```
**Why is `map` higher-order?** Because it accepts a function as a parameter.

#### Example 2: Custom Higher-Order Function
```javascript
// repeat is a higher-order function
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}
// Using it:
repeat(3, function(i) {
  console.log("Iteration " + i);
});
// Output:
// Iteration 0
// Iteration 1
// Iteration 2
```

---

# Summary
- **Scope** controls visibility and accessibility: global, function, and block.
- **Lexical scope** means code location determines variable access, not where it's called.
- **Closures** allow functions to retain access to their birth environment, critical for private variables and callbacks.
- **Higher-order functions** work with other functions, and are central to modern JavaScript programming.

Refer back to these notes for implications on bug fixing, design decisions, and managing variable access in JavaScript applications.