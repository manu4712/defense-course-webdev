const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = document.querySelector("#name");
  const crushName = document.querySelector("#crush-name");
  const len1 = userName.value.length;
  const len2 = crushName.value.length;
  const res = Math.pow(len1 + len2, 3) % 101;
  const h2 = document.querySelector("h2");
  h2.textContent = `Result:${res}%`;
  form.reset();
});
