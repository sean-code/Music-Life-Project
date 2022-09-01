// Displaying the Reviews Already On reviewdb.json
const reviews = document.getElementById('feedback-list');
const apiUrl = 'http://localhost:3000/feedback'

function getReviews(id){
    fetch(`${apiUrl}/${id}`)
    .then((response) => response.json())
    .then((data) =>{
        // console.log(data.reviews);
        reviews.innerHTML = data.reviews
    })
}

// Adding Reviews
// const inputName = document.getElementById('input-name');
// const inputReview = document.getElementById('input-review')