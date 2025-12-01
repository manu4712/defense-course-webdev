async function getGitUsers() {
  try {
    let random = Math.floor(Math.random() * 100);

    const users = await fetch(`https://api.github.com/users?since=${random}`);
    if (!users.ok) {
      throw new Error("Data is not present");
    }
    const usersJsonData = await users.json();

    for (let i = 0; i < usersJsonData.length; i++) {
      const mainDiv = document.createElement("div");
      mainDiv.className = "mainContainer";
      const childDiv = document.createElement("div");
      childDiv.className = "childContainer";
      const img = document.createElement("img");
      const Name = document.createElement("p");
      Name.className = "profileName";
      const linkContainer = document.createElement("div");
      linkContainer.className = "link";
      const link = document.createElement("a");

      img.src = usersJsonData[i].avatar_url;
      Name.textContent = usersJsonData[i].login;
      link.href = usersJsonData[i].html_url;
      link.textContent = "Visit Profile";
      link.target = "_blank";
      childDiv.append(img);
      linkContainer.append(link);
      mainDiv.append(childDiv, Name, linkContainer);

      const main = document.querySelector("#parent");
      main.append(mainDiv);
    }
  } catch (err) {
    console.log("Error:", err);
  }
}

getGitUsers();
