async function renderRestaurants(restaurants){
    const restauranthtml = document.querySelector('#restaurant-list');
    restauranthtml.innerHTML = '';

    restaurants.forEach(restaurant => {
        const restaurantItem = document.createElement('li');
        restaurantItem.classList.add('restaurant-item');
        restaurantItem.innerHTML = `
            <h2>${restaurant.name}</h2>
            <p>Address: ${restaurant.address}</p>
        `;
        restauranthtml.appendChild(restaurantItem);
    });
}


export { renderRestaurants };