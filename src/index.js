const forForm = document.querySelector("#form");
const forSearch = document.querySelector("#search");
const forResult = document.querySelector("#result");
const forMore = document.querySelector("#more");

const baseURL = "https://api.lyrics.ovh";

async function searchSongs(term) {
    const response = await fetch(`${baseURL}/suggest/${term}`);
    const data = await response.json();
  
    // displayData(data);
  }


  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    more.innerHTML = " ";
  }


// Prevent Default Activity of The Form

forForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
})