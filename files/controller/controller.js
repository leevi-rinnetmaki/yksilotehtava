import { fetchData, postData, fetchRestaurants } from "../model/api.js";
import { renderRestaurants, filterRestaurants, showRestaurantOrMenu  } from "../view/restaurant.js";
const restaurantSearchButton = document.querySelector('#restaurant-search-button');
const restaurantSearchBar = document.querySelector('#restaurant-search-bar');
const companySelectorAll = document.querySelector('#company-all');
const companySelectorSodexo = document.querySelector('#company-sodexo');
const companySelectorCompass = document.querySelector('#company-compass-group');

const apiRestaurants = await fetchRestaurants();
async function initialize(restaurants) {
    renderRestaurants(restaurants);
}
initialize(apiRestaurants);

restaurantSearchButton.addEventListener('click', async () => {
    const sear = restaurantSearchBar.value;
    console.log(sear);
})

companySelectorAll.addEventListener('click', () => {
    filterRestaurants(apiRestaurants, 'all');
});

companySelectorSodexo.addEventListener('click', () => {
    filterRestaurants(apiRestaurants, 'Sodexo');
});

companySelectorCompass.addEventListener('click', () => {
    filterRestaurants(apiRestaurants, 'Compass Group');
});