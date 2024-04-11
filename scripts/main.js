const DEFAULT_CITY = "Islington";
const cityInput = document.getElementById("city-input");

updateWeatherData(DEFAULT_CITY);

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    cityInput.disabled = true;
    const city = cityInput.value;
    fetchWeatherData(city).then((response) => {
      cityInput.value = "";
      cityInput.disabled = false;
      if (response.data) {
        setWeatherData(response.data);
      }
    });
  }
});
