const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = document.querySelector("input").value;
  console.log(task);
  if (task == null) {
    return;
  }
  const div = document.createElement("div");
  div.classList.add("sub-task");
  const p = document.createElement("p");
  p.textContent = task;
  const doneBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  doneBtn.textContent = "✔️";
  deleteBtn.textContent = "❌";
  div.append(p, doneBtn, deleteBtn);
  const mainContainer = document.querySelector(".main-tasks-container");
  mainContainer.append(div);

  doneBtn.addEventListener("click", () => {
    p.style.textDecoration = "line-through";
  });
  deleteBtn.addEventListener("click", () => {
    div.remove();
  });

  form.reset();
});
