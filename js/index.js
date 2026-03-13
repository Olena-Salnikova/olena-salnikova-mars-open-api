// ---- Creat Footer ----

const footer = document.createElement("footer");
document.body.appendChild(footer);

const today = new Date();                                    // Get the current date
const thisYear = today.getFullYear();                        // Get the current year

const copyright = document.createElement("p");               // Create a paragraph element for the copyright notice
copyright.innerText = `\u00A9 ${thisYear} Olena Salnikova.`;

footer.appendChild(copyright);                               // Add the copyright to the footer


// ---- Fetching GitHub Repositories ----
//Parameter two sitys for weather data
const cities = [
    {
        name: "Cleveland, OH",
        latitude: 40.7128,
        longitude: -74.0060
    },
    {
        name: "Kharkiv, Ukraine",
        latitude: 49.9808,
        longitude: 36.2527
    }
];

// --- Function to get weather data ---
function get_weather(type) {
    const weatherResults = document.querySelector('#weather-results');
    weatherResults.innerHTML = ''; // Clear the block

    cities.forEach(city => {
        // Form the endpoint according to the selected type
        // ====== block "all" ======       
        if (type === 'all') {
            const tempURL = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m&timezone=auto&temperature_unit=fahrenheit`;
            const sunURL = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&daily=sunrise,sunset&timezone=auto&forecast_days=1`;
            const windURL = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=wind_speed_10m&timezone=auto`;

            Promise.all([
                fetch(tempURL).then(res => res.json()),
                fetch(sunURL).then(res => res.json()),
                fetch(windURL).then(res => res.json())
            ])
            .then(([weatherTemp, weatherSun, weatherWind]) => {
                const weatherSection = document.createElement("section");
                weatherSection.className = "weather-city";
                const cityTitle = document.createElement("h3");
                cityTitle.innerText = city.name;
                weatherSection.appendChild(cityTitle);
                const weatherList = document.createElement("ul");

                // Current Temperature
                if(weatherTemp.current) {
                    const currentTemp = document.createElement("li");
                    let icon = {
                        src: "images/warm-temp.png",
                        alt: "Warm Icon"
                    };
                    if (weatherTemp.current.temperature_2m >= 80) {
                        icon.src = "images/hot-temp.png";
                        icon.alt = "Hot Icon";
                    } else if (weatherTemp.current.temperature_2m <= 32) {
                        icon.src = "images/cold-temp.png";
                        icon.alt = "Cold Icon";
                    }
                    const tempIcon = document.createElement("img");
                    tempIcon.src = icon.src;
                    tempIcon.alt = icon.alt;
                    currentTemp.appendChild(tempIcon);

                    currentTemp.appendChild(document.createTextNode(
                        `Current Temperature: ${weatherTemp.current.temperature_2m}°F`
                    ));
                    weatherList.appendChild(currentTemp);
                }

                // Sunrise/Sunset
                if(weatherSun.daily) {
                    const sunrise = document.createElement("li");
                    const sunriseIcon = document.createElement("img");
                    sunriseIcon.src = "images/sunrise.png";
                    sunriseIcon.alt = "Sunrise Icon";
                    sunrise.appendChild(sunriseIcon);
                    sunrise.appendChild(document.createTextNode(`Sunrise: ${weatherSun.daily.sunrise[0]} `));
                    sunrise.appendChild(document.createElement("br"));
                    sunrise.appendChild(document.createTextNode(weatherSun.timezone));
                    weatherList.appendChild(sunrise);

                    const sunset = document.createElement("li");
                    const sunsetIcon = document.createElement("img");
                    sunsetIcon.src = "images/sunset.png";
                    sunsetIcon.alt = "Sunset Icon";
                    sunset.appendChild(sunsetIcon);
                    sunset.appendChild(document.createTextNode(`Sunset: ${weatherSun.daily.sunset[0]} `));
                    sunset.appendChild(document.createElement("br"));
                    sunset.appendChild(document.createTextNode(weatherSun.timezone));
                    weatherList.appendChild(sunset);
                }

                // Wind
                if(weatherWind.current){
                    const wind = document.createElement("li");
                    const windIcon = document.createElement("img");
                    windIcon.src = "images/wind.png";
                    windIcon.alt = "Wind Icon";
                    wind.appendChild(windIcon);
                    wind.appendChild(document.createTextNode(
                        `Wind Speed: ${weatherWind.current.wind_speed_10m} mph`
                    ));
                    weatherList.appendChild(wind);
                }

                weatherSection.appendChild(weatherList);
                weatherResults.appendChild(weatherSection);
            });
            return;
        }
        // ====== end block "all" ======

        let url, listItems = [];

        if (type === 'temperature') {
            url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m&timezone=auto&temperature_unit=fahrenheit`;
        } else if (type === 'sun') {
            url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&daily=sunrise,sunset&timezone=auto&forecast_days=1`;
        } else if (type === 'wind') {
            url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=wind_speed_10m&timezone=auto`;
        }

        fetch(url)
            .then(response => response.json())
            .then(weather => {
                // --- Create a section for the city ---
                const weatherSection = document.createElement("section");
                weatherSection.className = "weather-city";
                // --- City name ---
                const cityTitle = document.createElement("h3");
                cityTitle.innerText = city.name;
                weatherSection.appendChild(cityTitle);

                // --- Weather list ---
                const weatherList = document.createElement("ul");

                if (type === 'temperature' && weather.current) {
                    // Temperature
                    const currentTemp = document.createElement("li");
                    let icon = {
                        src: "images/warm-temp.png",
                        alt: "Warm Icon"
                    };
                    if (weather.current.temperature_2m >= 80) {
                        icon.src = "images/hot-temp.png";
                        icon.alt = "Hot Icon";
                    } else if (weather.current.temperature_2m <= 32) {
                        icon.src = "images/cold-temp.png";
                        icon.alt = "Cold Icon";
                    }
                    const tempIcon = document.createElement("img");
                    tempIcon.src = icon.src;
                    tempIcon.alt = icon.alt;
                    currentTemp.appendChild(tempIcon);

                    currentTemp.appendChild(document.createTextNode(
                      `Current Temperature: ${weather.current.temperature_2m}°F`
                    ));
                    weatherList.appendChild(currentTemp);
                }
                if (type === 'sun' && weather.daily) {
                    // Sunrise
                    const sunrise = document.createElement("li");
                    const sunriseIcon = document.createElement("img");
                    sunriseIcon.src = "images/sunrise.png";
                    sunriseIcon.alt = "Sunrise Icon";
                    sunrise.appendChild(sunriseIcon);
                    sunrise.appendChild(document.createTextNode(`Sunrise: ${weather.daily.sunrise[0]} `));
                    sunrise.appendChild(document.createElement("br"));
                    sunrise.appendChild(document.createTextNode(weather.timezone));
                    weatherList.appendChild(sunrise);

                    // Sunset
                    const sunset = document.createElement("li");
                    const sunsetIcon = document.createElement("img");
                    sunsetIcon.src = "images/sunset.png";
                    sunsetIcon.alt = "Sunset Icon";
                    sunset.appendChild(sunsetIcon);
                    sunset.appendChild(document.createTextNode(`Sunset: ${weather.daily.sunset[0]} `));
                    sunset.appendChild(document.createElement("br"));
                    sunset.appendChild(document.createTextNode(weather.timezone));
                    weatherList.appendChild(sunset);
                }
                if (type === 'wind' && weather.current) {
                    // Wind
                    const wind = document.createElement("li");
                    const windIcon = document.createElement("img");
                    windIcon.src = "images/wind.png";
                    windIcon.alt = "Wind Icon";
                    wind.appendChild(windIcon);
                    wind.appendChild(document.createTextNode(
                      `Wind Speed: ${weather.current.wind_speed_10m} mph`
                    ));
                    weatherList.appendChild(wind);
                }

                // Add the list and section for the city
                weatherSection.appendChild(weatherList);
                weatherResults.appendChild(weatherSection);
            })
            .catch(error =>
                console.error("Error fetching weather data:", error)
            );
    });
}

// --- Navigation between tabs ---
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.weather-tabs a').forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.weather-tabs a').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            get_weather(this.dataset.tab);
        });
    });
});

// --- Initially show temperature ---
get_weather('temperature');
