const weatherCard = document.getElementsByClassName("weather-card")[0];

function getWeatherInfo(city) {
  const url = "http://52.233.28.162:8000";
  fetch(`${url}/weather?city=${city}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.data) {
        setWeatherData(response.data);
      } else {
        setErrorData(response.error);
      }
    })
    .catch((error) => {
      setErrorData({ message: "Error while fetching data from DB" });
    });
}

function setWeatherData(weatherData) {
  weatherCard.classList.remove("hidden");
  setTextToElement("location", `${weatherData.city}, ${weatherData.country}`);
  setTextToElement("temperature", `${toCelsius(weatherData.temp)}°C`);
  setTextToElement(
    "temperature-description",
    `Feels like ${toCelsius(weatherData.feels_like)}°C. ${
      weatherData.description
    }.`
  );
  setTextToElement("humidity", `${weatherData.humidity}%`);
  setTextToElement("wind", `${weatherData.wind_speed} km/h`);
  setTextToElement("pressure", `${weatherData.pressure}hPa`);

  const weatherIconElement = document.getElementById("weather-icon");
  weatherIconElement.setAttribute("src", getWeatherIconById(weatherData.icon));
  weatherIconElement.setAttribute("alt", `${weatherData.description}-icon`);
}

function setErrorData(error) {
  weatherCard.classList.add("hidden");
  setTextToElement("error-message", error.message);
}

function getWeatherIconById(id) {
  return `https://openweathermap.org/img/wn/${id}@2x.png`;
}
