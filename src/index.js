let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const URL = 'http://localhost:3000/toys/'

  const fetchToys = () => {
    fetch(URL)
    .then(resp => resp.json())
    .then(toyCollection => {
      renderToys(toyCollection) 
      
    })
  }
  fetchToys();

  const renderToys= (toys) => {
    for (const toy of toys) {
      const toyDiv = document.createElement('div')
      toyDiv.className = "card"
      toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar"/>
      <p>${toy.likes} </p>
      <button class="like-btn">Like <3</button>
      `
      const divContainer = document.querySelector("#toy-collection")
      divContainer.append(toyDiv)  
    }
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

          fetch(`http://localhost:3000/toys/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json" 
              },
              body: JSON.stringify(toy)
          })
          form.reset()
      })
  }
 submitHandler()

 


// if (e.target.matches) 
// then....


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
