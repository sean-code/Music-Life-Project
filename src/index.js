const forForm = document.querySelector("#form");
const forSearch = document.querySelector("#search");
const forResult = document.querySelector("#result");
const forMore = document.querySelector("#more");


// Prevent Default Activity of The Form

forForm.addEventListener('submit', (event) => {
  event.preventDefault();
})