let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const toysUrl = "http://localhost:3000/toys/";
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
    toyCard.dataset.id = `${toy.id}`

    let toyContainer = document.querySelector("#toy-collection")
    toyCard.innerHTML =     
    `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" data-id=${toy.id}>Like <3</button>`
    
    toyContainer.append(toyCard)
  }


  const submitHandler = () => {
    document.addEventListener("submit", (e) => {
      e.preventDefault();
      let form = e.target;
      let toyName = form["name"].value;
      let toyImage = form.image.value;
      // createToyObj(toyName, toyImage);

      const toyObj = {
        name: toyName,
        image: toyImage,
        likes: 0
      }

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(toyObj)
      }

      fetch(toysUrl, options)
      .then(response => response.json())
      .then(toyData => renderToy(toyData))

      form.reset();


    })
  }

  const clickHandler = () => {
    document.addEventListener("click", (e) => {
      if(e.target.matches(".like-btn")) {
        let button = e.target;
        let pTag = button.previousElementSibling;
        let likes = pTag.textContent.split(" ")[0]
        let toyId = e.target.dataset.id;
        let newLikes = parseInt(likes) + 1;

        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({likes: newLikes})
        }

        fetch(toysUrl+toyId, options)
        .then(response => response.json())
        .then(toy => updateToyLikes(toy))
      }
    })
  }

  const updateToyLikes = (toy) => {
    let toyId = toy.id;
    let toyCard = document.querySelector(`[data-id="${toyId}"]`);
    let pTag = toyCard.querySelector("p");
    pTag.textContent = `${toy.likes} Likes`;
  }



  getToys();
  submitHandler();
  clickHandler();
});


