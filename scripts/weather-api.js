const weatherCard = document.getElementsByClassName("weather-card")[0];
const loading = document.getElementsByClassName("loading")[0];

function fetchWeatherData(city) {
  const cacheData = weatherCache.getWeatherCacheData(city);
  if (cacheData) {
    loading.classList.add("hidden");
    setWeatherData(cacheData);
    return;
  }

  const url = "https://weather-back-ics3i2drfa-uc.a.run.app";
  return fetch(`${url}/weather?city=${city}`)
    .then((response) => response.json())
    .catch(() => {
      return { message: "Error while fetching data from DB" };
    });
}

async function updateWeatherData(city) {
  const response = await fetchWeatherData(city);
  if (response?.data) {
    setWeatherData(response.data);
    loading.classList.add("hidden");
    weatherCache.setWeatherCacheData(city, response.data);
  } else {
    loading.classList.add("hidden");
    setErrorData(response.error);
  }
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
