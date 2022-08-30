const forForm = document.querySelector("#form");
const forSearch = document.querySelector("#search");
const forResult = document.querySelector("#result");
const forMore = document.querySelector("#more");

const baseURL = "https://api.lyrics.ovh";

async function searchSongs(term) {
    const response = await fetch(`${baseURL}/suggest/${term}`);
    const data = await response.json();
  
    displayData(data);
  }

  function displayData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
        .join("")}
    </ul>
   `;

    if (data.prev || data.next) {
      forMore.innerHTML = `
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
      forMore.innerHTML = " ";

    }
  }

  // Fetching our songs from this server for more options of
  async function findMoreSongs(url) {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await response.json();

    showData(data);
  }

  async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await response.json();

    if (data.error) {
      result.innerHTML = data.error;
    } else {
      const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

      result.innerHTML = `
      <h2><b>${artist}</b> - ${songTitle}</h2>
      <span>${lyrics}</span>
  `;

    }
  forMore.innerHTML = " ";


  }


// Prevent Default Activity of The Form --validate the form

forForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const enteredItem = forSearch.value.trim();

  if (!enteredItem) {
    alert("Kindly Enter Your Search Item");
  } else {
    searchSongs(enteredItem);
  }

});

// Adding the 