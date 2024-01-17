// Fetch
//
// POST

const BASE_URL = 'https://pokeapi.co/api/v2/';

const card = document.querySelector(".card--container");

// Fetch no async
/*
fetch(BASE_URL + 'pokemon/ditto')
    .then(res => res.json())
    .then(data => console.log(data));
*/
// fetch async

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

const createPokemonCard = (pokemon) => {
    const pokemonName = document.createElement("p")
    const pokemonID = document.createElement("p")
    const pokemonWeight = document.createElement("p")
    const pokemonImage = document.createElement("img")

    pokemonName.innerHTML =`Name : ${pokemon.name}`;
    pokemonID.innerHTML = `ID : ${pokemon.id}`;
    pokemonWeight.innerHTML = `Weight : ${pokemon.weight}`;
    pokemonImage.src = pokemon.sprites.front_default;

    card.appendChild(pokemonImage);
    card.appendChild(pokemonName);
    card.appendChild(pokemonID);
    card.appendChild(pokemonWeight);

    
}

const saveOnLocalStorage = () => {
    const pokemonID = pokemon.id

    const pokemonsList = JSON.parse(localStorage.getItem('pokemons')
    )|| [];  // [] si no hay nada en el localstorage, devuele

    pokemons.push(pokemonID)

    localStorage.setItem('pokemons', JSON.stringify(pokemons));
}

// Obtener pokemon
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        //localStorage.setItem('pokemons', pokemon.id);

        saveOnLocalStorage(pokemon);

        console.log(pokemon.name);

        createPokemonCard(pokemon);
    })

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('pokemons');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);
})

// obtener el anterior
//
//
// obtener el siguiente

document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max(1, currentPokeId -1);
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name);
    })

document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon);
    })



////////////////// POST
//

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.json())
    .then(json => console.log(json))


/////////////////// EJERCICIOS
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch
