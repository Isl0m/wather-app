function toCelsius(temperature) {
  return Math.round(temperature - 273.15);
}

function setTextToElement(elementId, text) {
  const element = document.getElementById(elementId);
  element.innerText = text;
}

const weatherCache = {
  generateDataKey(city) {
    return `weather-${city}`;
  },
  getWeatherCacheData(city) {
    let weatherData = localStorage.getItem(this.generateDataKey(city));
    if (!weatherData) return null;

    weatherData = JSON.parse(weatherData);
    if (!weatherData.data) return null;
    if (weatherData.createdAt + 10 * 1000 < Date.now()) return null;

    return weatherData.data;
  },
  setWeatherCacheData(city, data) {
    const weatherData = {
      createdAt: Date.now(),
      data,
    };
    localStorage.setItem(
      this.generateDataKey(city),
      JSON.stringify(weatherData)
    );
  },
};
