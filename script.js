let Input = document.getElementById("Input");
let btn = document.getElementById("btn");
let result = document.getElementById("result");


btn.addEventListener("click", function() {

    let city = Input.value;

    if (city === "") {
        result.textContent = "Please enter a city";
        return;
    }

    weather(city);

});


async function weather(city) {

    try {

        // Find city
        let cityResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        );

        let cityData = await cityResponse.json();


        // Check city
        if (!cityData.results || cityData.results.length === 0) {
            result.textContent = "City not found";
            return;
        }


        // Get city information
        let latitude = cityData.results[0].latitude;
        let longitude = cityData.results[0].longitude;
        let cityName = cityData.results[0].name;


        // Get weather
        let weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
        );

        let weatherData = await weatherResponse.json();


        // Get temperature and weather code
        let temperature = weatherData.current.temperature_2m;
        let weatherCode = weatherData.current.weather_code;


        // Show result
        result.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather Code: ${weatherCode}</p>
        `;


    } catch (error) {

        result.textContent = "Something went wrong";

        console.log(error);

    }

}