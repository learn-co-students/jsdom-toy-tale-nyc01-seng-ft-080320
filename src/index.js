let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const toysUrl = "http://localhost:3000/toys";
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const getToys = () => {
    fetch(toysUrl)
    .then(response => response.json())
    .then(toyCollection => renderToys(toyCollection))
  }

  const renderToys = (toyCollection) => {
    for (const toy of toyCollection) {
      renderToy(toy);
    }
  }

  const renderToy = (toy) => {
    let toyCard = document.createElement("div")
    toyCard.classList.add("card")

    let toyContainer = document.querySelector("#toy-collection")
    toyCard.innerHTML =     
    `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>`
    
    toyContainer.append(toyCard)
  }

  getToys();

});


