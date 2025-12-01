async function callDog() {
  const dogPromise = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await dogPromise.json();
  const img = document.querySelector("div img");
  img.src = data.message;
}

const button = document.querySelector("button");
button.addEventListener("click", () => {
  callDog();
});
