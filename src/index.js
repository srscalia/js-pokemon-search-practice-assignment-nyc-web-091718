document.addEventListener('DOMContentLoaded', () => {
  let pokemon = []
  const pokemonContainer = document.getElementById('pokemon-container')
  const searchInput = document.getElementById('pokemon-search-input')

  fetch('http://localhost:3000/pokemon')
    .then((objectResponse) =>
      objectResponse.json())
      .then((pokemonJSON) => {
        pokemon = pokemonJSON
        pokemon.forEach((poke) => {
          pokemonContainer.innerHTML+=`
          <div class="pokemon-container">
            <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
              <h1 class="center-text">${poke.name}</h1>
              <div style="width:239px;margin:auto">
                <div style="width:96px;margin:auto">
                  <img data-id='${poke.id}' data-action="flip" class="toggle-sprite" src="${poke.sprites.front}">
                </div>
              </div>
            </div>
          </div>`
        }) // end of for each

      }) // end of fetch
      pokemonContainer.addEventListener('click', (event)=> {
        if (event.target.localName === 'img') {
          const id = event.target.dataset.id
          const foundPoke = pokemon.find((poke)=>{
            return poke.id == id;
          }) //end of the foundPoke
          if (event.target.src ===`${foundPoke.sprites.front}`) {
            event.target.src = `${foundPoke.sprites.back}`
          } else {
            event.target.src = `${foundPoke.sprites.front}`
          }

        } // end of if statement
      })// end of click event listener for photo flips

      searchInput.addEventListener('input', (event)=> {
        const searchValue = event.target.value;
        let filteredPokemon = pokemon.filter(poke =>
          poke.name.includes(searchValue)) // end of filteredPokemon
        pokemonContainer.innerHTML = renderAllPokemon(filteredPokemon)
      }) // end of click event listener for search input

      const renderAllPokemon = (pokemonArray) => {
        return pokemonArray.map((pokemon) => {
          return `
          <div class="pokemon-container">
            <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
              <h1 class="center-text">${pokemon.name}</h1>
              <div style="width:239px;margin:auto">
                <div style="width:96px;margin:auto">
                  <img name="flip" data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
                </div>
              </div>
            </div>
          </div>
          `
        }).join('') //map returns an array. we want to use a STRING to update our div's innerHTML. ['h', 'e', 'l', 'l', 'o'].join('') -> 'hello'
      }


})
