async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function postData(url, payload) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

function fetchRestaurants() {
    return fetchData('https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants');
}

function fetchWeeklyMenu(restaurantId) {
    return fetchData(`https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/${restaurantId}/en`);
}


export { fetchData, postData, fetchRestaurants, fetchWeeklyMenu };
//fetchData('https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants');
