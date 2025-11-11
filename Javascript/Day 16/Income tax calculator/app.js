const form = document.querySelector("form");
const res = document.querySelector("h2");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const income = Number(document.querySelector("#income").value);
  if (income >= 0 && income <= 1200000) {
    res.textContent = `Total Tax: ${0}`;
  } else if (income > 1200000 && income <= 1600000) {
    res.textContent = `Total Tax: ${(income - 1200000) * (15 / 100)}`;
  } else if (income > 1600000 && income <= 2000000) {
    res.textContent = `Total Tax: ${
      400000 * (15 / 100) + (income - 1600000) * (20 / 100)
    }`;
  } else if (income > 2000000 && income <= 2400000) {
    res.textContent = `Total Tax: ${
      400000 * (15 / 100) +
      400000 * (20 / 100) +
      (income - 2000000) * (25 / 100)
    }`;
  } else {
    res.textContent = `Total Tax: ${
      400000 * (15 / 100) +
      400000 * (20 / 100) +
      400000 * (25 / 100) +
      (income - 2400000) * (30 / 100)
    }`;
  }
  form.reset();
});
