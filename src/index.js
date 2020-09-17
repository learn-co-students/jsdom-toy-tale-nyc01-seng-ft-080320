let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const URL = 'http://localhost:3000/toys/'

  const fetchToys = () => {
    fetch(URL)
    .then(resp => resp.json())
    .then(toyCollection => {
      renderToys(toyCollection) 
      submitHandler()
      clickHandler()
    })
  }
  fetchToys();

  const renderToys= (toys) => {
    for (const toy of toys) {
        renderToy(toy)
    }
  }

  const renderToy = (toy) => {
    const toyDiv = document.createElement('div')
    toyDiv.className = "card"
      toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar"/>
      <p>${toy.likes} </p>
      <button class="like-btn">Like <3</button>
      <p hidden>${toy.id}</p>
      `
      const divContainer = document.querySelector("#toy-collection")
      divContainer.append(toyDiv)  
  }

  const submitHandler = () => {
      const form = document.querySelector('.add-toy-form')
      form.addEventListener('submit', (e) => {
          // e.preventDefault()
          const toy = {
              name: form.name.value,
              image: form.image.value,
              likes: 0
          }

          fetch(URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json" 
              },
              body: JSON.stringify(toy)
          })
          .then(response => response.json())
          .then(data => renderToy(data))

          form.reset()
      })
  }
 

   const clickHandler = (toyCollection) => {
    const divContainer = document.querySelector("#toy-collection")
    divContainer.addEventListener('click', (e) => {
        if (e.target.matches(".like-btn")) {

            const toyParentNode = e.target.parentElement
            const toyName = toyParentNode.querySelector('h2')
            const toyImage = toyParentNode.querySelector('img')
            const toyLikes = toyParentNode.querySelector('p')
            const toyId = parseInt(toyParentNode.querySelector('p[hidden]').textContent)
            
            fetch(`${URL}${toyId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json" 
                },
                body: JSON.stringify({
                    "name": toyName.textContent,
                    "image": toyImage['src'],
                    "likes": parseInt(toyLikes.textContent) + 1
                })
            })
            .then(response => response.json())
            .then(data => toyLikes.textContent = data.likes)
        } 
    })
   }



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
});
