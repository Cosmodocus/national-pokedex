// without anything occuring yet, the currentPokemonId will be null for now
let currentPokemonId = null;

document.addEventListener('DOMContentLoaded', () => {
	//restating the max pokemon because this is a new js file
	const MAX_POKEMONS = 1008;
	// pokemonID will be getting the url id string
	const pokemonID = new URLSearchParams(window.location.search).get('id');
	// when we get the id string, we will be parsing it as an integer, or a number.
	const id = parseInt(pokemonID, 10);

	// if our id is smaller than 1 or greater than our max pokemons limit, then return to our main page of index.html.
	if (id < 1 || id > MAX_POKEMONS) {
		return (window.location.href = './index.html');
	}

	// set our currentPokemonId to our id variable.
	currentPokemonId = id;
	// run our loadPokemon async function with an argument of our variable id.
	loadPokemon(id);
});

async function loadPokemon(id) {
	// we will run a try/catch method to gather to destructure our pokemon and pokemonSpecies variable, and fetch the data from both, turning them into json.
	try {
		const [pokemon, pokemonSpecies] = await Promise.all([
			fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
				res.json()
			),
			fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
				res.json()
			),
		]);

		// our abilitiesWrapper will be our pokemon-detail-wrap div and our pokemon-detail-move div
		const abilitiesWrapper = document.querySelector(
			'.pokemon-detail-wrap .pokemon-detail-move'
		);
		// it will be an empty string when loaded
		abilitiesWrapper.innerHTML = '';

		// if currentPokemonId is equal to id(which it is if our logic is correct)
		if (currentPokemonId === id) {
			// a function for displaying the pokemon details, withour pokemon variable as an argument
			displayPokemonDetails(pokemon);
			// we set this variable as a function to get the english flavor text, with an argument of our pokemonSpecies variable
			const flavorText = getEnglishFlavorText(pokemonSpecies);
			// get the query selector of these classes, and their text content will be equal to the flavorText variable. This should display the pokemons description.
			console.log(pokemonSpecies);
			console.log(pokemon);
			document.querySelector('.body3-fonts.pokemon-description').textContent =
				flavorText;

			document.querySelector(
				'.pokemon-detail-wrap .pokemon-detail-generation'
			).textContent = pokemonSpecies.generation.name;

			//our left and right arrow logic. We will destructure these variables with the left and right arrow ids, and map them.
			const [leftArrow, rightArrow] = ['#leftArrow', '#rightArrow'].map((sel) =>
				document.querySelector(sel)
			);
			// set our left and right arrow as click events with the navigatePokemon function
			leftArrow.removeEventListener('click', navigatePokemon);
			rightArrow.removeEventListener('click', navigatePokemon);

			// if our id is not 1, which means its not the first pokemon, then we can navigate down 1 when clicking the leftArrow Icon
			if (id !== 1) {
				leftArrow.addEventListener('click', () => {
					navigatePokemon(id - 1);
				});
			}
			// If it's not 151, which is the last pokemon in our limit, then we can click and move up an id with our rightArrow Icon.
			if (id !== 1008) {
				rightArrow.addEventListener('click', () => {
					navigatePokemon(id + 1);
				});
			}
			console.log(pokemon.cries.latest);

			// this is our variable for inserting the pokemon cry within our details. Grab the DOM for the audio tag, and give it the source of the pokemon object of cries and latest.
			const audioSource = document.querySelector('.pokemon-detail audio');
			audioSource.src = pokemon.cries.latest;
			// This halves the volume, to not cause a jarring experience
			audioSource.volume = 0.5;

			// This is for our pokemon Genus display. Similar to the flavorText, we give the variable the same helperfunction of getting the english text, then set the textContent of the div classes to the variable
			const pokemonGenus = getEnglishGenus(pokemonSpecies);
			document.querySelector('.pokemon-detail .pokemon-names').textContent =
				pokemonGenus;

			// pushes into the history of the window and changes the url without having to reload the page
			window.history.pushState({}, '', `./detail.html?id=${id}`);
		}
		// if everything works out, return true
		return true;
		//log our error otherwise, and return false
	} catch (error) {
		console.error('An error occured while fetching Pokemon data', error);
		return false;
	}
}

// our async function for navigating which pokemon we are on while in the details page with an id argument
async function navigatePokemon(id) {
	currentPokemonId = id;
	await loadPokemon(id);
}

// this will hold all the background and type colors. It will be an object that holds all the hexadecimal numbers associated with each colour typing
const typeColors = {
	normal: '#A8A878',
	fire: '#F08030',
	water: '#6890F0',
	electric: '#F8D030',
	grass: '#78C850',
	ice: '#98D8D8',
	fighting: '#C03028',
	poison: '#A040A0',
	ground: '#E0C068',
	flying: '#A890F0',
	psychic: '#F85888',
	bug: '#A8B820',
	rock: '#B8A038',
	ghost: '#705898',
	dragon: '#7038F8',
	dark: '#705848',
	steel: '#B8B8D0',
	fairy: '#EE99AC',
};

