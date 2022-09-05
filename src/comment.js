// Displaying the Reviews Already On reviewdb.json
const reviews = document.getElementById('feedback-list');
const apiUrl = 'https://pacific-shelf-80927.herokuapp.com/feedback'
const inputReview = document.getElementById('feedback-form')

function getReviews(id){
    fetch(`${apiUrl}/${id}`)
    .then((response) => response.json())
    .then((data) =>{
        // console.log(data.reviews);
        reviews.innerHTML = data.reviews
        .map(
            (reviews) => `<li> 
            ${reviews}
            </li>`
        )
        .join("");
    })
}

// Add Event Listener that enables the loading of the webpage first before execution
document.addEventListener('DOMContentLoaded', () =>{
    getReviews(2);
    getReviews(1);

    // Adding Reviews -to append the existing list
    inputReview.addEventListener('submit', (event) => {
        event.preventDefault();

        reviews.innerHTML += `<li>
        ${document.getElementById('feedback').value}
        </li>`;
    })
})
