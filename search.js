// The purpose of this file is to give our search input more functionality for our search input box, our close icon within the search box, and our filter menu that will allow us to select our radio box.

const inputElement = document.querySelector('#search-input');
const searchCloseIcon = document.querySelector('#search-close-icon');
const sortWrapper = document.querySelector('.sort-wrapper');

// give our input search box an event listener of input with a handle function that has our var as an argument
inputElement.addEventListener('input', () => {
	handleInputChange(inputElement);
});
searchCloseIcon.addEventListener('click', handleSearchCloseOnClick);
sortWrapper.addEventListener('click', handleSortIconOnClick);

function handleInputChange(inputElement) {
	// our inputValue var will be equal to our search box input value that we enter
	const inputValue = inputElement.value;

	// if our value is not an empty string, we will add our icon by adding the visible class
	if (inputValue !== '') {
		document
			.querySelector('#search-close-icon')
			.classList.add('search-close-icon-visible');
		// otherwise, the opposite is true, and we can remove out visible class.
	} else {
		document
			.querySelector('#search-close-icon')
			.classList.remove('search-close-icon-visible');
	}
}

// our function for closing our searchIcon on click
function handleSearchCloseOnClick() {
	// our search-input value within our box will be an empty string because we have searched for what we are looking for
	document.querySelector('#search-input').value = '';
	// we will remove the visibility of the search-close-icon because there is no value to clear.
	document
		.querySelector('#search-close-icon')
		.classList.remove('search-close-icon-visible');
}

// our function for when we click our filter radio options
function handleSortIconOnClick() {
	// get our filter wrapper div, and give it the open class because we are trying to open the div
	document
		.querySelector('.filter-wrapper')
		.classList.toggle('filter-wrapper-open');
	// get our body tag, and toggle the class of filter-wrapper-overlay, which is our filter menu
	document.querySelector('body').classList.toggle('filter-wrapper-overlay');
}
