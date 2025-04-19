import { fetchRestaurants, fetchWeeklyMenu } from "../model/api.js";

const restaurantButton = document.querySelector('#restaurant-button');
const mainRestaurant = document.querySelector('#main-restaurant');
const daySelector = document.querySelector('#day-selector');
const menuList = document.querySelector('#menu-list');
const restaurantList = document.querySelector('#restaurant-list');


async function renderRestaurants(restaurants){
    restaurantButton.style.display = 'none';
    daySelector.style.display = 'none';
    menuList.style.display = 'none';
    restaurantList.style.display = 'block';
    restaurantList.innerHTML = '';

    restaurants.forEach(restaurant => {
        const restaurantItem = document.createElement('li');
        restaurantItem.classList.add('restaurant-item');
        restaurantItem.id = restaurant._id;
        restaurantItem.innerHTML = `
            <h2>${restaurant.name}</h2>
            <p>Address: ${restaurant.address}</p>
        `;
        const menuButton = document.createElement('button');
        menuButton.classList.add('menuButton');
        menuButton.id = `restaurant-${restaurant._id}`;
        menuButton.textContent = 'View Menu';
        menuButton.addEventListener('click', () => {
            renderMenu(restaurant._id);
        });
        restaurantItem.appendChild(menuButton);
        restaurantList.appendChild(restaurantItem);
    });
}

async function renderMenu(restaurantId) {
    restaurantButton.style.display = 'block';
    daySelector.style.display = 'block';
    menuList.style.display = 'block';
    restaurantList.style.display = 'none';
    menuList.innerHTML = '';
    console.log(`Clicked on restaurant ${restaurantId}`);
    const menu = await fetchWeeklyMenu(restaurantId);
    /*menu.forEach(day => {
    });*/
    console.log(menu.days[4].date);

    restaurantButton.addEventListener('click', () => {
        restaurantButton.style.display = 'none';
        daySelector.style.display = 'none';
        menuList.style.display = 'none';
        restaurantList.style.display = 'block';
    });



}


export { renderRestaurants };