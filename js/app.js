let allDanceForms = [];
let selectedDanceId = "";
const summaryBox = document.getElementById("summaryBox");

const cancelDelete = document.getElementById("cancelDelete");

const confirmDelete = document.getElementById("confirmDelete");


const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

console.log("NrityaDarpan Loaded");
const danceContainer =
document.getElementById("danceContainer");
fetch(API_URL)
.then(function(response){
    return response.json();
})

.then(function(data){
    allDanceForms = data;
    displayDanceList(allDanceForms);
    displaySummary(allDanceForms);
})

.catch(function(error){
    console.error(error);
});


function displayDanceList(dances){
    danceContainer.innerHTML="";

    dances.map(function(dance){

     danceContainer.innerHTML += `

        <article class="dance-item">

            <img src="assets/${dance.thumbnail}" alt="${dance.name}">

            <div class="dance-info">

                <h2>${dance.name}</h2>

                <p>Origin : ${dance.origin}</p>

                <div class="action-buttons">

                    <button class="view-button" onclick="viewDetails('${dance.id}')">
                    <i class="fa-solid fa-eye"></i>
                        View Details
                    </button>

                    <button class="delete-button" onclick="openDeleteModal('${dance.id}')">
                     <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>

                </div>

            </div>

        </article> `;

    });

}

function displaySummary(dances){
    const total = dances.reduce(function(count){

        return count + 1;

    },0);

    summaryBox.innerHTML = `
        <h3>Total Dance Forms : ${total}</h3>
    `;

}

function viewDetails(id) {

    window.location.href = `dance-details.html?id=${id}`;

}
searchInput.addEventListener("keyup", function(){
    const searchText = searchInput.value.toLowerCase();

    const filteredDance = allDanceForms.filter(function(dance){

    return dance.name.toLowerCase().includes(searchText);

    });

    displayDanceList(filteredDance);
    displaySummary(filteredDance);
    displaySummary(sortedDance);

});
sortSelect.addEventListener("change", function () {

    let sortedDance = [...allDanceForms];

    if (sortSelect.value === "ascending") {

        sortedDance.sort(function (a, b) {

            return a.name.localeCompare(b.name);

        });

    }

    else if (sortSelect.value === "descending") {

        sortedDance.sort(function (a, b) {

            return b.name.localeCompare(a.name);

        });

    }

    displayDanceList(sortedDance);

});

const addDanceForm = document.getElementById("addDanceForm");
const addDanceModal = document.getElementById("addDanceModal");
const addButton = document.getElementById("addButton");

addButton.addEventListener("click", function () {

    addDanceModal.classList.remove("hidden");

});

addDanceForm.addEventListener("submit", function(event){
    event.preventDefault();
    const danceName = document.getElementById("danceName").value;

    const danceOrigin = document.getElementById("danceOrigin").value;

    const danceImage = document.getElementById("danceImage").value;
    if(

    danceName==="" ||

    danceOrigin==="" ||

    danceImage===""

){

    alert("Please fill all the fields.");

    return;
}

    const newDance = {
    name: danceName,
    thumbnail: danceImage,
    origin: danceOrigin,
    description: "New Dance Form",
    difficulty: "Beginner",
    genres: []
};
fetch(API_URL,{

    method:"POST",

    headers:{

        "Content-Type":"application/json"

    },

    body:JSON.stringify(newDance)
})
   
.then(function(response){

    return response.json();

 })
.then(function(data){

    alert("Dance Added Successfully");
     addDanceModal.classList.add("hidden");
   addDanceForm.reset();

    location.reload();

})
.catch(function(error){

    console.log(error);

 })


});
function openDeleteModal(id){
    const modal = document.getElementById("deleteModal");
    console.log(modal);
    modal.classList.remove("hidden");
    modal.style.display = "flex";
    selectedDanceId = id;

}
cancelDelete.addEventListener("click", function(){

    document
        .getElementById("deleteModal")
        .classList.add("hidden");

});

confirmDelete.addEventListener("click", function(){
    console.log("YES clicked");
    console.log(selectedDanceId);
    fetch(API_URL + "/" + selectedDanceId,{
        method:"DELETE"

    })

    .then(function(){

        alert("Dance Form Deleted Successfully");

        document
            .getElementById("deleteModal")
            .classList.add("hidden");

        location.reload();

    })

    .catch(function(error){

        console.log(error);

    });

});
