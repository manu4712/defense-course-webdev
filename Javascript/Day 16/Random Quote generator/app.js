const quotesArray = [
  "Believe you can and you're halfway there.",
  "Dream big, start small, act now.",
  "Success is not final, failure is not fatal.",
  "Do what you can with what you have.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The best time to start was yesterday. The next best is now.",
  "It always seems impossible until it’s done.",
  "Discipline is stronger than motivation.",
  "Make today count.",
  "Stay hungry, stay foolish.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Push yourself, no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "The secret of getting ahead is getting started.",
  "Focus on progress, not perfection.",
  "Small steps every day lead to big results.",
  "If you get tired, learn to rest, not to quit.",
  "Don’t stop until you’re proud.",
  "Be stronger than your excuses.",
  "Success is the sum of small efforts repeated daily.",
  "Act as if what you do makes a difference. It does.",
  "Your only limit is you.",
  "You don’t have to be great to start.",
  "Stay focused and never give up.",
  "Work hard in silence, let success make the noise.",
  "One day or day one. You decide.",
  "Consistency creates confidence.",
  "Turn your wounds into wisdom.",
  "The harder you work, the luckier you get.",
  "Keep going. Everything you need will come at the right time.",
];

const quoteContainer = document.getElementById("quote-container");

const button = document.getElementById("btn");

button.addEventListener("click", () => {
  quoteContainer.textContent = quotesArray[Math.floor(Math.random() * 30)];
});
