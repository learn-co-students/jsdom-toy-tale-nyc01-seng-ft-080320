
let addToy = false;
const toyOuterDiv = document.getElementById('toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    
    // hide & seek with the form

    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const form = document.querySelector('form')
      form.addEventListener('submit', e => {
        e.preventDefault()
        let newToy = {name: e.target.name.value, image: e.target.image.value, likes: 0}
        let configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(newToy)
        }
        fetch('http://localhost:3000/toys', configObj)
          .then(function(resp){
            return resp.json()
          }).then(function(obj){
            createToyDivs(obj)
          })
          form.reset()
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function createToyDivs(toyObj){
    const newDiv = document.createElement('div')
    newDiv.classList.add('card')
    newDiv.dataset.toyId = `${toyObj.id}`
    newDiv.innerHTML = `
      <h2>${toyObj.name}</h2>
      <img src="${toyObj.image}" class="toy-avatar">
      <p>${toyObj.likes} Likes</p>
      <button class="like-btn">Like</button>
    `
    toyOuterDiv.append(newDiv)
  }

  fetch('http://localhost:3000/toys')
    .then(function(resp){
      return resp.json()
    }).then(function(objArray){ 
      for (const toy of objArray){
        createToyDivs(toy)
      }
    })

  toyOuterDiv.addEventListener('click', e => {
    if (e.target.className === 'like-btn'){
      const parentDiv = e.target.parentNode
      let num = parseInt(parentDiv.children[2].innerText, 10)
      parentDiv.children[2].innerText = `${num += 1} Likes`

        let configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({"likes": `${num}`})
        }

      fetch(`http://localhost:3000/toys/${parentDiv.dataset.toyId}`, configObj)
        .then(function(resp){
          return resp.json()
        }).then(function(obj){
          console.log(obj)
        })

    }


  })






});