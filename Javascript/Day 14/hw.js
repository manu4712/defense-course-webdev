let arr = ["paneer", "milk", "tofu","king","fish"];

const body = document.body;

const ulElement = document.createElement("ul");

body.append(ulElement);

// let fragment = document.createDocumentFragment();
let fragment = [];

arr.forEach((item) => {
  let temp = document.createElement("li");
  temp.textContent = item;
  fragment.push(temp);
});


ulElement.append(...fragment);