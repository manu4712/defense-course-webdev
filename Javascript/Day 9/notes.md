# JavaScript Functions: Easy But Detailed Notes

## What Is a Function?
A **function** is like a reusable "code machine" or a recipe for completing a specific task. For example, if you need to make a sandwich repeatedly, you don’t write instructions each time—instead, you define a function called "Make Sandwich." The **recipe** is the function, the **ingredients** are the parameters, and the finished sandwich is the **return value**.

### Why Use Functions? The DRY Principle
**DRY** stands for "Don't Repeat Yourself." Functions allow you to write a chunk of logic once and reuse it as many times as you like.

---

## Three Core Parts of a Function
- **Declaration**: Writing the recipe and giving the function a name.
- **Calling/Invocation**: Using the recipe by executing the function.
- **Parameters & Return Value**: Passing data into a function and getting a result.

---

## Basic Syntax & Example
```javascript
// 1. DECLARATION let’s define a function
function greet(name) {
    const message = `Hello, ${name}!`;
    return message; // Returns the final result
}

// 2. CALLING: Using the recipe with an argument
const greetingForAlice = greet("Alice");
console.log(greetingForAlice); // Output: Hello, Alice!
const greetingForBob = greet("Bob");
console.log(greetingForBob); // Output: Hello, Bob!
```

**Parameter:** Variable name inside parentheses (`name`).
**Argument:** Actual value you pass when calling the function (`"Alice"`).
**Return value:** The value function gives back (if `return` is used).

---

## Function Without Return Value
```javascript
function addNumbers(num1, num2) {
    const sum = num1 + num2;
    console.log(sum);
}
addNumbers(5, 5); // Output: 10
// This function doesn't use return, so if we do
console.log(addNumbers(2, 3));   // Output: 5 and "undefined"
```

## Function With Return Value
```javascript
function addNumbers2(num1, num2) {
    return num1 + num2;
}
console.log(addNumbers2(2, 3)); // Output: 5
```

---

## Functions With Infinite Arguments (Rest Operator)
Sometimes you don’t know how many arguments will be passed. Use the **rest operator** (`...`) to gather arguments into an array.

```javascript
function addNumbers3(...nums) {
    let sum = 0;
    for (let val of nums) {
        sum += val;
    }
    return sum;
}
console.log(addNumbers3(4, 5, 6, 8, 4, 2, 5)); // Output: 34
console.log(addNumbers3(4));                    // Output: 4
```

---

## Rest vs Spread Operator
Rest and Spread both use `...` but do opposite things.

### Rest Operator
Collects multiple values into one array.
```javascript
let arr = [1, 2, 3, 4, 5, 6];
const [firstVal, secondVal, ...remVal] = arr; // rest operator
console.log(firstVal, secondVal, remVal); // 1, 2, [3,4,5,6]
```

### Spread Operator
Expands array/object into separate values.
```javascript
let arr2 = [7, 8, 9, 10];
let arr3 = [...arr, ...arr2]; // spread operator
console.log(arr3); // [1,2,3,4,5,6,7,8,9,10]
```

---

## Types of Functions in JavaScript
### 1. Function Declaration (Classic Way)
Function declarations are **hoisted**—you can use the function before its definition.
```javascript
console.log(add(2, 3)); // Output: 5
function add(a, b) {
      return a + b;
}
```

### 2. Function Expression
Created anonymously and assigned to a variable. **Not hoisted**.
```javascript
const subtract = function(a, b) {
    return a - b;
};
console.log(subtract(10, 5)); // Output: 5
```
Try calling `subtract` before this definition—it throws ReferenceError!

### 3. Arrow Function (Modern Way)
Concise, clean syntax. Popular in modern JavaScript.
```javascript
// Function expression
const multiply = function(a, b) {
    return a * b;
};
// Arrow function equivalent
const multiplyArrow = (a, b) => a * b;
```

#### Arrow Function Syntax
- **Implicit Return:** No `{}` or `return` needed for one-line functions.
```javascript
const multiplyShort = (a, b) => a * b;  // Returns a * b automatically
```
- **Single Parameter:** Parentheses optional if only one parameter.
```javascript
const square = x => x * x;
```
- **Returning Object Literals:** Wrap objects in parentheses.
```javascript
const createUser = name => ({ name: name });
console.log(createUser("Alice")); // { name: "Alice" }
```

---

## Immediate Invoked Function Expression (IIFE)
A function that runs immediately after it’s defined. Syntax: `(() => { ... })()`
```javascript
((name) => {
    console.log(`my name is ${name}`);
})("manoj"); // Output: my name is manoj
```

---

## Advanced Parameters
### Default Parameters
You can set a default value if none is passed.
```javascript
function greet(name = "Guest") {
    console.log(`Hello, ${name}!`);
}
greet("Alice");        // Output: Hello, Alice!
greet();               // Output: Hello, Guest!
```

### Rest Parameters in Function Definition
```javascript
function sumAll(...numbers) {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}
console.log(sumAll(1,2,3,4,5)); // Output: 15
```
- Rest must be last parameter.

---

## Spread Operator in Arrays and Objects
### Arrays
```javascript
const numbers = [1,2,3];
console.log(...numbers); // Output: 1 2 3
```
Use spread to combine/copy arrays or pass elements as function arguments.

### Objects
```javascript
const person = {name: "Alice", age: 25};
const updatedPerson = { ...person, city: "NYC" };
console.log(updatedPerson); // { name: "Alice", age: 25, city: "NYC" }
```

---

## Difference: Rest vs Spread
| Operator | Purpose           | Example                                                                   |
|----------|-------------------|---------------------------------------------------------------------------|
| Rest     | Collects elements | `function sum(...nums) {}` — nums is array of all arguments                |
| Spread   | Expands elements  | `[...arr1, ...arr2]` — combines contents of both arrays                    |


---

## Callback Functions
A **callback function** is a function passed as an argument to another function—allows code to run after an operation is complete.

### Analogy: Pizza Order
- Order a pizza (call the function)
- Give your number (callback function)
- Pizza ready, pizza shop uses your number (callback executed)

### Example
```javascript
// Callback functionunction pickUpPizza() {
    console.log("Pizza is ready! Driving to the store to pick it up.");
}
function orderPizza(callback) {
    console.log("Placing the pizza order...");
    console.log("Pizza is cooked!");
    callback();
}
orderPizza(pickUpPizza);
console.log("I'm not waiting at the store. I'm at home, coding.");
```
---

## More Callback Examples
```javascript
function greet() {
    console.log("hello guys,how are you?");
}
function meet(callback) {
    callback();
    console.log("let's meet at a hotel today?");
}
meet(greet);
```

### Real-World Example with Arguments
```javascript
function zomatoOrder() {
    console.log("Your food is being prepared.");
}
function blinkitOrder() {
    console.log('Your items are being packed.');
}
function payment(amount, callback) {
    console.log(`Payment initialized for ${amount}`);
    console.log("payment successfully received");
    callback(); // Make it flexible with callback
}
payment(500, zomatoOrder);
payment(800, blinkitOrder);
```

---

# Summary
- **Functions** are reusable blocks of code.
- Use the **rest operator** to handle unlimited arguments.
- Use the **spread operator** to expand arrays/objects.
- Choose between **function declarations**, **expressions**, and **arrow functions** based on your needs.
- **Callback functions** allow more flexible and asynchronous code logic.


