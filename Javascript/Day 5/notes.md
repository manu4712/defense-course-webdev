# JavaScript Numbers and Math Object - Complete Guide

## Table of Contents
1. [Number Methods](#number-methods)
2. [Number Objects vs Primitives](#number-objects-vs-primitives)
3. [Math Object](#math-object)
4. [Random Number Generation](#random-number-generation)
5. [Practical Examples](#practical-examples)

---

## Number Methods

### `.toFixed(digits)` Method

The `toFixed()` method formats a number to a **fixed number of decimal places** and returns a **string**.

**Syntax:**
```javascript
number.toFixed(digits)
```

**Parameters:**
- `digits`: Number of digits after the decimal point (0-100)

**Example:**
```javascript
let num = 1256.4567;
let res1 = num.toFixed(2);
console.log(res1); // "1256.46" (string)

// Practical use cases
let price = 19.991234;
console.log(price.toFixed(2)); // "19.99" - Perfect for currency formatting
```

**Key Points:**
- Returns a **string**, not a number
- Rounds the number to the specified decimal places
- Commonly used for currency and price formatting

### `.toPrecision(digits)` Method

The `toPrecision()` method formats a number to a **specified total number of significant digits** and returns a **string**.

**Syntax:**
```javascript
number.toPrecision(digits)
```

**Parameters:**
- `digits`: Total number of significant digits (1-21)

**Example:**
```javascript
let num = 1256.4567;
let res2 = num.toPrecision(2);
console.log(res2); // "1.3e+3" (exponential notation)

let n = 123.456;
console.log(n.toPrecision(4)); // "123.5" (4 significant digits)
console.log(n.toPrecision(6)); // "123.456" (6 significant digits)
```

**Key Points:**
- Returns a **string**, not a number
- Counts **total significant digits**, not decimal places
- May use exponential notation for very large or small precision values

---

## Number Objects vs Primitives

### Creating Numbers as Objects (Not Recommended)

```javascript
// Creating number as object using 'new' keyword
let num2 = new Number(75);
let num3 = new Number(75);

// Comparison with objects compares REFERENCES, not values
console.log(num2 == num3); // false (different memory references)
console.log(num2 === num3); // false (different memory references)
```

### Creating Numbers as Primitives (Recommended)

```javascript
// Creating numbers normally (primitive values)
let num4 = 75;
let num5 = 75;

// Comparison with primitives compares VALUES
console.log(num4 == num5); // true (same value)
console.log(num4 === num5); // true (same value and type)
```

**Why Avoid Number Objects:**
- Objects are compared by reference, not value
- Unnecessary memory overhead
- Can cause unexpected behavior in comparisons
- Primitive numbers are sufficient for most use cases

---

## Math Object

The `Math` object provides mathematical constants and functions. It's **not a constructor** - you use it directly.

### Mathematical Constants

```javascript
console.log(Math.PI);    // 3.141592653589793
console.log(Math.E);     // 2.718281828459045 (Euler's number)
console.log(Math.SQRT2); // 1.4142135623730951 (Square root of 2)
console.log(Math.LN10);  // 2.302585092994046 (Natural log of 10)
```

### Rounding Methods

```javascript
let number = 9.7654;

// Math.floor() - Always rounds DOWN to nearest integer
console.log(Math.floor(9.9999)); // 9
console.log(Math.floor(-2.1));   // -3

// Math.ceil() - Always rounds UP to nearest integer
console.log(Math.ceil(9.0001));  // 10
console.log(Math.ceil(-2.9));    // -2

// Math.round() - Standard rounding to nearest integer
console.log(Math.round(9.4999)); // 9
console.log(Math.round(9.5));    // 10

// Math.trunc() - Removes decimal part (truncates toward zero)
console.log(Math.trunc(9.9));    // 9
console.log(Math.trunc(-9.9));   // -9
```

### Other Useful Math Methods

```javascript
// Finding maximum and minimum values
console.log(Math.max(489, 789, 689)); // 789
console.log(Math.min(489, 789, 689)); // 489

// Other common functions
console.log(Math.abs(-5));        // 5 (absolute value)
console.log(Math.pow(2, 3));      // 8 (2 to the power of 3)
console.log(Math.sqrt(16));       // 4 (square root)
```

---

## Random Number Generation

### Understanding `Math.random()`

`Math.random()` is JavaScript's core randomness function:
- Returns a **floating-point number**
- Range: `[0, 1)` - includes 0, excludes 1
- Can return `0`, `0.1234`, `0.5`, `0.99999`, but **never** `1.0`

```javascript
console.log(Math.random()); // e.g., 0.7834529834759832
```

### The Universal Formula for Random Integers

To generate a random integer between `min` and `max` (inclusive):

```javascript
Math.floor(Math.random() * (max - min + 1)) + min
```

### Building the Formula Step-by-Step

Let's understand how to generate a random integer from 1 to 10:

#### Step 1: Scale Up the Range
```javascript
// We want 10 possible outcomes: 1,2,3,4,5,6,7,8,9,10
// Number of outcomes = max - min + 1 = 10 - 1 + 1 = 10
Math.random() * 10; // Range: [0, 10)
```

#### Step 2: Remove Decimals
```javascript
// Math.floor() rounds down to nearest integer
Math.floor(Math.random() * 10); // Range: [0, 9] (integers)
```

#### Step 3: Shift to Correct Range
```javascript
// Add minimum value to shift range from [0,9] to [1,10]
Math.floor(Math.random() * 10) + 1; // Range: [1, 10] (integers)
```

### Practical Examples

#### Dice Roll (1-6)
```javascript
console.log(Math.floor(Math.random() * (6 - 1 + 1) + 1));
// Simplified: Math.floor(Math.random() * 6) + 1
```

#### Random Number (15-25)
```javascript
console.log(Math.floor(Math.random() * (25 - 15 + 1) + 15));
// Simplified: Math.floor(Math.random() * 11) + 15
```

#### Generate 4-Digit OTP (1000-9999)
```javascript
// Method 1: Using the formula
console.log(Math.floor(Math.random() * (9999 - 1000 + 1) + 1000));

// Method 2: Alternative approach
console.log(Math.floor(Math.random() * 9000) + 1000);
// 9000 possible numbers (9999-1000+1), offset by 1000
```

---

## Practical Examples

### Reusable Random Integer Function

```javascript
/**
 * Generates a random integer between min and max (inclusive)
 * @param {number} min - The minimum possible value
 * @param {number} max - The maximum possible value
 * @returns {number} A random integer within the range
 */
function getRandomInt(min, max) {
    // 1. Calculate the number of possible outcomes
    const range = max - min + 1;
    
    // 2. Scale up Math.random() to create float in range [0, range)
    const scaled = Math.random() * range;
    
    // 3. Round down to get integer in range [0, range-1]
    const floored = Math.floor(scaled);
    
    // 4. Shift range to [min, max] by adding minimum
    const result = floored + min;
    
    return result;
}

// Usage examples
console.log("Random 1-10:", getRandomInt(1, 10));
console.log("Random 50-100:", getRandomInt(50, 100));
console.log("Dice roll:", getRandomInt(1, 6));
```

### Real-World Applications

#### Currency Formatting
```javascript
function formatCurrency(amount) {
    return "$" + amount.toFixed(2);
}

let price = 29.567;
console.log(formatCurrency(price)); // "$29.57"
```

#### Scientific Notation
```javascript
function formatScientific(number, precision) {
    return number.toPrecision(precision);
}

let largeNumber = 123456789;
console.log(formatScientific(largeNumber, 3)); // "1.23e+8"
```

#### Random Color Generator
```javascript
function getRandomColor() {
    const r = getRandomInt(0, 255);
    const g = getRandomInt(0, 255);
    const b = getRandomInt(0, 255);
    return `rgb(${r}, ${g}, ${b})`;
}

console.log(getRandomColor()); // e.g., "rgb(142, 68, 201)"
```

---

## Key Takeaways

1. **Number Methods:**
   - Use `.toFixed()` for consistent decimal places (currency formatting)
   - Use `.toPrecision()` for significant digits control
   - Both return strings, not numbers

2. **Number Creation:**
   - Always use primitive numbers (`let num = 75`)
   - Avoid Number objects (`new Number(75)`) due to reference comparison issues

3. **Math Object:**
   - Provides constants (`Math.PI`, `Math.E`) and utility functions
   - Rounding: `floor()`, `ceil()`, `round()`, `trunc()`
   - Use `Math.max()` and `Math.min()` for finding extremes

4. **Random Numbers:**
   - `Math.random()` returns `[0, 1)` range
   - Universal formula: `Math.floor(Math.random() * (max - min + 1)) + min`
   - Always use `Math.floor()` to convert to integers

5. **Best Practices:**
   - Create reusable functions for common operations
   - Understand the difference between value and reference comparisons
   - Use appropriate methods based on your formatting needs