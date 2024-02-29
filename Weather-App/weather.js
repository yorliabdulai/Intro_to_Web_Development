document.querySelector('form').addEventListener('submit', getWeather);

async function getWeather(event) {
    event.preventDefault();
    const city = document.querySelector('#city').value;
    const apiKey = 'your_openweathermap_api_key'; // replace with your OpenWeatherMap API key
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayWeather({ error: error.toString() });
    }
}

function displayWeather(data) {
    const weatherDiv = document.querySelector('.weather');
    if (data.error) {
        weatherDiv.innerHTML = `<h2>Error: ${data.error}</h2>`;
    } else {
        const iconClass = getIconClass(data.weather[0].id);
        weatherDiv.innerHTML = `
            <h2>${data.name}</h2>
            <i class="wi ${iconClass}"></i>
            <h3>${data.main.temp} K</h3>
            <h3>${data.weather[0].description}</h3>
        `;
    }
}

function getIconClass(conditionCode) {
    // This is a very basic mapping, you'll want to expand this to include more condition codes
    if (conditionCode >= 200 && conditionCode < 300) {
        return 'wi-thunderstorm';
    } else if (conditionCode >= 300 && conditionCode < 500) {
        return 'wi-showers';
    } else if (conditionCode >= 500 && conditionCode < 600) {
        return 'wi-rain';
    } else if (conditionCode >= 600 && conditionCode < 700) {
        return 'wi-snow';
    } else if (conditionCode >= 700 && conditionCode < 800) {
        return 'wi-fog';
    } else if (conditionCode === 800) {
        return 'wi-day-sunny';
    } else {
        return 'wi-cloudy';
    }
}