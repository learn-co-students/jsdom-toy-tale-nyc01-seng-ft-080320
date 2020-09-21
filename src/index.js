let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  baseUrl = 'http://localhost:3000/toys/'
  const toyCollection = document.querySelector('#toy-collection')
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
  const getToy = () => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(pokemons => renderPokemons(pokemons))
  }
  const renderPokemons = pokemons => {
    //console.log(renderPokemons)
    for (let pokemon of pokemons) {
      let divPoke = renderPokemon(pokemon)
      toyCollection.append(divPoke)
    }
    ///toyCollection.append(divPoke)
  }
  const renderPokemon = pokemon => {
    const poke = document.createElement('div')
    poke.classList.add('card')
    poke.innerHTML = `<h2>${pokemon.name}</h2>
    <img src=${pokemon.image} class="toy-avatar" />
    <p> ${pokemon.likes} </p>
    <button class="like-btn" data-pokemon-id="${pokemon.id}">like<3</button>`
    //toyCollection.append(divPoke)
    return poke

  }
  const submitHandler = () => {
    const form = document.querySelector('.add-toy-form')
    form.addEventListener('submit', e => {

      e.preventDefault()
      //console.log(e.target)
      const name = form.name.value
      //console.log(value)
      const image = form.image.value
      //console.log(image)
      const pokemon = {
        name: name,
        image: image,
        likes: 0
      }
      //form.reset()
      // save it to the DB

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(pokemon)
      }
      fetch(baseUrl, options)
        .then(response => response.json())
        .then(pokemon => {
          const divPoke = renderPokemon(pokemon)
          toyCollection.append(divPoke)
        })


    })
  }

  const clickHandler = () => {
    document.addEventListener('click', e => {
      if (e.target.matches('.like-btn')) {
        //console.log('hello')
        //const div = document.querySelector('.card')
        //console.log(div.children[2])
        // div.chilfren[2].textContent
        //console.log(numLikes)
        const button = e.target
        //console.dir(button)
        const pokemonId = button.dataset.pokemonId // to retrieve an id
        const currentLikes = button.previousElementSibling
        //console.log(currentLikes.textContent)
        const newLikes = parseInt(currentLikes.textContent) + 1
        // changing in the db current likes to new likes
        const options = {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({ likes: newLikes })
        }
        fetch(baseUrl + pokemonId, options)
          .then(response => response.json())
          .then(pokemon => {
            currentLikes.textContent = `${pokemon.likes}`
          })


      }


    })
  }


  // create a function that will create a card for each pokemon
  // make a fetch request that will upload all the pokemon object

  getToy()
  submitHandler()
  clickHandler()


});
