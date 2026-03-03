// ---- Creat Footer ----

const footer = document.createElement("footer");
document.body.appendChild(footer);

const today = new Date();                                    // Get the current date
const thisYear = today.getFullYear();                        // Get the current year

const copyright = document.createElement("p");               // Create a paragraph element for the copyright notice
copyright.innerText = `\u00A9 ${thisYear} Olena Salnikova.`;

footer.appendChild(copyright);                               // Add the copyright to the footer


// ---- Fetching GitHub Repositories ----
timeZone = "America/New_York";
fetch(`https://api.open-meteo.com/v1/forecast?latitude=41.4995&longitude=-81.6954&daily=sunrise,sunset&hourly=temperature_2m&current=temperature_2m&timezone=${timeZone}&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
    .then(response => response.json())
    .then(weather => {
        console.log(weather);

        const projectSection = document.querySelector("#api"); // Select the projects section by id
        const projectList = projectSection.querySelector("ul");   // Select the <ul> inside the projects section

        projectList.innerHTML = ""; // Clear any existing content in the project list

        // --- Current Temperature ---
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
        
        let tempIcon;
        tempIcon = document.createElement("img");
        tempIcon.src = icon.src;
        tempIcon.alt = icon.alt;
        currentTemp.appendChild(tempIcon);

        currentTemp.appendChild(document.createTextNode(`Current Temperature: ${weather.current.temperature_2m}°F`));
        projectList.appendChild(currentTemp);

        // --- Sunrise ---
        const sunrise = document.createElement("li");
        const sunriseIcon = document.createElement("img");
        sunriseIcon.src = "images/sunrise.png";
        sunriseIcon.alt = "Sunrise Icon";
        sunrise.appendChild(sunriseIcon);
        sunrise.appendChild(document.createTextNode(`Sunrise: ${weather.daily.sunrise[0]} `));
        sunrise.appendChild(document.createElement("br"));
        sunrise.appendChild(document.createTextNode(timeZone));
        projectList.appendChild(sunrise);

        // --- Sunset ---
        const sunset = document.createElement("li");
        const sunsetIcon = document.createElement("img");
        sunsetIcon.src = "images/sunset.png";
        sunsetIcon.alt = "Sunset Icon";
        sunset.appendChild(sunsetIcon);
        sunset.appendChild(document.createTextNode(`Sunset: ${weather.daily.sunset[0]} `));
        sunset.appendChild(document.createElement("br"));
        sunset.appendChild(document.createTextNode(timeZone));
        projectList.appendChild(sunset);
    })
    .catch(error =>
        console.error("Error fetching weather data:", error)
    );
