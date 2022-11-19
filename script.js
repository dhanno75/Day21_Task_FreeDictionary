let url = "https://api.dictionaryapi.dev/api/v2/entries/en";

// Get word details
const btn = document.querySelector(".bttn");
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const word = document.querySelector("#word").value.trim();
    const data = await fetch(`${url}/${word}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const term = await data.json();
    renderWordMeaning(term[0]);
  } catch (err) {
    console.log(err);
  }
});

// Displaying the meaning of the word
const renderWordMeaning = (term) => {
  document.querySelector(".main-container").innerHTML = `
  <div class="sub-container">
    <h2>${term.word}</h2>
    <p class="grammar">${term.meanings[0].partOfSpeech}</p>
    <p class="phonetics">${term.phonetic}</p>
    <p class="meaning"> <mark>${
      term.meanings[0].definitions[0].definition
    }</mark></p>
    <p class="example">Example: ${
      term.meanings[0].definitions[0].example
        ? term.meanings[0].definitions[0].example
        : "No example found"
    }</p>
    <a class='audio' href="${
      term.phonetics[0].audio ? term.phonetics[0].audio : "No audio found"
    }"><i class="bi bi-volume-up"></i></a>
    </div>
  `;
};
// For class with audio and example there is no data populated for some word search because there is no data provided in the api
