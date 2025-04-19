import { fetchData, postData, fetchRestaurants } from "../model/api.js";
import { renderRestaurants } from "../view/restaurant.js";

async function initialize() {
    renderRestaurants(await fetchRestaurants());
}

initialize();