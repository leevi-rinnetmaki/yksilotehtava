import { fetchRestaurants } from "../model/api.js";
import { renderRestaurants, filterRestaurants, showRestaurantOrMenu } from "../view/restaurant.js";

const restaurantSearchButton = document.querySelector('#restaurant-search-button');
const restaurantSearchBar = document.querySelector('#restaurant-search-bar');
const suggestionsContainer = document.querySelector('#suggestions-container');
const companySelectorAll = document.querySelector('#company-all');
const companySelectorSodexo = document.querySelector('#company-sodexo');
const companySelectorCompass = document.querySelector('#company-compass-group');

const map = L.map('map').setView([60.1699, 24.9384], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const markerLayer = L.layerGroup().addTo(map);
const apiRestaurants = await fetchRestaurants();
async function initialize(restaurants) {
    renderRestaurants(restaurants);
    addMarkers(restaurants);
}
initialize(apiRestaurants);

function addMarkers(restaurants) {
    markerLayer.clearLayers();

    restaurants.forEach(restaurant => {
        if (restaurant.location.coordinates[1] && restaurant.location.coordinates[0]) {
            L.marker([restaurant.location.coordinates[1], restaurant.location.coordinates[0]])
                .addTo(markerLayer)
                .bindPopup(`<b>${restaurant.name}</b><br>${restaurant.address}`);
        }
    });
}

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

    suggestionsContainer.innerHTML = '';
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    if (filteredRestaurants.length > 0) {
        renderRestaurants(filteredRestaurants);
        addMarkers(filteredRestaurants);
    } else {
        suggestionsContainer.innerHTML = '<p>No restaurants found.</p>';
    }
});

companySelectorAll.addEventListener('click', () => {
    renderRestaurants(filterRestaurants(apiRestaurants, 'all'));
    addMarkers(filterRestaurants(apiRestaurants, 'all'));
});

companySelectorSodexo.addEventListener('click', () => {
    renderRestaurants(filterRestaurants(apiRestaurants, 'Sodexo'));
    addMarkers(filterRestaurants(apiRestaurants, 'Sodexo'));
});

companySelectorCompass.addEventListener('click', () => {
    renderRestaurants(filterRestaurants(apiRestaurants, 'Compass Group'));
    addMarkers(filterRestaurants(apiRestaurants, 'Compass Group'));
});

document.addEventListener('click', (event) => {
    if (!suggestionsContainer.contains(event.target) && event.target !== restaurantSearchBar) {
        suggestionsContainer.innerHTML = '';
    }
});