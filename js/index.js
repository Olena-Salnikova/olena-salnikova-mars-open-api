// ---- Creat Footer ----

const footer = document.createElement("footer");
document.body.appendChild(footer);

const today = new Date();                                    // Get the current date
const thisYear = today.getFullYear();                        // Get the current year

const copyright = document.createElement("p");               // Create a paragraph element for the copyright notice
copyright.innerText = `\u00A9 ${thisYear} Olena Salnikova.`;

footer.appendChild(copyright);                               // Add the copyright to the footer


// ---- Fetching GitHub Repositories ----

fetch("https://api.open-meteo.com/v1/forecast?latitude=41.4995&longitude=-81.6954&daily=sunrise,sunset&hourly=temperature_2m&current=temperature_2m&timezone=America%2FNew_York&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch")
    .then(response => response.json())
    .then(weather => {
        console.log(weather);

        const projectSection = document.querySelector("#api");
        const projectList = projectSection.querySelector("ul");
    })
    .catch(error =>
        console.error("Error fetching weather data:", error)
    );