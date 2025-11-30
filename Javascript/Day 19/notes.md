# **Lecture 19: Promises in JavaScript & JSON**

## **Part 1: The Promise Object**

### **What is a Promise?**

The Promise object represents the **eventual completion (or failure)** of an asynchronous operation and its resulting value.

**First Principle:** A Promise is a **Placeholder**. It represents a future value that isn't available yet but will be.

### **Core Characteristics**

1. **It is an Object:** You can store it in a variable.  
2. **Future Value:** Holds the place of data coming later (like an API response).  
3. **Stateful:** It changes state over time.  
4. **One-time Use:** Once settled (finished), it never changes again.

### **Promise States**

A Promise can be in exactly **ONE** of three states at any time.

┌─────────────────────────────────────────┐  
│           PROMISE STATES                │  
└─────────────────────────────────────────┘

1\. PENDING (Initial state)  
   ↓  
   "I'm working on it..."  
   ↓  
   ├── Success → 2\. FULFILLED (Resolved)  
   │             "I got the result\!"  
   │  
   └── Failure → 3\. REJECTED  
                 "Something went wrong\!"

* **Pending:** The initial state (operation is in progress).  
* **Fulfilled (Resolved):** Operation completed successfully.  
* **Rejected:** Operation failed.  
* **Settled:** The promise is final (either Fulfilled or Rejected).

**Key Rule:** A promise can only settle **ONCE**.

const promise \= new Promise((resolve, reject) \=\> {  
    resolve("Done");      // State becomes FULFILLED  
    reject("Error");      // ❌ Ignored\! Already settled.  
    resolve("Again");     // ❌ Ignored\!  
});

## **Part 2: Creating Promises**

### **Syntax**

const myPromise \= new Promise((resolve, reject) \=\> {  
    // Executor function runs IMMEDIATELY  
      
    // logic here...  
      
    if (success) {  
        resolve(value); // Transitions to FULFILLED  
    } else {  
        reject(error);  // Transitions to REJECTED  
    }  
});

### **Examples**

**1\. Simulating an API Call**

function fetchUserData(userId) {  
    return new Promise((resolve, reject) \=\> {  
        console.log(\`Fetching user ${userId}...\`);

        setTimeout(() \=\> {  
            // Simulate success  
            const user \= { id: userId, name: "John Doe" };  
            resolve(user);  
        }, 2000);  
    });  
}

**2\. Error Handling Logic**

function divideNumbers(a, b) {  
    return new Promise((resolve, reject) \=\> {  
        if (b \=== 0\) {  
            reject("Cannot divide by zero\!");  
        } else {  
            resolve(a / b);  
        }  
    });  
}

## **Part 3: Consuming Promises**

Once a promise is created, we use methods to handle the result.

### **The Three Methods**

1. **.then(result \=\> ...)**: Runs when the promise is **Fulfilled**.  
2. **.catch(error \=\> ...)**: Runs when the promise is **Rejected**.  
3. **.finally(() \=\> ...)**: Runs **ALWAYS** (when settled), regardless of success or failure.

### **Complete Consumption Pattern**

fetchData()  
    .then((result) \=\> {  
        console.log("✅ Success:", result);  
    })  
    .catch((error) \=\> {  
        console.error("❌ Error:", error);  
    })  
    .finally(() \=\> {  
        console.log("⏹️ Request completed (cleanup here)");  
    });

## **Part 4: Promise Chaining**

Promises allow us to perform sequential async operations without "callback hell."

**First Principle of Chaining:** The .then() method returns a **new Promise**. Whatever you return inside a .then() becomes the input for the *next* .then().

### **Chaining Example**

step1()  
    .then((result1) \=\> {  
        console.log("Step 1 done");  
        return step2(result1); // Return a new promise/value  
    })  
    .then((result2) \=\> {  
        console.log("Step 2 done");  
        return step3(result2);  
    })  
    .then((finalResult) \=\> {  
        console.log("All steps done:", finalResult);  
    })  
    .catch((error) \=\> {  
        // Catches errors from ANY step in the chain  
        console.error("Something failed:", error);  
    });

## **Part 5: The .finally() Method**

Used for **cleanup code**.

**Common Use Cases:**

* Hiding loading spinners.  
* Closing database connections.  
* Re-enabling buttons.

**Key Rules:**

1. **No Arguments:** .finally() does not receive the result or the error.  
2. **Transparent:** It does not change the value of the promise (unless it throws an error).  
3. **Error Propagation:** If code inside .finally() throws an error, that error takes over.

## **Part 6: JSON vs. JavaScript Objects**

### **Quick Comparison**

* **JavaScript Object:** Native data structure.  
* **JSON (JavaScript Object Notation):** A string/text format used for data exchange between systems.

### **Difference Table**

| Feature | JavaScript Object | JSON |  
| Type | Data Structure | String (Text) |  
| Keys | Can be unquoted (name: "John") | Must use double quotes ("name": "John") |  
| Strings | Single ' or double " quotes | Only double quotes " |  
| Functions | ✅ Allowed | ❌ Not allowed |  
| Undefined | ✅ Allowed | ❌ Not allowed |  
| Comments | ✅ Allowed | ❌ Not allowed |  
| Trailing Comma | ✅ Allowed | ❌ Not allowed |

### **Visual Code Comparison**

**JavaScript Object**

const jsObject \= {  
  name: "John",        // No quotes needed on key  
  age: 30,  
  greet: function() { console.log("Hi"); }, // Functions allowed  
  data: undefined      // Undefined allowed  
};

**JSON**

{  
  "name": "John",  
  "age": 30  
}

*(Note: No functions, no undefined, keys must have quotes)*

### **Conversion Methods**

1\. JS Object → JSON String  
Used when sending data to a server.  
const user \= { name: "John", age: 30 };  
const jsonString \= JSON.stringify(user);  
// Result: '{"name":"John","age":30}'

2\. JSON String → JS Object  
Used when receiving data from a server.  
const jsonString \= '{"name":"John","age":30}';  
const user \= JSON.parse(jsonString);  
// Result: { name: 'John', age: 30 }

### **Why fetch().json()?**

When you fetch data from an API, the server sends raw text (JSON string).

1. fetch gets the response.  
2. response.json() takes that text.  
3. It runs JSON.parse() internally.  
4. It returns a Promise that resolves to a usable **JavaScript Object**.