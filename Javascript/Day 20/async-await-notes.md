# Lecture 20: Async/Await in JavaScript

## Table of Contents
1. [Introduction](#introduction)
2. [What is Async/Await?](#what-is-asyncawait)
3. [The Basics](#the-basics)
4. [Promises vs Async/Await](#promises-vs-asyncawait)
5. [Error Handling](#error-handling)
6. [Important Rules](#important-rules)
7. [Parallel vs Sequential Execution](#parallel-vs-sequential-execution)
8. [Common Patterns](#common-patterns)
9. [Understanding try/catch with Async/Await](#understanding-trycatch-with-asyncawait)
10. [Real-world Examples](#real-world-examples)
11. [Important Gotchas](#important-gotchas)
12. [Key Takeaways](#key-takeaways)

---

## Introduction

Async/await is one of the most important features in modern JavaScript for handling asynchronous operations. Before diving into async/await, you should be familiar with **Promises** and how JavaScript handles asynchronous code. This guide will help you understand async/await from the ground up, making your asynchronous code cleaner and easier to read.

---

## What is Async/Await?

**Async/await** is a modern JavaScript feature (ES2017) that provides a cleaner and more intuitive way to work with promises. Instead of chaining `.then()` calls (which can lead to "callback hell"), you can write asynchronous code that reads like synchronous code.

### Why Async/Await?

- **Readability**: Code looks more like traditional synchronous code, making it easier to understand
- **Simplicity**: Reduces the need for `.then()` chains
- **Error Handling**: Easier error handling with `try/catch` blocks instead of `.catch()`
- **Maintainability**: Easier to debug and maintain complex asynchronous operations

---

## The Basics

### Understanding async Functions

An `async` function is a function that always returns a **Promise**.

```javascript
async function myFunction() {
  return "Hello";
}

// This is equivalent to:
function myFunction() {
  return Promise.resolve("Hello");
}

// When you call an async function:
myFunction().then(result => {
  console.log(result); // Output: "Hello"
});
```

**Key Point**: No matter what you return from an `async` function, it will be wrapped in a Promise. This is the fundamental concept you need to grasp.

### Understanding await

The `await` keyword pauses the execution of an `async` function until a promise is resolved or rejected.

```javascript
async function fetchData() {
  // This line pauses execution here
  const response = await fetch('https://api.example.com/data');
  
  // Execution continues here only after the fetch promise resolves
  const data = await response.json();
  
  return data;
}
```

**Important**: The `await` keyword:
- Only works inside `async` functions (or at the top level in modules)
- Pauses execution of that specific function, but doesn't block the entire program
- Can only be used with Promises (or values that can be wrapped in Promises)

---

## Promises vs Async/Await

Let's compare the two approaches side by side to understand why async/await is preferred.

### Promise Chain Approach

```javascript
function getUser() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(user => {
      return fetch(`/api/posts/${user.id}`);
    })
    .then(response => response.json())
    .then(posts => {
      console.log(posts);
      return posts;
    })
    .catch(error => console.error(error));
}
```

**Problems with this approach**:
- Multiple `.then()` chains can be hard to read and follow
- Each `.then()` adds another level of nesting (callback hell)
- Error handling is separated at the end with `.catch()`
- Difficult to understand the flow when you have many operations

### Async/Await Approach

```javascript
async function getUser() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();

    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();

    console.log(posts);
    return posts;
  } catch (error) {
    console.error(error);
  }
}
```

**Advantages**:
- Reads like synchronous code, much easier to follow
- Each operation is on its own line (better visual flow)
- Error handling is grouped together in `catch`
- Easier to add additional logic between operations
- Simpler to understand what happens step by step

---

## Error Handling

### Using try/catch Blocks

Error handling with async/await uses `try/catch` blocks, which is much more intuitive than chaining `.catch()` methods.

```javascript
async function riskyOperation() {
  try {
    const result = await mightFail();
    return result;
  } catch (error) {
    // Handle specific errors
    if (error.code === 'NETWORK_ERROR') {
      console.error('Network failed');
    }
    throw error; // Re-throw if needed
  }
}
```

### How try/catch Works

1. **try block**: Contains code that might throw an error
2. **catch block**: Executed if any error occurs in the try block
3. **Error propagation**: You can re-throw errors with `throw error`

### Specific Error Handling

You can handle different types of errors differently:

```javascript
async function handleSpecificErrors() {
  try {
    const data = await fetchSomeData();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Type error occurred:', error.message);
    } else if (error instanceof SyntaxError) {
      console.error('Syntax error in JSON:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
}
```

### Finally Block

You can also use a `finally` block that executes regardless of whether an error occurred:

```javascript
async function operationWithCleanup() {
  try {
    const result = await fetch('/api/data');
    return result;
  } catch (error) {
    console.error('Operation failed:', error);
  } finally {
    console.log('Operation completed (success or failure)');
  }
}
```

---

## Important Rules

Before you start using async/await extensively, understand these critical rules:

### Rule 1: await Only Works Inside async Functions

```javascript
// ✅ CORRECT
async function myFunction() {
  const result = await somePromise();
}

// ❌ INCORRECT - This will throw an error
function myFunction() {
  const result = await somePromise(); // SyntaxError!
}

// ✅ CORRECT - Top-level await (in modules only, ES2022)
const result = await fetch('/api/data');
```

### Rule 2: await Pauses the Function, Not the Program

```javascript
async function demonstration() {
  console.log('Start');
  await delay(2000); // This function pauses for 2 seconds
  console.log('End');  // But this doesn't block other code
}

// Meanwhile, other code runs:
console.log('Other code runs immediately');
demonstration();
console.log('This runs before "End" is logged');
```

### Rule 3: You Can Only await Promises

```javascript
// ✅ CORRECT - awaiting a Promise
const result = await Promise.resolve('Hello');

// ✅ CORRECT - awaiting a value automatically wraps it
const value = await 'Hello'; // Same as Promise.resolve('Hello')

// ❌ INCORRECT - regular values don't need await
const number = await 42; // Works but unnecessary
```

---

## Parallel vs Sequential Execution

Understanding when operations run sequentially vs in parallel is crucial for performance.

### Sequential Execution (Slower)

When you `await` one operation at a time, they happen one after another:

```javascript
async function slowApproach() {
  const user = await fetchUser();      // Wait for this to complete
  const posts = await fetchPosts();    // THEN wait for this
  
  // Total time: time(fetchUser) + time(fetchPosts)
  return { user, posts };
}
```

**When to use**: When the second operation depends on the result of the first.

### Parallel Execution (Faster)

When operations don't depend on each other, start them all at once:

```javascript
async function fastApproach() {
  const [user, posts] = await Promise.all([
    fetchUser(),      // Start immediately
    fetchPosts()      // Start immediately (not waiting for user)
  ]);
  
  // Total time: max(time(fetchUser), time(fetchPosts))
  return { user, posts };
}
```

**When to use**: When operations are independent and can run simultaneously.

### Practical Example

```javascript
async function loadDashboard() {
  // ❌ SLOW: Operations happen one after another
  const user = await getUser();
  const notifications = await getNotifications();
  const stats = await getStats();
  
  // ✅ FAST: All operations happen in parallel
  const [user, notifications, stats] = await Promise.all([
    getUser(),
    getNotifications(),
    getStats()
  ]);
  
  return { user, notifications, stats };
}
```

### Other Parallel Methods

- `Promise.all()`: Wait for ALL promises to resolve (fails if any rejects)
- `Promise.race()`: Return as soon as FIRST promise resolves or rejects
- `Promise.allSettled()`: Wait for all to finish (regardless of success/failure)
- `Promise.any()`: Wait for first SUCCESSFUL promise

```javascript
// Race: Returns first result
const firstToFinish = await Promise.race([
  fetchFromServer1(),
  fetchFromServer2()
]);

// AllSettled: Get all results
const results = await Promise.allSettled([
  fetch1(),
  fetch2(),
  fetch3()
]);
// results will be: [{ status, value/reason }, ...]

// Any: First successful
const successful = await Promise.any([
  tryServer1(),
  tryServer2(),
  tryServer3()
]);
```

---

## Common Patterns

### Pattern 1: Loading Multiple Resources

```javascript
async function loadDashboard() {
  try {
    const [user, notifications, stats] = await Promise.all([
      getUser(),
      getNotifications(),
      getStats()
    ]);

    return { user, notifications, stats };
  } catch (error) {
    console.error('Failed to load dashboard:', error);
    throw error; // Re-throw to let caller handle it
  }
}
```

### Pattern 2: Conditional Operations

```javascript
async function getData(useCache) {
  if (useCache) {
    return getCachedData(); // Doesn't need await if it returns instantly
  }
  return await fetchFreshData();
}
```

### Pattern 3: Retry Logic

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error; // Last attempt failed
      console.log(`Retry attempt ${i + 1}...`);
      await delay(1000 * (i + 1)); // Exponential backoff
    }
  }
}
```

### Pattern 4: Processing Arrays

```javascript
async function processItems(items) {
  // Sequential processing (if each depends on previous)
  for (const item of items) {
    const result = await processItem(item);
    console.log(result);
  }
  
  // Parallel processing (if independent)
  const results = await Promise.all(
    items.map(item => processItem(item))
  );
  return results;
}
```

### Pattern 5: Timeout Wrapper

```javascript
async function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeoutMs)
    )
  ]);
}

// Usage
try {
  const data = await withTimeout(fetchData(), 5000);
} catch (error) {
  console.error('Request timed out or failed:', error);
}
```

---

## Understanding try/catch with Async/Await

The `try/catch` block is essential for handling errors in async code. Let's dive deeper into what gets caught and why.

### What Gets Caught in the catch Block?

The `catch` block handles:

1. **Rejected Promises**: When a promise you `await` rejects
2. **Thrown Errors**: Any error thrown with `throw` inside the try block
3. **Synchronous Errors**: Runtime errors like `TypeError`, `ReferenceError`, etc.

### Example 1: Rejected Promise

```javascript
async function example1() {
  try {
    const result = await Promise.reject(new Error('Promise rejected!'));
  } catch (error) {
    console.log(error.message); // Output: "Promise rejected!"
  }
}
```

When a promise is rejected, the error is caught immediately, and the `catch` block executes.

### Example 2: Thrown Error

```javascript
async function example2() {
  try {
    throw new Error('Something went wrong');
  } catch (error) {
    console.log(error.message); // Output: "Something went wrong"
  }
}
```

When you explicitly throw an error, it's caught by the `catch` block.

### Example 3: Runtime Error (Synchronous)

```javascript
async function example3() {
  try {
    const obj = null;
    console.log(obj.property); // TypeError!
  } catch (error) {
    console.log(error.message); 
    // Output: "Cannot read property 'property' of null"
  }
}
```

Even synchronous errors that occur during the execution of the try block are caught.

### Example 4: JSON Parsing Error

```javascript
async function parseJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error('Invalid JSON:', error.message);
  }
}

parseJSON('{invalid json}'); 
// Output: "Invalid JSON: Unexpected token i in JSON at position 1"
```

---

## Real-world Examples

### Example 1: Fetching User Data from API

```javascript
async function fetchUserProfile(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    // fetch doesn't reject on HTTP errors (404, 500, etc.)
    // So you need to check manually:
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    // This catches:
    // - Network failures (promise rejection from fetch)
    // - The thrown error for bad HTTP status
    // - JSON parsing errors
    console.error('Failed to fetch user:', error);
    return null; // Return default value on error
  }
}

// Usage
const user = await fetchUserProfile(123);
if (user) {
  console.log(user.name);
} else {
  console.log('Could not load user profile');
}
```

### Example 2: Form Submission with Validation

```javascript
async function submitForm(formData) {
  try {
    // Validate data
    if (!formData.email) {
      throw new Error('Email is required');
    }
    
    // Send to server
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Form submitted successfully:', result);
    return result;
  } catch (error) {
    console.error('Form submission failed:', error.message);
    // Show error to user
    displayErrorMessage(error.message);
  }
}
```

### Example 3: Database Operations with Connection Pooling

```javascript
async function getUserWithPosts(userId) {
  let connection;
  try {
    // Get database connection
    connection = await getDBConnection();
    
    // Fetch user
    const user = await connection.query(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Fetch posts in parallel
    const posts = await connection.query(
      'SELECT * FROM posts WHERE user_id = ?',
      [userId]
    );
    
    return { user, posts };
  } catch (error) {
    console.error('Database operation failed:', error);
    throw error;
  } finally {
    // Always release the connection
    if (connection) {
      await connection.release();
    }
  }
}
```

### Example 4: API Integration with Multiple Endpoints

```javascript
async function getUserRecommendations(userId) {
  try {
    // Get user profile
    const userResponse = await fetch(`/api/users/${userId}`);
    if (!userResponse.ok) throw new Error('User not found');
    const user = await userResponse.json();
    
    // Get user's interests
    const interestsResponse = await fetch(`/api/users/${userId}/interests`);
    if (!interestsResponse.ok) throw new Error('Could not fetch interests');
    const interests = await interestsResponse.json();
    
    // Get recommendations based on interests (parallel)
    const recommendationsFetch = interests.map(interest =>
      fetch(`/api/recommendations?interest=${interest}`)
        .then(res => res.json())
    );
    
    const recommendations = await Promise.all(recommendationsFetch);
    
    return {
      user,
      interests,
      recommendations: recommendations.flat()
    };
  } catch (error) {
    console.error('Failed to get recommendations:', error);
    return { user: null, interests: [], recommendations: [] };
  }
}
```

---

## Important Gotchas

### Gotcha 1: fetch() Doesn't Reject on HTTP Errors

This is a common source of confusion:

```javascript
// ❌ WRONG - This does NOT catch 404 errors
async function badFetch(url) {
  try {
    const response = await fetch(url); // fetch doesn't reject on 404!
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error); // Network errors only
  }
}

// ✅ CORRECT - Check response.ok manually
async function goodFetch(url) {
  try {
    const response = await fetch(url);
    
    // Check for HTTP errors manually
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error); // Now catches all errors
  }
}
```

### Gotcha 2: Forgetting to await

```javascript
// ❌ WRONG - Returns a Promise, not the data
async function getData() {
  const data = fetchData(); // Forgot await!
  console.log(data); // Logs Promise object
  return data;
}

