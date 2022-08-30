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