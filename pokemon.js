const MAX_POKEMON = 649;
// Our empty div that will contain all our listItem divs of Pokemon data cards
const listWrapper = document.querySelector('.list-wrapper');
// our search input tag where we will search our pokemon
const searchInput = document.querySelector('#search-input');
// our radio input box that will filter as number if checked in our search input
const numberFilter = document.querySelector('#number');
// our radio input box that will filter as name if checked in our search input
const nameFilter = document.querySelector('#name');
// our not found message div if the search is outside the scope of our data
const notFoundMessage = document.querySelector('#not-found-message');

let allPokemons = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
	// after fetching the url, then do the response, and turn it into json
	.then((res) => res.json())
	// then take the data, make our empty array of allPokemons equal to data.results which is an array, containing all 151 objects of our pokemon data that we need.
	.then((data) => {
		allPokemons = data.results;
		// run the displayPokemons function with our pokemon paramater passed in as allPokemons array of data.results.
		displayPokemons(allPokemons);
	});

// this function is created to await our listItem div of pokemons to be clicked before being displayed, hence being an async function.
async function fetchPokemonDataBeforeRedirect(id) {
	// we are running this function asynchronously to fetch the pokemon data with the id for the pokemon, and the pokemon species. If we get it and are successful, we will return true, else we will console our error message.
	try {
		const [pokemon, pokemonSpecies] = await Promise.all([
			fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
				res.json()
			),
			fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
				res.json()
			),
		]);
		return true;
	} catch (error) {
		console.error('Failed to fetch Pokemon data before redirect');
	}
}

function displayPokemons(pokemon) {
	// empty the listwrapper incase we reload the page and its not adding pokemon ontop of existing ones
	listWrapper.innerHTML = '';

	pokemon.forEach((pokemon) => {
		// this will grab the id number of the pokemon within the url
		const pokemonID = pokemon.url.split('/')[6];
		// this will create the specific div for each pokemon we can click on
		const listItem = document.createElement('div');
		// this is the classname we will give to each listItem div
		listItem.className = 'list-item';
		// this is the actual changes we are manually inputting within the listItem div's inner html. We display the pokemons number, image, and name.
		listItem.innerHTML = `
            <div class='number-wrap'>
                <p class='caption-fonts'>#${pokemonID}</p>
            </div>

            <div class='img-wrap'>
                <img src='https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg' alt='${pokemon.name}'/>
            </div>

            <div class='name-wrap'>
                <p class='body3-fonts'>${pokemon.name}</p>
            </div>
        
        `;
		// If we click on the listItem div, it will take us to the details page of the specific pokemon we clicked, hence the async function to await running the function.
		listItem.addEventListener('click', async () => {
			const success = await fetchPokemonDataBeforeRedirect(pokemonID);
			if (success) {
				window.location.href = `./detail.html?id=${pokemonID}`;
			}
		});
		// Add all the listItems into our listWrapper div.
		listWrapper.appendChild(listItem);
	});
}

// our searchbox will have an keyup event listener, that will await the keys you enter into the searchbox with the handleSearch function.
searchInput.addEventListener('keyup', handleSearch);

// our Function for running the searchbox logic and filter logic.
function handleSearch() {
	// we are taking the search input, and whatever the value is, it will always be lowercase
	const searchTerm = searchInput.value.toLowerCase();
	let filteredPokemons;

	//if our namefilter radio box is checked, then our filteredPokemons variable will equal to our allPokemons array with a filter method. We will filter each pokemon and return a pokemon with the name, in lowercase and will make sure the input is true with the startWith method.
	if (nameFilter.checked) {
		filteredPokemons = allPokemons.filter((pokemon) => {
			return pokemon.name.toLowerCase().startsWith(searchTerm);
		});
		// if our nameFilter is not checked, then number must be checked. If so, our filteredPokemons variables will also equal our allPokemons array list with a filter method. Each pokemon will have a variable of the pokemons id, and we will return the pokemonID as long as it is true with the startsWith method.
	} else if (numberFilter.checked) {
		filteredPokemons = allPokemons.filter((pokemon) => {
			const pokemonID = pokemon.url.split('/')[6];
			return pokemonID.startsWith(searchTerm);
		});
	} else {
		filteredPokemons = allPokemons;
	}
	// our displayPokemons function will run with our filteredPokemons variable
	displayPokemons(filteredPokemons);

	if (filteredPokemons.length === 0) {
		notFoundMessage.style.display = 'block';
	} else {
		notFoundMessage.style.display = 'none';
	}
}

// We are giving our close button icon a click event listener and a clearSearch function
const closeButton = document.querySelector('.search-close-icon');
closeButton.addEventListener('click', clearSearch);

// when the function runs, our search box will return an empty string, our displayPokemons function will display allPokemons array, and we will remove our not found message.
function clearSearch() {
	searchInput.value = '';
	displayPokemons(allPokemons);
	notFoundMessage.style.display = 'none';
}
