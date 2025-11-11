const questionBank = [
  {
    question: "Who is the President of the United States as of 2025?",
    options: ["Joe Biden", "Donald Trump", "Barack Obama", "Kamala Harris"],
    answer: "Donald Trump",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Tokyo", "Beijing", "Osaka"],
    answer: "Tokyo",
  },
  {
    question: "Who developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Nikola Tesla",
      "Galileo Galilei",
    ],
    answer: "Albert Einstein",
  },
  {
    question: "What is the currency of Europe?",
    options: ["Dollar", "Euro", "Pound", "Yen"],
    answer: "Euro",
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Salt", "Hydrogen", "Water", "Oxygen"],
    answer: "Water",
  },
  {
    question: "Which organ pumps blood in the human body?",
    options: ["Liver", "Lungs", "Heart", "Kidney"],
    answer: "Heart",
  },
  {
    question: "Who is known as the Father of the Nation in India?",
    options: [
      "Jawaharlal Nehru",
      "B. R. Ambedkar",
      "Mahatma Gandhi",
      "Sardar Patel",
    ],
    answer: "Mahatma Gandhi",
  },
  {
    question: "Which gas do plants absorb?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Bill Gates", "Steve Jobs", "Elon Musk", "Mark Zuckerberg"],
    answer: "Bill Gates",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Leo Tolstoy",
      "Charles Dickens",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "Which country invented paper?",
    options: ["India", "China", "Greece", "Egypt"],
    answer: "China",
  },
  {
    question: "What is the boiling point of water?",
    options: ["100°C", "50°C", "0°C", "120°C"],
    answer: "100°C",
  },
  {
    question: "Which continent is the Sahara Desert in?",
    options: ["Asia", "Africa", "Australia", "Europe"],
    answer: "Africa",
  },
  {
    question: "Who discovered gravity?",
    options: ["Albert Einstein", "Marie Curie", "Isaac Newton", "Max Planck"],
    answer: "Isaac Newton",
  },
  {
    question: "What is the national animal of India?",
    options: ["Lion", "Elephant", "Tiger", "Peacock"],
    answer: "Tiger",
  },
  {
    question: "What is the smallest prime number?",
    options: ["1", "2", "3", "5"],
    answer: "2",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Pablo Picasso", "Leonardo da Vinci", "Michelangelo", "Van Gogh"],
    answer: "Leonardo da Vinci",
  },
  {
    question: "Which is the largest planet?",
    options: ["Earth", "Jupiter", "Saturn", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "Which language has the most native speakers?",
    options: ["English", "Hindi", "Mandarin Chinese", "Spanish"],
    answer: "Mandarin Chinese",
  },
  {
    question: "What is the freezing point of water?",
    options: ["0°C", "10°C", "100°C", "-10°C"],
    answer: "0°C",
  },
  {
    question: "Who invented the telephone?",
    options: [
      "Alexander Graham Bell",
      "Thomas Edison",
      "Nikola Tesla",
      "James Watt",
    ],
    answer: "Alexander Graham Bell",
  },
  {
    question: "Which country hosted the 2024 Olympics?",
    options: ["Japan", "USA", "France", "China"],
    answer: "France",
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Nile", "Amazon", "Ganga", "Yangtze"],
    answer: "Nile",
  },
  {
    question: "Who is known as the Iron Man of India?",
    options: ["Gandhi", "Sardar Patel", "Tilak", "Subhas Bose"],
    answer: "Sardar Patel",
  },
  {
    question: "Which vitamin is produced by sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    answer: "Vitamin D",
  },
  {
    question: "What is the full form of CPU?",
    options: [
      "Control Process Unit",
      "Central Processing Unit",
      "Central Performance Unit",
      "Computer Processing Unit",
    ],
    answer: "Central Processing Unit",
  },
  {
    question: "Which country gifted the Statue of Liberty?",
    options: ["USA", "France", "UK", "Germany"],
    answer: "France",
  },
  {
    question: "Who is considered the father of computers?",
    options: [
      "Alan Turing",
      "Charles Babbage",
      "John von Neumann",
      "Tim Berners-Lee",
    ],
    answer: "Charles Babbage",
  },
  {
    question: "Which device is used to measure temperature?",
    options: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"],
    answer: "Thermometer",
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra",
  },
  {
    question: "Which country has the most population?",
    options: ["USA", "China", "India", "Russia"],
    answer: "India",
  },
  {
    question: "Who invented the light bulb?",
    options: ["Thomas Edison", "Tesla", "Bell", "Galileo"],
    answer: "Thomas Edison",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Rhino"],
    answer: "Blue Whale",
  },
  {
    question: "Who founded SpaceX?",
    options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Larry Page"],
    answer: "Elon Musk",
  },
  {
    question: "Which continent is called 'Dark Continent'?",
    options: ["Africa", "Asia", "Europe", "South America"],
    answer: "Africa",
  },
  {
    question: "Which metal is liquid at room temperature?",
    options: ["Iron", "Mercury", "Silver", "Copper"],
    answer: "Mercury",
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "Which blood group is universal donor?",
    options: ["A+", "O-", "B+", "AB+"],
    answer: "O-",
  },
  {
    question: "Which planet has rings?",
    options: ["Earth", "Mars", "Venus", "Saturn"],
    answer: "Saturn",
  },
  {
    question: "What is the fastest land animal?",
    options: ["Cheetah", "Tiger", "Horse", "Lion"],
    answer: "Cheetah",
  },
  {
    question: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    answer: "Ottawa",
  },
  {
    question: "What is photosynthesis?",
    options: [
      "Water evaporation",
      "Food making in plants",
      "Blood circulation",
      "Plant respiration",
    ],
    answer: "Food making in plants",
  },
  {
    question: "Which instrument measures earthquakes?",
    options: ["Barometer", "Seismograph", "Thermometer", "Compass"],
    answer: "Seismograph",
  },
  {
    question: "Who invented WWW (World Wide Web)?",
    options: ["Bill Gates", "Tim Berners-Lee", "Linus Torvalds", "Steve Jobs"],
    answer: "Tim Berners-Lee",
  },
  {
    question: "What is the largest bone in the human body?",
    options: ["Skull", "Femur", "Rib", "Tibia"],
    answer: "Femur",
  },
  {
    question: "Which country is called the Land of Rising Sun?",
    options: ["Japan", "China", "India", "Korea"],
    answer: "Japan",
  },
  {
    question: "Which is the smallest continent?",
    options: ["Asia", "Europe", "Australia", "South America"],
    answer: "Australia",
  },
  {
    question: "What is the national game of India (de facto)?",
    options: ["Hockey", "Cricket", "Kabaddi", "Football"],
    answer: "Hockey",
  },
];

