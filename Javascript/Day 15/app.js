const parent = document.getElementById("parent");
// const children = [...parent.children];
// console.log(children);
// children.forEach((ele) => {
//   ele.addEventListener("click", () => {
//     ele.textContent = "I am clicked";
//   });
// });

//can be done using event bubbling --> this is efficient as it is only adding event listner on parent.
parent.addEventListener("click", (e) => {
  e.target.textContent = "I am clicked";
});