// ✅ CORRECT
async function getData() {
  const data = await fetchData();
  console.log(data); // Logs actual data
  return data;
}
```

### Gotcha 3: Sequential vs Parallel Performance

```javascript
// ❌ SLOW - Takes 6 seconds (2+2+2)
async function slowLoad() {
  const data1 = await fetch1(); // 2 seconds
  const data2 = await fetch2(); // 2 seconds
  const data3 = await fetch3(); // 2 seconds
  return { data1, data2, data3 };
}

// ✅ FAST - Takes 2 seconds (runs in parallel)
async function fastLoad() {
  const [data1, data2, data3] = await Promise.all([
    fetch1(),
    fetch2(),
    fetch3()
  ]);
  return { data1, data2, data3 };
}
```

### Gotcha 4: Unhandled Promise Rejections

```javascript
// ❌ BAD - No error handling
async function riskyOperation() {
  const result = await somethingThatMightFail();
  return result; // If it fails, you'll get an unhandled rejection
}

// ✅ GOOD - Proper error handling
async function safeOperation() {
  try {
    const result = await somethingThatMightFail();
    return result;
  } catch (error) {
    console.error('Operation failed:', error);
    return null; // Return safe default
  }
}
```

### Gotcha 5: Using async in Event Handlers

```javascript
// ❌ PROBLEMATIC - Event handler isn't awaited
document.getElementById('btn').addEventListener('click', async (e) => {
  const data = await fetchData();
  // If this throws, it's an unhandled rejection
});

