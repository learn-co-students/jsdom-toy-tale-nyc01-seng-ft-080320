let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      renderToys(json)
    })

    const renderToys = (data) => {
      // console.log(typeof(data))
      for (const toy of data) {
        const toyDiv = document.querySelector("#toy-collection")
        const newDiv = document.createElement("div")
        newDiv.classList.add("card")
        newDiv.innerHTML = `
          <h2 data-id = ${toy.id}>${toy.name}</h2>
          <img class="toy-avatar" src="${toy.image}"/>
          <p> ${toy.likes} </p>
          <button class="like-btn"/> Like 💗 </button>
        `
        toyDiv.appendChild(newDiv)
      }
    }


    //once create new toy button is clicked will have an event listner and get the users input
    
    const newToyForm = document.querySelector(".add-toy-form")
    newToyForm.addEventListener('submit', event => {
      //event.preventDefault()
      const form = event.target;
      const name = form['name'].value;
      const image = form['image'].value;
      const likes = '0'

      createToy(name, image, likes)
    })
    //that will run below code with their inputs
    

    function createToy(name, image, likes) {
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          image: image,
          likes: likes
          })
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          renderToys(object)
        })
    };
    
    // document.querySelectorAll(#like-btn)

    const toyDiv = document.querySelector('#toy-collection')
      toyDiv.addEventListener('click', event => {
          if (event.target.matches(".like-btn")) {
              const likeButton = event.target
              const cardDiv = likeButton.parentElement
              const tagName = cardDiv.querySelector("p")
              const newLikes = parseInt(tagName.innerText) + 1
              const header = cardDiv.querySelector('h2')
              const id = header.dataset.id
                  
              fetch(`http://localhost:3000/toys/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                  body: JSON.stringify({
                    likes: newLikes,
                  })
              })
              .then(function(response) {
                return response.json();
              })
              .then(function(object) {
                //const newLikes = tagName.innerText ++
                //console.log(newLikes)
                tagName.textContent = object.likes
              })
            
            
          }
      })

    


    
});