// A function with paramaters of our chosen elements, the cssProperty we will define, and the value. For each of the element in elements, we will pass in a style property of our cssProperty equal to our value
function setElementStyles(elements, cssProperty, value) {
	elements.forEach((element) => {
		element.style[cssProperty] = value;
	});
}

// this is for our data progress bar background color. We are turning hex color into rgba color by adding some translucent styling
function rgbaFromHex(hexColor) {
	// If we lets say return a hexadecimal colour of orange, it return the rgba value of that same orange. That is what is going on with this logic.
	return [
		// slicing the hexcolor with (1,3) will represent red, (3,5 )will represent green, and (5,7) will represent blue. We are converting base 16 numbers(hexadecimal) into base 10 numbers(decimal)
		parseInt(hexColor.slice(1, 3), 16),
		parseInt(hexColor.slice(3, 5), 16),
		parseInt(hexColor.slice(5, 7), 16),
	].join(', ');
}

// this is our function for setting the background color based on the type of the pokemon, with our parameter of pokemon.
function setTypeBackgroundColor(pokemon) {
	// this will get the pokemon type name
	const mainType = pokemon.types[0].type.name;
	// our color will be set to our object of  typeColors with our mainType variable
	const secondType = pokemon.types[1] && pokemon.types[1].type.name;

	const color1 = typeColors[secondType];
	const color = typeColors[mainType];

	// If there is no color, console warn
	if (!color) {
		console.warn(`color not defined for type: ${mainType}`);
		return;
	}

	// we will set this variable to our detail-main class div
	const detailMainElement = document.querySelector('.detail-main');

	// we will run out setElementStyles with the paramaters we have defined here of the specific detial, the cssProperty of backgroundColor and borderColor, and the value of color. We are doing the same with the rest of these class names, and specified cssProperty below
	setElementStyles([detailMainElement], 'backgroundColor', color);
	setElementStyles([detailMainElement], 'borderColor', color);
	setElementStyles(
		document.querySelectorAll('.power-wrapper > p'),
		'backgroundColor',
		color
	);
	setElementStyles(
		document.querySelectorAll('.power-wrapper > p:nth-child(2)'),
		'backgroundColor',
		color1
	);
	setElementStyles(
		document.querySelectorAll('.stats-wrap p.stats'),
		'color',
		color
	);
	setElementStyles(
		document.querySelectorAll('.stats-wrap .progress-bar'),
		'color',
		color
	);

	// this variable will be equal to our rgbaFromHex function with an input of our color variable
	// const rgbaColor = rgbaFromHex(color);

	// our styleTag variable will create our style element
	const styleTag = document.createElement('style');

	// here is our innerHTML for our styleTag element we created for the specified classes and their changes to their background color. It will be for the progress bar stats displaying the pokemons hp, atk, def, etc.
	// styleTag.innerHTML = `
	//     .stats-wrap .progress-bar::-webkit-progress-bar {
	//         background-color: rgba(${rgbaColor}, 0.5)
	//     }
	//     .stats-wrap .progress-bar::-webkit-progress-value {
	//         background-color: rgba(${color})
	//     }
	// `;

	// within the document, append child of our styleTag that we created.
	document.head.appendChild(styleTag);
}

