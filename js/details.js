const API_URL = "https://6a52425b78ecba6073e29234.mockapi.io/dances";
const parameters = new URLSearchParams(window.location.search);

const danceId = parameters.get("id");

console.log(danceId);
fetch(API_URL + "/" + danceId)

.then(function(response){

    return response.json();

})

.then(function(dance){

    document.getElementById("detailsContainer").innerHTML = `
    

    <div class="details-card">

        <img src="assets/${dance.thumbnail}" alt="${dance.name}">

        <h1>${dance.name}</h1>

        <h3><i class="fa-solid fa-location-dot"></i> Origin : ${dance.origin}</h3>

        <p>${dance.description}</p>

        <h4> <i class="fa-solid fa-signal"></i> Difficulty : ${dance.difficulty}</h4>
        <h3> <i class="fa-solid fa-tags"></i> Dance Genres</h3>

        <ul id="genreList">

        </ul>

    </div>
    `;
    const genreList = document.getElementById("genreList");

    dance.genres.map(function(genre){

        genreList.innerHTML += `
            <li>${genre}</li>
        `;

    });

})

.catch(function(error){

    console.log(error);

});
document.getElementById("backButton").addEventListener("click", function () {

    window.location.href = "index.html";

});