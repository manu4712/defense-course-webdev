# Day 5 – Defence Course: HTML Forms

## Introduction
Forms are one of the most important parts of web development. They allow us to collect information from users and send it to the backend for processing.

---

## Key Concepts

### 1. The `<form>` Element
- All form controls (inputs, labels, selects, buttons) must be enclosed within a `<form>` element.
- It acts as a container to group inputs and manage data submission.

---

### 2. Labels and Inputs
- `<label>` gives context or heading for an input field.
- The `for` attribute of `<label>` connects with the `id` of the input.
  - Example:
    ```
    <label for="email">Email:</label>
    <input type="email" id="email" name="userEmail" />
    ```
  - Clicking the label focuses on the input (good for accessibility).

---

### 3. Input Types
Common types include:
- `text` – free text input
- `email` – validates email format
- `password` – hides typed characters
- `tel` – for phone numbers
- Others: number, date, checkbox, radio, file, etc.

---

### 4. Name Attribute
- **Most important attribute.**
- Acts as the *key* when data is submitted to the backend.
- User’s entry becomes the *value*.
- Example:  
    ```
    <input type="text" name="username" />
    ```
    - Key: username, Value: what user typed.

---

### 5. Value Attribute
- Especially important for radio buttons and checkboxes.
- Without it, the default submission is "on".
- Example:
    ```
    <input type="radio" name="gender" value="male" /> Male
    <input type="radio" name="gender" value="female" /> Female
    ```

---

### 6. Required Attribute
- Makes input mandatory before submitting the form.
- Improves UX by guiding users to fill necessary fields.

---

### 7. Select Dropdown
- `<select>` creates a dropdown list.
- `<option>` defines choices.
- Example:
    ```
    <select name="country">
      <option value="india">India</option>
      <option value="usa">USA</option>
    </select>
    ```

---

### 8. Buttons
Types of buttons:
- `submit` – sends form data
- `reset` – clears inputs
- `button` – does nothing by default (used for custom actions)

---

## Practice Work
- University Registration Form
- Job Application Form

---

## Takeaway
Forms are the gateway for user interaction in applications. Attributes like `name` and `value` are essential to make user data meaningful for the backend.
