# National Pokedex Project Notes

## Files
- index.html
- details.html
- style.css
- pokemon.js
- pokemon-details.js
- search.js

## Methods Used
- **PokeAPI**
- `addeventlisteners` (input, click, keyup, DOMContentLoaded)
- `removeeventlisteners`
- Asynchronous function
  - `then`, `fetch`, `await`, `json`, `Promise.all`
- `get()`
- `parent`
- `appendChild`
- `createElement`
- `classList`
- `className`
- Array destructuring
- `map()`
- `filter()`
- `try`/`catch` statements
- `if`/`elseif`/`else` conditionals
- `for`/`forEach` loops
- `window.location.href`, `window.history`
- `URLSearchParams()`
- Operators (`||`, `!==`, `===`, `<`, `>`, etc.)
- Template literals
- `String()`
- `toUpperCase()`, `toLowerCase()`
- `replace()`
- `return`
- `split()`
- `slice()`
- `innerHTML`, `textContent`
- `parseInt`
- `style.display`
- `value`
- `.startsWith()`

- The `style.css` has all of its own stuff, with a selector on root.

- Placing the script tags in the head of the HTML, with a `defer` attribute.

## Possible Future Implementations
- Make the cards in the Pokedex have hover effect with scale.
- Fix up a lot of the styling:
  - Texts are too small.
  - The main screen holds all the Pokemon well, but I personally think it's a little boring and could use some more UI/UX designs.
  - Pokemon with two types should have different colors for their textbox. Right now, they're both the same color.
- Add other features to the details section:
  - Forms
  - Shiny
  - Gender
  - Different names (language)
  - Region & region-specific descriptions
- Change the image sprites to more updated or possibly animated sprites.
- Have every Pokemon that is currently out listed (Currently 649 listed).
- Redo this project with Tailwind and React.

## What skills can I take away from this project?
- Div and Element Nesting 
- API Integration with PokeAPI
- Asynchronous Programming
  - Promise, then, get, fetch, json, await, etc.
- List Rendering techniques (map, filter)
- Template Literals
- Implementing a search input bar that filters out by name or number of the Pokemon
- Event Listener techniques (addeventlistener, removeeventlistener, click, keyup, DOMContentLoaded, input, etc.)
- Loops (for, forEach)
- Other JavaScript methods and fixing gaps in JavaScript concepts
