import { fetchRestaurants, fetchWeeklyMenu } from "../model/api.js";

const restaurantButton = document.querySelector('#restaurant-button');
const mainRestaurant = document.querySelector('#main-restaurant');
const companySelector = document.querySelector('#company-selector');

const daySelector = document.querySelector('#day-selector');
const daySelectorButtons = document.querySelectorAll('#day-selector button');
const menuList = document.querySelector('#menu-list');
const restaurantList = document.querySelector('#restaurant-list');
const restaurantListList = document.querySelectorAll('#restaurant-list li');

const displayRestaurants = document.querySelectorAll('.display-restaurants');
const displayMenu = document.querySelectorAll('.display-menu');

function showRestaurantOrMenu(boole){
    if(boole){
        displayRestaurants.forEach(element => {
            element.style.display = 'block';
        });
        displayMenu.forEach(element => {
            element.style.display = 'none';
        });
    }else{
        displayRestaurants.forEach(element => {
            element.style.display = 'none';
        });
        displayMenu.forEach(element => {
            element.style.display = 'block';
        });
    }
}

async function renderRestaurants(restaurants){
    showRestaurantOrMenu(true);
    restaurantList.innerHTML = '';

    restaurants.forEach(restaurant => {
        const restaurantItem = document.createElement('li');
        restaurantItem.classList.add('restaurant-item');
        restaurantItem.id = restaurant._id;
        restaurantItem.innerHTML = `
            <h2>${restaurant?.name}</h2>
            <p>City: ${restaurant?.city}</p>
            <p>Postal Code: ${restaurant?.postalCode}</p>
            <p>Address: ${restaurant?.address}</p>
            <p>Phone: ${restaurant?.phone}</p>
            <p>Company: ${restaurant?.company}</p>
            <p>id: ${restaurant?._id}</p>
        `;
        const menuButton = document.createElement('button');
        menuButton.classList.add('menuButton');
        //menuButton.id = `restaurant-${restaurant._id}`;
        menuButton.id = restaurant._id;

        menuButton.textContent = 'View Menu';
        menuButton.addEventListener('click', () => {
            renderMenu(restaurant._id);
        });
        restaurantItem.appendChild(menuButton);
        restaurantList.appendChild(restaurantItem);
    });
}

async function renderMenu(restaurantId) {

    showRestaurantOrMenu(false);
    menuList.innerHTML = '';
    console.log(`Clicked on restaurant ${restaurantId}`);
    const menu = await fetchWeeklyMenu(restaurantId);
    /*menu.forEach(day => {
    });*/
    console.log(menu.days[4].date);

    restaurantButton.addEventListener('click', () => {
        showRestaurantOrMenu(true);
    });
}

function filterRestaurants(restaurants, company){
    //const restaurantListList = document.querySelectorAll('#restaurant-list li');

    if(company==='all'){
        renderRestaurants(restaurants);
    }else{
        const filteredRestaurants = [];
        restaurants.forEach((restaurant) =>{
            if(restaurant.company === company){
                filteredRestaurants.push(restaurant);
            }
        })
        renderRestaurants(filteredRestaurants);
    };
}




export { renderRestaurants, filterRestaurants, showRestaurantOrMenu };