// Displaying the Reviews Already On reviewdb.json
const reviews = document.getElementById('feedback-list');
const apiUrl = 'http://localhost:3000/feedback'
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
    getReviews(1);
    getReviews(2);

    // Adding Reviews -to append the existing list
    inputReview.addEventListener('submit', (event) => {
        event.preventDefault();

        reviews.innerHTML += `<li>
        ${document.getElementById('feedback').value}
        </li>`;
    })
})