// A helper function for capitilizing the pokemons name with a string argument parameter
function capitalizeFirstLetter(string) {
	// return our string parameter with the first index string as uppercase, and the rest as lowercase with the slice method starting at index 1 to the end of the string
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// we create a function with parameters of the parent element that the new element will be appended to, the specific html tag of the element(div, p, etc), and an options object that will allow you to configure the element.
function createAndAppendElement(parent, tag, options = {}) {
	// this is how we create our tag element
	const element = document.createElement(tag);
	// this chekcs all the keys within options and for each key within our options object, we allow our tag element to be configured by properties such as textContent, className, etc.
	Object.keys(options).forEach((key) => {
		element[key] = options[key];
	});

	// this appends the newly created tag element as a child of the parent element
	parent.appendChild(element);
	// now we return the newly created element
	return element;
}

// this is our funtion for displaying our pokemon details, which are the name, id, types, weight, height, abilities, and stats

// This function is entirely for displaying all our specific pokemon detials
function displayPokemonDetails(pokemon) {
	// we set our pokemon argument in this function as these object items.
	const { name, id, types, weight, height, abilities, stats } = pokemon;

	// we create a variable with our name item passed in as the capitalizeFirstLetter function
	const capitalizePokemonName = capitalizeFirstLetter(name);

	//our title html will be given the textContent of our pokemons name with a capitalized name
	document.querySelector('title').textContent = capitalizePokemonName;

	// grab the detail main div and give it to this variable
	const detailMainElement = document.querySelector('.detail-main');

	// add the class name our name item lowercase
	detailMainElement.classList.add(name.toLowerCase());

	// these divs will have a textContent of our capitalized pokemon name
	document.querySelector('.name-wrap .name').textContent =
		capitalizePokemonName;

	//grab these class divs, and within their textContent, give them the id as a string. Place 3 '0's infront of the id number
	document.querySelector(
		'.pokemon-id-wrap .body2-fonts'
	).textContent = `#${String(id).padStart(3, '0')}`;

	// Our Main Element image in our details page
	const imageElement = document.querySelector('.detail-img-wrapper img');
	imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
	imageElement.alt = name;

	// grab the power-wrapper div and give it this var name
	const typeWrapper = document.querySelector('.power-wrapper');
	// it will be empty for now
	typeWrapper.innerHTML = '';
	// for our types item, for each type, we will use the createAndAppendElement Helper Function. It will be placed as a child within the typeWrapper parent, with a tag element of p, and with properties of these class names, and textContent
	types.forEach(({ type }) => {
		createAndAppendElement(typeWrapper, 'p', {
			className: `body3-fonts type ${type.name}`,
			textContent: type.name,
		});
	});

	// Grab both our weight and height classes, and give them a textContent of the weight and height divided by 10. This is because our info we get is way over what we need. We will place these within tempalte literals.
	document.querySelector(
		'.pokemon-detail-wrap .pokemon-detail p.body3-fonts.weight'
	).textContent = `${weight / 10}kg`;
	document.querySelector(
		'.pokemon-detail-wrap .pokemon-detail p.body3-fonts.height'
	).textContent = `${height / 10}m`;

	// grab these classes and place them in this var
	const abilitiesWrapper = document.querySelector(
		'.pokemon-detail-wrap .pokemon-detail-move'
	);

	// for our abilities item, for each ability, we will use our helper function. Each ability will be placed as a child to the abilitiesWrapper parent, with a p tag, and properties of this classname, and textContent
	abilities.forEach(({ ability }) => {
		createAndAppendElement(abilitiesWrapper, 'p', {
			className: 'body3-fonts',
			// this will display the abilities name in the middle
			textContent: ability.name,
		});
	});

	// grab this class and place it in this var
	const statsWrapper = document.querySelector('.stats-wrapper');
	// it will be empty for now
	statsWrapper.innerHTML = '';

	// this is our object items for each stat
	const statNameMapping = {
		hp: 'HP',
		attack: 'ATK',
		defense: 'DEF',
		'special-attack': 'SPATK',
		'special-defense': 'SPDEF',
		speed: 'SPD',
	};

	// for our stats item, for each stat and base_stat, we will create a statDiv equal to a div, with a class name of stats-wrap, and we will append it as a child to the statsWrapper parent
	stats.forEach(({ stat, base_stat }) => {
		const statDiv = document.createElement('div');
		statDiv.className = 'stats-wrap';
		statsWrapper.appendChild(statDiv);

		// use the helper function to create child tag within the statDiv parent of p tag, with properties of this classname, and the textContent of our object stats map. This will display the stats name next to the progress bars
		createAndAppendElement(statDiv, 'p', {
			className: 'body3-fonts stats',
			textContent: statNameMapping[stat.name],
		});
		// use the helper function to create another p tag within the statDiv with this class name, and a textContent of our base stat as a string, with 3 '0's infront of it. I changed it to 2.
		createAndAppendElement(statDiv, 'p', {
			className: 'body3-fonts',
			textContent: String(base_stat).padStart(2, '0'),
		});
		// use the helper function to create a child progress tag within the statDiv parent tag with a className of progress-bar, a value of our base_stat, and a max of 255. This will give us our stats for each base_stat(hp, atk, def, etc) with a max amount.
		createAndAppendElement(statDiv, 'progress', {
			className: 'progress-bar',
			value: base_stat,
			max: 155,
		});
	});

	// now run this function with our pokemon argument of name, id, type, abilities, weight, height, and stats. It will make our background and border change based on the pokemons typing.
	setTypeBackgroundColor(pokemon);
}
// this function takes our argument of pokemonSpecies and goes over a for loop. For each entry, it checks to make sure the entry is english. If it is english, it remove any special characters, and returns our result
function getEnglishFlavorText(pokemonSpecies) {
	for (let entry of pokemonSpecies.flavor_text_entries) {
		if (entry.language.name === 'en') {
			let flavor = entry.flavor_text.replace(/\f/g, ' ');
			return flavor;
		}
	}
	// if nothing is found, just return an empty string.
	return '';
}

// This function runs exactly like the previous helper function for flavortext, but without needed to replace any of the text.
function getEnglishGenus(pokemonSpecies) {
	for (let entry of pokemonSpecies.genera) {
		if (entry.language.name === 'en') {
			let genus = entry.genus;
			return genus;
		}
	}
	return '';
}
