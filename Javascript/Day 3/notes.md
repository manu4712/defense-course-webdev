# Lecture 03: V8 Engine (Memory Allocation)

## Overview
JavaScript engines, like V8, manage memory using two main regions:
- **Call Stack**: Fixed-size, organized region for function execution and fixed-size data.
- **Heap**: Dynamic-size, less organized region for objects, arrays, and other complex data.

Understanding how and where data is stored helps optimize performance and prevents unexpected behavior.

---

## RAM Architecture
| Unit       | Symbol | Conversion        | In Bytes           |
|------------|--------|-------------------|--------------------|
| **Byte**   | B      | Base unit         | 1 B                |
| **Kilobyte**| KB    | 1 KB = 1024 B     | 2¹⁰ B              |
| **Megabyte**| MB    | 1 MB = 1024 KB    | 2²⁰ B (1,048,576)  |
| **Gigabyte**| GB    | 1 GB = 1024 MB    | 2³⁰ B (1,073,741,824)|
| **Terabyte**| TB    | 1 TB = 1024 GB    | 2⁴⁰ B (≈1.1 trillion)|
| **Petabyte**| PB    | 1 PB = 1024 TB    | 2⁵⁰ B (≈1.13 quadrillion)|
| **Exabyte**| EB    | 1 EB = 1024 PB    | 2⁶⁰ B (≈1.15 quintillion)|
| **Zettabyte**| ZB  | 1 ZB = 1024 EB    | 2⁷⁰ B (≈1.18 sextillion)|
| **Yottabyte**| YB  | 1 YB = 1024 ZB    | 2⁸⁰ B (≈1.21 septillion)|

---

## Memory Regions in V8

1. **Call Stack**
   - Stores function frames and fixed-size data (32-bit slots on a 32-bit system).
   - Fast access, LIFO order.
2. **Heap**
   - Stores dynamic-size data: objects, arrays, strings, and large numbers.
   - Managed by the garbage collector.

---

## Primitive Data Storage

### Numbers (Hybrid Approach)
- **Smi (Small Integer)**
  - 31-bit signed integer stored directly in a 32-bit stack slot.
  - Tagging: last bit = 0 indicates a Smi.
  - Example: `let counter = 100; // Smi stored on stack`

- **HeapNumber**
  - Any non-Smi number (floats or large ints).
  - Stored as a 64-bit value in a heap object.
  - Stack holds a 32-bit pointer with tag bit = 1.
  - Example: `let price = 19.99; // Pointer on stack → HeapNumber`

### Strings
- Always stored on the heap due to variable length.
- Stack holds a pointer to the string object.
- Example: `let name = "Alice"; // Pointer on stack → string data`

### Booleans, null, undefined (Oddball Singletons)
- Single instances created at engine startup in a read-only heap area.
- Stack holds pointers to these singletons rather than recreating values.
- Example: `let isActive = true; // Pointer on stack → global true object`

### Symbols & BigInts
- Always allocated on the heap as objects.
- Stack holds pointers to their heap representations.

---

## Non-Primitive Data (Objects)

- Objects and arrays are fully stored on the heap since their size can change.
- Stack holds a 32-bit pointer to the heap location.
- Example: 
  ```js
  let user = { id: counter }; 
  // `user` on stack → pointer → { id: 10 } on heap
  ```

---

## Memory Layout Example (32-bit System)

```plaintext
[ CALL STACK ]                  [ HEAP ]
(Fixed-size, 32-bit slots)      (Dynamic-size data)

-------------------------      -----------------------------
| user: ptr → 0x50A1 | ----→ | 0x50A1: { id: 10 }           |
|---------------------|      |                             |
| isActive: ptr → 0x0110 | → | 0x0110: [true singleton]    |
|---------------------|      |                             |
| name: ptr → 0x44B2  | ----> | 0x44B2: "Alice" string    |
|---------------------|      |                             |
| price: ptr → 0x33C3 | ----> | 0x33C3: 29.99 HeapNumber    |
|---------------------|      |                             |
| counter: 10 (Smi)   |      |                             |
-------------------------      -----------------------------
```

---

## Why Stack + Heap
- **Consistency**: Stack holds stable pointers for variable names; heap stores dynamic data.
- **Efficiency**: Fast access for fixed-size data (stack); flexibility for dynamic data (heap).
- **Optimization**: Tagged pointers allow rapid type checks and operations.

---

## Garbage Collection
- V8’s garbage collector reclaims memory by identifying unreachable objects in the heap.
- Stack frames are popped automatically when functions return.

---

## Key Takeaways
- V8 optimizes primitive storage: Smis on stack, HeapNumbers and other primitives on heap.
- Variables always reference memory locations, not values directly.
- Understanding this model aids in writing performant JS code.
