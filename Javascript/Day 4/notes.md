# JavaScript Operators - Lecture 04 Notes

## 1. What is an Operator?

An **operator** is a special symbol or keyword that performs operations on values. The values it works on are called **operands**.

```javascript
// Example: 5 + 10
// '+' is the operator
// '5' and '10' are the operands
// The result is 15
let result = 5 + 10;
```

---

## 2. Assignment Operators

### Basic Assignment
- `=` assigns a value to a variable
```javascript
let score = 100;
```

### Compound Assignment (Shortcuts)
These combine math operations with assignment:

| Operator | Example | Same As |
|----------|---------|---------|
| `+=` | `x += y` | `x = x + y` |
| `-=` | `x -= y` | `x = x - y` |
| `*=` | `x *= y` | `x = x * y` |
| `/=` | `x /= y` | `x = x / y` |
| `%=` | `x %= y` | `x = x % y` |
| `**=` | `x **= y` | `x = x ** y` |

```javascript
let level = 10;
level += 5; // level becomes 15
level *= 2; // level becomes 30
```

---

## 3. Arithmetic Operators

Basic math operations:
- `+` Addition
- `-` Subtraction  
- `*` Multiplication
- `/` Division
- `**` Exponentiation (power): `2 ** 3 = 8`
- `%` Remainder/Modulo: `10 % 3 = 1`

### Increment and Decrement
- `++` increases by 1
- `--` decreases by 1

**Important**: Position matters!
- **Postfix** (`variable++`): Use current value, then increment
- **Prefix** (`++variable`): Increment first, then use new value

```javascript
let postfix = 5;
console.log(postfix++); // Prints 5, then postfix becomes 6

let prefix = 5;
console.log(++prefix); // prefix becomes 6, then prints 6
```

---

## 4. Comparison Operators

Compare values and return `true` or `false`:
- `>` Greater than
- `<` Less than
- `>=` Greater than or equal
- `<=` Less than or equal

### Equality: The Most Important Concept

**Always use strict equality:**
- `===` Strict equality (checks value AND type)
- `!==` Strict inequality

**Avoid loose equality:**
- `==` Loose equality (converts types automatically - confusing!)
- `!=` Loose inequality

```javascript
// Strict (GOOD)
console.log(7 === "7");   // false (number vs string)
console.log(0 === false); // false (number vs boolean)

// Loose (AVOID)
console.log(7 == "7");   // true (converts "7" to number)
console.log(0 == false); // true (converts false to 0)
```

---

## 5. Logical Operators

Combine boolean expressions:

### AND (`&&`)
- Returns `true` only if BOTH sides are true
- **Short-circuiting**: If left side is false, right side isn't checked

```javascript
let user = null;
// Safe: stops at 'user' if it's null
if (user && user.name === "Admin") {
  // This won't crash
}
```

### OR (`||`)
- Returns `true` if EITHER side is true
- **Short-circuiting**: If left side is true, right side isn't checked
- Commonly used for default values

```javascript
let username = "";
let displayName = username || "Guest"; // displayName becomes "Guest"
```

### NOT (`!`)
- Flips the boolean value

```javascript
let isLoggedIn = false;
if (!isLoggedIn) {
  console.log("Please log in.");
}
```

### Truthy and Falsy Values

**6 Falsy Values** (everything else is truthy):
1. `false`
2. `0`
3. `""` (empty string)
4. `null`
5. `undefined`
6. `NaN`

```javascript
// These are all truthy:
Boolean("false");  // true (non-empty string)
Boolean([]);       // true (empty array)
Boolean({});       // true (empty object)
```

---

## 6. Other Important Operators

### typeof
Returns the type of a value as a string:

```javascript
console.log(typeof 42);       // "number"
console.log(typeof "hello");  // "string"
console.log(typeof null);     // "object" (famous bug!)
```

### Ternary Operator (`? :`)
Shorthand for if-else statements:

