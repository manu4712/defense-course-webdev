const body = document.querySelector("body");

body.addEventListener("click", (e) => {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  const greetings = [
    "Hello", // English
    "Hola", // Spanish
    "Bonjour", // French
    "Ciao", // Italian
    "Hallo", // German
    "Namaste", // Hindi
    "Salaam", // Arabic
    "Zdravstvuyte", // Russian
    "Nǐ hǎo", // Chinese (Mandarin)
    "Konnichiwa", // Japanese
    "Annyeong", // Korean
    "Merhaba", // Turkish
    "Olá", // Portuguese
    "Sawasdee", // Thai
    "Selamat", // Indonesian/Malay
    "Shalom", // Hebrew
    "Jambo", // Swahili
    "God dag", // Norwegian
    "Hei", // Finnish
    "Aloha", // Hawaiian
  ];
  bubble.textContent = greetings[Math.floor(Math.random() * 20)];
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A8",
    "#33FFF3",
    "#FFC300",
    "#DAF7A6",
    "#C70039",
    "#900C3F",
    "#581845",
    "#1ABC9C",
    "#2ECC71",
    "#3498DB",
    "#9B59B6",
    "#E67E22",
    "#E74C3C",
    "#F1C40F",
    "#7F8C8D",
    "#34495E",
    "#16A085",
  ];
  bubble.style.backgroundColor = colors[Math.floor(Math.random() * 20)];
  bubble.style.top = `${e.clientY - 25}px`;
  bubble.style.left = `${e.clientX - 25}px`;
  body.append(bubble);
  setTimeout(() => {
    bubble.remove();
  }, 5000);
});
