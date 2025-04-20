import { fetchRestaurants } from "../model/api.js";
import { renderRestaurants, filterRestaurants, showRestaurantOrMenu } from "../view/restaurant.js";

const restaurantSearchButton = document.querySelector('#restaurant-search-button');
const restaurantSearchBar = document.querySelector('#restaurant-search-bar');
const suggestionsContainer = document.querySelector('#suggestions-container');
const companySelectorAll = document.querySelector('#company-all');
const companySelectorSodexo = document.querySelector('#company-sodexo');
const companySelectorCompass = document.querySelector('#company-compass-group');

const apiRestaurants = await fetchRestaurants();
async function initialize(restaurants) {
    renderRestaurants(restaurants);
}
initialize(apiRestaurants);

restaurantSearchBar.addEventListener('input', () => {
    const query = restaurantSearchBar.value.toLowerCase();
    const filteredRestaurants = apiRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query)
    );

    suggestionsContainer.innerHTML = '';

    filteredRestaurants.forEach(restaurant => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = restaurant.name;
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.addEventListener('click', () => {
            restaurantSearchBar.value = restaurant.name;
            suggestionsContainer.innerHTML = '';
            showRestaurantOrMenu(restaurant);
        });
        suggestionsContainer.appendChild(suggestionItem);
    });
});

restaurantSearchButton.addEventListener('click', () => {
    const search = restaurantSearchBar.value.toLowerCase();
    const filteredRestaurants = apiRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(search)
    );

    if (filteredRestaurants.length > 0) {
        renderRestaurants(filteredRestaurants);
    } else {
        suggestionsContainer.innerHTML = '<p>No restaurants found.</p>';
    }
});

companySelectorAll.addEventListener('click', () => {
    filterRestaurants(apiRestaurants, 'all');
});

companySelectorSodexo.addEventListener('click', () => {
    filterRestaurants(apiRestaurants, 'Sodexo');
});

companySelectorCompass.addEventListener('click', () => {
    filterRestaurants(apiRestaurants, 'Compass Group');
});