```javascript
// Syntax: condition ? valueIfTrue : valueIfFalse
let age = 20;
let message = (age >= 18) ? "Can vote" : "Cannot vote yet";
```

---

## 7. Operator Precedence

Some operators execute before others (like math: multiplication before addition).

```javascript
let result = 2 + 3 * 5; // result is 17, not 25
```

**Best Practice**: Use parentheses to make order clear:
```javascript
let result = (2 + 3) * 5; // result is 25 - clear intent
```

---

## 8. Why 0.1 + 0.2 ≠ 0.3

JavaScript uses binary (base-2) to store numbers, but we think in decimal (base-10). Some decimal numbers can't be perfectly represented in binary.

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
```

**Solution**: Use methods like `toFixed()` for display or compare with small tolerance for equality.

---

## 9. Type Conversion

### Converting to String
**Best method**: `String()` function
```javascript
String(123);    // "123"
String(true);   // "true"
String(null);   // "null"
```

### Converting to Number
**Best method**: `Number()` function
```javascript
Number("123");     // 123
Number("  100  "); // 100 (ignores spaces)
Number("hello");   // NaN
Number(true);      // 1
Number(false);     // 0
```

**Alternative**: `parseInt()` and `parseFloat()`
```javascript
parseInt("100px");    // 100 (stops at non-number)
parseFloat("3.14em"); // 3.14
```

**Shortcut**: Unary plus `+`
```javascript
let str = "50";
let num = +str; // 50 (as number)
```

### Converting to Boolean
**Method**: `Boolean()` function

Remember the 6 falsy values - everything else is truthy:
```javascript
Boolean(0);        // false
Boolean("");       // false
Boolean("hello");  // true
Boolean([]);       // true (empty array is truthy!)
```

---

## 10. Comparison Best Practices

### For Equality
1. **Always use `===` and `!==`** (strict)
2. Avoid `==` and `!=` (loose) - they have confusing rules

### For Relational (`<`, `>`, `<=`, `>=`)
- Both strings: Dictionary order comparison
- Otherwise: Both converted to numbers

```javascript
"apple" < "banana"; // true (dictionary order)
"10" < "9";         // true (string comparison)
10 < 9;             // false (number comparison)
```

---

## 11. Control Flow: if-else Statements

Think of it as asking questions in order. The first `true` condition runs its code block, then the rest are skipped.

### Basic if
```javascript
if (temperature > 25) {
  console.log("It's hot! Wear shorts.");
}
```

### if-else
```javascript
if (age >= 18) {
  console.log("You can vote.");
} else {
  console.log("You cannot vote yet.");
}
```

### if-else if-else Chain
```javascript
let score = 85;

if (score >= 90) {
  grade = 'A';
} else if (score >= 80) {
  grade = 'B';
} else if (score >= 70) {
  grade = 'C';
} else if (score >= 60) {
  grade = 'D';
} else {
  grade = 'F';
}
```

---

## 12. Loops

### for Loop
Best when you know how many times to repeat:

```javascript
// Structure: for (initialization; condition; increment)
for (let i = 1; i <= 5; i++) {
  console.log("Repetition number:", i);
}
```

### while Loop
Best when you repeat based on a condition:

```javascript
let health = 10;

while (health > 0) {
  console.log(`Health: ${health}`);
  health -= 3; // Must update variable to avoid infinite loop!
}
```

### do-while Loop
Runs at least once, then checks condition:

```javascript
let userInput;

do {
  userInput = prompt("Type 'yes' to continue:");
} while (userInput !== "yes");
```

---

## Key Takeaways

1. **Use strict equality** (`===`) always
2. **Use parentheses** to make operator precedence clear
3. **Remember the 6 falsy values** - everything else is truthy
4. **Be careful with floating-point math** (0.1 + 0.2 problem)
5. **Use explicit type conversion** (`String()`, `Number()`, `Boolean()`)
6. **Update loop variables** to avoid infinite loops
7. **Understand short-circuiting** in logical operators (`&&`, `||`)

These operators and control structures form the foundation of JavaScript programming!