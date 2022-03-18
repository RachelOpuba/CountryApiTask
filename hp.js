"use strict";

const charactersList = document.getElementById("characterList");
const searchBar = document.getElementById("searchBar");
let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});
console.log(charactersList);

const loadCharacters = async () => {
  try {
    const res = await fetch("http://hp-api.herokuapp.com/api/characters");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
    // console.log(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `<li class="character">
        <h2>${character.name}</h2>
        <p> House: ${character.house} </p>
        <img  src="${character.image}"></img>

        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();

console.log(hpCharacters);
