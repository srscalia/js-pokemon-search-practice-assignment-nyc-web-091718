//Deliverables:
//- Implement a filter functionality for your Pokemon list.

// - Implement a flip functionality on each Pokemon.

// - Your search should include pokemon whose names are not exact matches

// - AS A BONUS, add a way to show users details for a particular pokemon: moves, abilities, etc.


document.addEventListener('DOMContentLoaded', () => {
  // pokemon container
  const containerToWhichWeAppend = document.getElementById('pokemon-container')
  // fetch the json server
  fetch('http://localhost:3000/pokemon', {
    method: 'GET'
    }).then(function(response) {
      //parse the JSON from the HTTP response obj
      return response.json()
    }).then(function(parsedJSON){
      pokeHash = parsedJSON;
      // add a listener to each
      //Iterate through the array, grab the elements that we want to render on the page
      pokeHash.forEach(function(poke){
        // const imageBack = poke.sprites.back
        const image = poke.sprites.front
        //call append function within the iteration
        appendPokeToDom(poke, image)
    }) // end of then methods

      // find the parent element container
      const parent = document.getElementById('pokemon-container')
      parent.addEventListener('click', function(event) {
        const thing = event.target
        if (thing.localName === 'img') {
          const id = thing.dataset.id
          if (thing.src.includes("back")) {
            thing.src = pokeHash[id-2].sprites.front
          } else {
            thing.src = pokeHash[id-2].sprites.back
          } // end of nested if statement to check if link is front or back
        } // end of if statement to check make sure the click listener can target just images
      }) // end of parent addEventListener

})
  //Function to append HTML to which we are appending
    function appendPokeToDom(poke, image) {
      containerToWhichWeAppend.innerHTML += `<div class="pokemon-container"><div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
        <h1 class="center-text">${poke.name}</h1>
        <div style="width:239px;margin:auto">
          <div style="width:96px;margin:auto">
            <img data-id=${poke.id} data-action="flip" class="toggle-sprite" src=${image}>
          </div>
        </div>
      </div>
      </div>`
    } // end of the appendPokeToDom function

}) //End of the document end of listening for content load
