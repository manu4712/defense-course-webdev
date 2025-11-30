//promises in js
let random = Math.floor(Math.random() * 100);
console.log(random);
fetch(`https://api.github.com/users?since=${random}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const p = document.createElement("p");
      img.src = data[i].avatar_url;
      p.textContent = data[i].login;
      div.append(img);
      div.append(p);
      const main = document.getElementsByTagName("main");
      main[0].append(div);
    }
  });