const answers = {};

function randomSelection() {
  //method-1 not exactly o(n)
  // const data = new Set();
  // while (data.size != 10) {
  //   const index = Math.floor(Math.random() * 50);
  //   data.add(questionBank[index]);
  // }

  // return [...data];

  //method-2 o(nlogn)
  // questionBank.sort(() => Math.random() - 0.5);
  // return questionBank.slice(0, 10);

  //method-3 o(n) exactly most optimised
  let ans = [];
  let length = questionBank.length;
  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * length);
    ans.push(questionBank[index]);
    [questionBank[index], questionBank[length - 1]] = [
      questionBank[length - 1],
      questionBank[index],
    ];
    length--;
  }
  return ans;
}

const finalQuestions = randomSelection();
const form = document.querySelector("form");

finalQuestions.forEach((ques, index) => {
  answers[`q${index + 1}`] = ques.answer;

  const div = document.createElement("div");
  div.className = "ques-container";

  const p = document.createElement("p");
  p.textContent = `${index + 1}. ${ques.question}`;

  div.appendChild(p);

  optionsArr = ques["options"];
  // console.log(optionsArr);
  optionsArr.forEach((option) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${index + 1}`;
    input.value = option;
    input.required = "true";
    const textnode = document.createTextNode(option);
    label.append(input, textnode);
    div.appendChild(label);
    div.appendChild(document.createElement("br"));
  });

  form.appendChild(div);
});

const btndiv = document.createElement("div");
btndiv.className = "btn-div";
const submitbtn = document.createElement("button");
submitbtn.type = "submit";
submitbtn.textContent = "Submit";
const loadNew = document.createElement("button");
loadNew.type = "button";
loadNew.textContent = "Load New Questions";
btndiv.append(submitbtn, loadNew);

form.appendChild(btndiv);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let i = 0;
  const finalData = new FormData(form);
  for (let [key, value] of finalData.entries()) {
    if (answers[key] === value) {
      i++;
    }
  }
  const resdiv = document.createElement("p");
  resdiv.className = "res";
  resdiv.textContent = `${i} out of ${finalQuestions.length} are correct`;

  form.append(resdiv);

  form.reset();
});

loadNew.addEventListener("click", () => {
  location.reload();
});
