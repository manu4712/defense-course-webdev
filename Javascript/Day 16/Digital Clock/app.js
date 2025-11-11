const time = document.querySelector("#time");
setInterval(() => {
  let now = new Date();
  time.textContent = now.toLocaleTimeString();
}, 1000);
