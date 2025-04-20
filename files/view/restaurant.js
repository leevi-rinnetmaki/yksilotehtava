import { fetchWeeklyMenu } from "../model/api.js";

const restaurantButton = document.querySelector('#restaurant-button');
const menuList = document.querySelector('#menu-list');
const restaurantList = document.querySelector('#restaurant-list');
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
    
    if(restaurants){
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
            menuButton.id = restaurant._id;
            menuButton.textContent = 'View Menu';
            menuButton.addEventListener('click', () => {
                renderMenu(restaurant._id);
            });
            restaurantItem.appendChild(menuButton);
            restaurantList.appendChild(restaurantItem);
        });
    }else{
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Unable to find any restaurants, sorry";
        restaurantList.appendChild(errorMessage);
    }
}

async function renderMenu(restaurantId) {
    showRestaurantOrMenu(false);
    menuList.innerHTML = '';

    try {
        const menu = await fetchWeeklyMenu(restaurantId);
        menu.days.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('menu-day');

            const dayTitle = document.createElement('h3');
            dayTitle.textContent = `Date: ${day.date}`;
            dayElement.appendChild(dayTitle);

            const itemsList = document.createElement('ul');
            day.courses.forEach(course => {
                const itemElement = document.createElement('li');
                const diets = Array.isArray(course.diets) ? course.diets.join(', ') : 'No diets specified';
                itemElement.textContent = `${course.name} - Diets: ${diets}`;
                itemsList.appendChild(itemElement);
            });

            dayElement.appendChild(itemsList);
            menuList.appendChild(dayElement);
        });
    } catch (error) {
        console.error('Error fetching menu:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Unable to load the menu, please try again later.";
        menuList.appendChild(errorMessage);
    }

    restaurantButton.addEventListener('click', () => {
        showRestaurantOrMenu(true);
    });
}

function filterRestaurants(restaurants, company){
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