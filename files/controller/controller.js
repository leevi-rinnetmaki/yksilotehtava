import { fetchData, postData } from "../model/api.js";
import { renderRestaurants } from "../view/restaurant.js";

async function initialize() {
    const restaurants = await fetchData('https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants');
    renderRestaurants(restaurants);
}

initialize();