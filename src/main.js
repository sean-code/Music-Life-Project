const forForm = document.querySelector("#form");
const forSearch = document.querySelector("#search");
const forResult = document.querySelector("#result");
const forMore = document.querySelector("#more");

const baseUrl = "https://api.lyrics.ovh";
async function searchSongs(term) {
    const response = await fetch(`${baseUrl}/suggest/${term}`);
    const data = await response.json();
  
    displayData(data);
  }

  function displayData(data) {
    forResult.innerHTML = `
    <ul class= "songs">
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
  

// Create Navigating Buttons For the Previous and Next Search Results to Get Us More Search Results
    if (data.prev || data.next) {
      forMore.innerHTML = `
        ${
          data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">PREVIOUS</button>`
            : ""
        }
        ${
          data.next
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">NEXT</button>`
            : ""
        }
      `;
    } else {
      forMore.innerHTML = "";
    }
  }

  // Fetching our songs from this server for more options of
  async function getMoreSongs(url) {
    const response = await fetch(`https://echo.hoppscotch.io/${url}`);
    const data = await response.json();

    displayData(data);
  }

  async function getLyrics(artist, songTitle){
    const response = await fetch(`${baseUrl}/v1/${artist}/${songTitle}`);
    const data = await response.json();

    if (data.error) {
      forResult.innerHTML = data.error;
    } else {
      const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

      forResult.innerHTML = `
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

// Adding the click event listener for getting the lyrics
forResult.addEventListener('click', (event) => {
  const clickedResult = event.target;

  if (clickedResult.tagName === "BUTTON") {
    const artist = clickedResult.getAttribute("data.artist");
    const songTitle = clickedResult.getAttribute("data.songTitle");

    getLyrics(artist, songTitle);
  }
});
