//solution-1
// const children = [...document.body.children];
// children.forEach((child) => {
//   child.addEventListener("click", () => {
//     document.body.style.backgroundColor = child.textContent;
//   });
// });

//solution-2
document.body.addEventListener("click", (e) => {
  document.body.style.backgroundColor = e.target.id;
});
