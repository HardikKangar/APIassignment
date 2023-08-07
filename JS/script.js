const apiKey = 'e173bd01c8694215b9acee021fe18bd0'; 

// Get the 'getWeatherBtn' element
const getWeatherBtn = document.getElementById('getWeatherBtn');

// Get the 'cityInput' element
const cityInput = document.getElementById('cityInput');

// Get the 'weatherInfo' element
const weatherInfo = document.getElementById('weatherInfo');


// Add event listener to the 'getWeatherBtn' button
getWeatherBtn.addEventListener('click', () => {
    const city = encodeURIComponent(cityInput.value.trim());

    if (city !== '') {
        // Fetch weather data from the API
        fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Extract temperature and description from the response data
                const temperature = data.data[0].temp;
                const description = data.data[0].weather.description;

                // Display the weather information
                weatherInfo.innerHTML = `<p>Temperature: ${temperature}°C</p><p>Description: ${description}</p>`;
            })
            .catch(error => {
                // Handle error if fetching weather data fails
                weatherInfo.innerHTML = 'Error fetching weather data.';
            });
    } else {
        // Display error message if no city name is entered
        weatherInfo.innerHTML = 'Please enter a city name.';
    }
});