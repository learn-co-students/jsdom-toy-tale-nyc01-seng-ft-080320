let addToy = false;
let toyMap = {};

function Toy (name, image, id, likes) {
  this.name = name;
  this.image = image;
  this.id = id
  this.likes = likes;
}

function toyFactory(toyObj) {
  let newToyDiv = document.createElement('div');
  let toyCollection = document.querySelector('#toy-collection')
    newToyDiv.setAttribute('class', 'card');

  newToyDiv.innerHTML = `
    <h2>${toyObj.name}</h2>
    <img src="${toyObj.image}" class = 'toy-avatar' />
    <p>${toyObj.likes}</p>
    <button class="like-btn" id=${toyObj.id}>Like <3</button>
    `
    toyCollection.append(newToyDiv);
    


  
}

function renderToys(toyArray) {
  for(let toy of toyArray) {
    toyFactory(toy)
    
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");


  document.addEventListener('click', e => {
    if (e.target.class = 'like-btn') {
      const likePTag = e.target.previousElementSibling;
      let currentLikes = parseInt(likePTag.textContent) + 1;
      

      fetch(`http://localhost:3000/toys/${e.target.id}`,{

        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json"
        },
      
        body: JSON.stringify({

          "likes": currentLikes
        })
      })
      .then(resp => resp.json)
      .then((likes)=> {
        
        likePTag.textContent = currentLikes;

      })
    }
  })
  

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

    

  });
  
  function addNewToy() {
    
    const toyForm = document.querySelector('.add-toy-form');

    toyForm.addEventListener('submit', e => {
      e.preventDefault();

      
      fetch('http://localhost:3000/toys', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toyForm.name.value,
          image: toyForm.image.value,
          likes: 0
        })
      })
      .then(resp => resp.json())
      .then(newToy => {
        console.log(newToy)
        toyFactory(newToy);
      });
      
    });
  }

  


  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      console.log(toys)
      renderToys(toys);
    });

    addNewToy();

});