// ✅ BETTER - Proper error handling
document.getElementById('btn').addEventListener('click', async (e) => {
  try {
    const data = await fetchData();
    updateUI(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    showErrorMessage('Failed to load data');
  }
});
```

---

## Key Takeaways

1. **async Functions Always Return Promises**: No matter what you return, it gets wrapped in a Promise.

2. **await Pauses Execution**: The `await` keyword pauses the async function until the promise resolves, but doesn't block the entire program.

3. **Use try/catch for Error Handling**: Much cleaner than `.catch()` chains. The catch block catches rejected promises, thrown errors, and synchronous errors.

4. **Readability is Key**: Async/await makes asynchronous code read like synchronous code, making it much easier to understand and maintain.

5. **Beware of Sequential Execution**: Using multiple awaits in a row can be slow if the operations are independent. Use `Promise.all()` to run them in parallel.

6. **fetch() Gotcha**: `fetch()` doesn't reject on HTTP error statuses. Always check `response.ok` manually.

7. **Only await in async Functions**: You can only use `await` inside an async function (or at top-level in modules).

8. **Error Handling is Essential**: Always wrap async operations in try/catch blocks to handle potential errors gracefully.

9. **Use finally for Cleanup**: Use finally blocks to ensure cleanup code runs regardless of success or failure.

10. **Test Your Code**: Async code can be tricky. Always test error cases and make sure your error handling works as expected.

---

## Practice Exercises

Try to implement these to solidify your understanding:

1. Create a function that fetches data from three different APIs and combines the results (use Promise.all).

2. Implement a retry function that attempts an operation up to 3 times before giving up.

3. Create a function that fetches a user and their posts, handling errors at each step.

4. Build a search function that debounces input and fetches results asynchronously.

5. Create a function that processes an array of items concurrently with a maximum of 3 concurrent operations.

---

## Additional Resources

- MDN Documentation on async/await: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
- JavaScript.info on Async/Await: https://javascript.info/async-await
- Practice problems on Codewars and LeetCode

---

**Happy Learning!** Remember, async/await becomes second nature with practice. Start with simple examples and gradually move to more complex scenarios. Don't hesitate to experiment and make mistakes—that's how you learn!
